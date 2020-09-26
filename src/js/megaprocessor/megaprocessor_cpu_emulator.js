// megaprocessor_cpu_emulator
let megaprocessor_cpu_emulator = (function(bus, options) {

  let tmp8 = new emf.Number(8);
  let tmp16 = new emf.Number(16);

  var f = new emf.Number(8);



  let inHalt = false;

  bus.attachPin('reset', {
    onFalling: function() {
      reset();
    },
  });

  bus.attachPin('counter', {
    onFalling: function() {
      mp_interruptCounter();
    }
  });

  bus.attachPin('timer', {
    onFalling: function() {
      mp_interruptTimer();
    }
  });
  // Options: directMemory = true
  // Options: directFetch = true
  let read1 = function(a) {
    return read8(a) & 0x01;
  }
  let read2 = function(a) {
    return read8(a) & 0x03;
  }
  let read3 = function(a) {
    return read8(a) & 0x07;
  }
  let read4 = function(a) {
    return read8(a) & 0x0f;
  }
  let read5 = function(a) {
    return read8(a) & 0x1f;
  }
  let read6 = function(a) {
    return read8(a) & 0x3f;
  }
  let read7 = function(a) {
    return read8(a) & 0x7f;
  }
  let read8;
  let read9 = function(a) {
    return read16(a) & 0x1ff;
  }
  let read10 = function(a) {
    return read16(a) & 0x3ff;
  }
  let read11 = function(a) {
    return read16(a) & 0x7ff;
  }
  let read12 = function(a) {
    return read16(a) & 0xfff;
  }
  let read13 = function(a) {
    return read16(a) & 0x1fff;
  }
  let read14 = function(a) {
    return read16(a) & 0x3fff;
  }
  let read15 = function(a) {
    return read16(a) & 0x7fff;
  }
  let read16;

  /*
   **
   ** Declarations
   **
   */
  let r0 = new emf.Number(16);
  let gsRegisterR0 = new emf.Number(16);
  let r1 = new emf.Number(16);
  let gsRegisterR1 = new emf.Number(16);
  let r2 = new emf.Number(16);
  let gsRegisterR2 = new emf.Number(16);
  let r3 = new emf.Number(16);
  let gsRegisterR3 = new emf.Number(16);
  let pc = new emf.Number(16);
  let gsRegisterPC = new emf.Number(16);
  let sp = new emf.Number(16);
  let gsRegisterSP = new emf.Number(16);
  let ix = new emf.Number(16);
  let gsRegisterIX = new emf.Number(16);
  let iy = new emf.Number(16);
  let gsRegisterIY = new emf.Number(16);
  let ps = new emf.Number(8);
  let gsRegisterPS = new emf.Number(8);

  /*
   **
   ** Internal state
   **
   */

  /*
   **
   ** Bus
   **
   */
  function setupBusHandlersInternal() {
    // Watching the pins
  }

  /*
   **
   ** ALU
   **
   */
  function set(r, v) {
    r.assign(v);
  }

  function get(r) {
    return r.getUnsigned();
  }

  function lit(v) {
    return v;
  }
  // NOTE: When using the bus versions, this uses Z80 conventions
  let in8;
  let out8;
  let write8;
  let fetch8;
  let write16;
  //
  function setupBusHandlers() {
    if (options.directIORQ) {
      in8 = bus.iorq.readPort;
      out8 = bus.iorq.writePort;
    } else {
      in8 = function(port) {
        port = port.getUnsigned ? port.getUnsigned() : port;
        bus.writeBlock('address', port);
        bus.setLow('rd');
        bus.setLow('iorq');
        let data = bus.readBlock('data');
        bus.setHigh('iorq');
        bus.setHigh('rd');
        return data;
      };

      out8 = function(port, data) {
        port = port.getUnsigned ? port.getUnsigned() : port;
        data = data.getUnsigned ? data.getUnsigned() : data;
        bus.writeBlock('address', port);
        bus.writeBlock('data', data);
        bus.setLow('wr');
        bus.pulseLow('iorq');
        bus.setHigh('wr');
      };
    }
    //
    if (options.directMemory) {
      // TODO: don't auto generate these
      read8 = bus.memory.read8;
      read16 = bus.memory.read16;
      write8 = bus.memory.write8;
      write16 = bus.memory.write16;
    } else {
      // TODO: CPU needs endian knowledge to do read16
      read8 = function(address) {
        address = address.getUnsigned ? address.getUnsigned() : address;
        bus.writeBlock('address', address);
        bus.setLow('rd');
        bus.setLow('mreq');
        let data = bus.readBlock('data');
        bus.setHigh('mreq');
        bus.setHigh('rd');
        return data;
      };

      write8 = function(address, data) {
        address = address.getUnsigned ? address.getUnsigned() : address;
        data = data.getUnsigned ? data.getUnsigned() : data;
        bus.writeBlock('address', address);
        bus.writeBlock('data', data);
        bus.setLow('wr');
        bus.pulseLow('mreq');
        bus.setHigh('wr');
      };

      read16 = function(address) {
        address = address.getUnsigned ? address.getUnsigned() : address;
        if (isBigEndian) {
          return read8(address) * 256 + read8(address + 1);
        } else {
          return read8(address + 1) * 256 + read8(address);
        }
      };

      write16 = function(address, data) {
        address = address.getUnsigned ? address.getUnsigned() : address;
        data = data.getUnsigned ? data.getUnsigned() : data;

        if (isBigEndian) {
          write8(address + 0, data >> 8);
          write8(address + 1, data & 0xff);
        } else {
          write8(address + 1, data >> 8);
          write8(address + 0, data & 0xff);
        }
      };
    }
    //
    if (options.directFetch) {
      fetch8 = function() {
        let pcValue = pc.getUnsigned();
        return bus.memory.read8(pcValue);
      };
    } else {
      fetch8 = function() {
        let pcValue = pc.getUnsigned();
        bus.writeBlock('address', pcValue);
        bus.setLow('m1');
        bus.setLow('rd');
        bus.setLow('mreq');
        let data = bus.readBlock('data');
        bus.setHigh('mreq');
        bus.setHigh('rd');
        bus.setHigh('m1');

        // TODO: Re-introduce this?
        //pc.inc();
        updateMemoryRefresh();

        return data;
      };

    }
    //
  }
  var alu = alu || {};

  alu.parityLUT8 = [];

  alu.start = function() {
    for (let i = 0; i < 256; ++i) {
      alu.parityLUT8[i] = calculateParity(i);
    }
  }

  alu.reset = function() {

  }

  function calculateParity(v, sz = 8) {
    let bits = 0;

    v = v & 255; /// ensure it's positive, for the table deference

    for (let i = 0; i < sz; ++i) {
      if (v & (1 << i)) {
        ++bits;
      }
    }
    let parity = (bits & 1) == 1 ? 0 : 1; // odd parity returns 0
    return parity;
  }
  let flagHalfCarryAdd = [0, 1, 1, 1, 0, 0, 0, 1];
  let flagHalfCarrySub = [0, 0, 1, 0, 1, 0, 1, 1];

  alu.add_u8u8c = function(v1, v2, v3 = 0) {
    v1 = v1.getUnsigned ? v1.getUnsigned() : v1;
    v2 = v2.getUnsigned ? v2.getUnsigned() : v2;

    let result = (v1 + v2 + v3);
    wasCarry = result > 0xff ? 1 : 0;

    // Did the calculation in the lowest 4 bits spill over into the upper 4 bits

    // The MSB is same on both src params, but changed between result and src param1
    let lookup = ((v1 & 0x88) >> 3) | (((v2) & 0x88) >> 2) | ((result & 0x88) >> 1);
    wasHalfCarry = flagHalfCarryAdd[(lookup & 7)];
    lookup >>= 4;
    wasOverflow = (lookup == 3 || lookup == 4) ? 1 : 0;

    result &= 0xff;

    computeFlags8(result);
    aluLastResult = result;

    return result;
  }

  alu.sub_u8u8b = function(v1, v2, v3 = 0) {
    v1 = v1.getUnsigned ? v1.getUnsigned() : v1;
    v2 = v2.getUnsigned ? v2.getUnsigned() : v2;
    let result = (v1 - v2) - v3;

    wasCarry = result & 0x100 ? 1 : 0;
    wasNegation = true;

    // Did the calculation in the lowest 4 bits spill under

    // The MSB is same on both src params, but changed between result and src param1
    let lookup = ((v1 & 0x88) >> 3) | (((v2) & 0x88) >> 2) | ((result & 0x88) >> 1);
    wasHalfCarry = flagHalfCarrySub[(lookup & 7)];
    lookup >>= 4;
    wasOverflow = (lookup == 1 || lookup == 6) ? 1 : 0;

    result &= 0xff;

    computeFlags8(result);

    return result;
  }
  alu.abs16 = function(v) {
    v = v.getUnsigned ? v.getUnsigned() : v;
    return computeFlags16(Math.abs(v));
  }

  alu.add_u16u16c = function(v1, v2, v3 = 0) {
    v1 = v1.getUnsigned ? v1.getUnsigned() : v1;
    v2 = v2.getUnsigned ? v2.getUnsigned() : v2;

    let result = (v1 + v2 + v3);
    wasCarry = result > 0xffff ? 1 : 0;

    // 16 bit adds set_'H' on overflow of bit 11 (!?)

    // The MSB is same on both src params, but changed between result and src param1
    let lookup = ((v1 & 0x8800) >> 11) | (((v2) & 0x8800) >> 10) | ((result & 0x8800) >> 9);
    wasHalfCarry = flagHalfCarryAdd[(lookup & 7)];
    lookup >>= 4;
    wasOverflow = (lookup == 3 || lookup == 4) ? 1 : 0; // TODO: not convinced any Z80 instr checks the 'V' flag fter 16 bit adds

    result &= 0xffff;

    computeFlags16(result);
    aluLastResult = result;

    return result;
  }

  alu.add_u16s8 = function(v1, v2, v3 = 0) {
    v1 = v1.getUnsigned ? v1.getUnsigned() : v1;
    v2 = v2.getUnsigned ? v2.getUnsigned() : v2;

    let result = (v1 + v2 + v3);
    if (v2 >= 128) { // handle the negative bit of 8 bit numbers in v2
      result -= 256;
    }
    wasCarry = result > 0xffff ? 1 : 0;

    // 16 bit adds set_'H' on overflow of bit 11 (!?)

    // The MSB is same on both src params, but changed between result and src param1
    let lookup = ((v1 & 0x8800) >> 11) | (((v2) & 0x8800) >> 10) | ((result & 0x8800) >> 9);
    wasHalfCarry = flagHalfCarryAdd[(lookup & 7)];
    lookup >>= 4;
    wasOverflow = (lookup == 3 || lookup == 4) ? 1 : 0;

    result &= 0xffff;

    computeFlags16(result);

    return result;
  }

  alu.sub_u16u16b = function(v1, v2, v3 = 0) {
    v1 = v1.getUnsigned ? v1.getUnsigned() : v1;
    v2 = v2.getUnsigned ? v2.getUnsigned() : v2;
    let result = (v1 - v2) - v3;

    wasCarry = result & 0x10000 ? 1 : 0;
    wasNegation = true;

    // 16-bit half carry occurs on bit 11

    // The MSB is same on both src params, but changed between result and src param1
    let lookup = ((v1 & 0x8800) >> 11) | (((v2) & 0x8800) >> 10) | ((result & 0x8800) >> 9);
    wasHalfCarry = flagHalfCarrySub[(lookup & 7)];
    lookup >>= 4;
    wasOverflow = (lookup == 1 || lookup == 6) ? 1 : 0;

    result &= 0xffff;

    computeFlags16(result);

    return result;
  }
  alu.daa = function(v, carry, subtraction) {
    v = v.getUnsigned ? v.getUnsigned() : v;

    wasCarry = carry;

    if (subtraction) { // last instr was subtraction	
      if ((v & 0x0f) > 9) {
        v -= 6;
      }
      if ((v & 0xf0) > 0x90) {
        v -= 0x60;
      }
    } else { // post an addition
      if ((v & 0x0f) > 9) {
        v += 6;
      }
      if ((v & 0xf0) > 0x90) {
        v += 0x60;
      }
    }
    v = v & 0xff;
    computeFlags8(v);
    return v;
  }
  // utility methods
  let wasCarry;
  let wasNegation;
  let wasOverflow;
  let wasHalfCarry;
  let wasZero;
  let wasSign;
  let wasParity;
  //
  let aluLastResult;


  function sign() {
    return wasSign;
  }

  function sign16() {
    return wasSign;
  }

  function zero() {
    return wasZero;
  }

  function halfcarry() {
    return wasHalfCarry;
  }

  function overflow() {
    return wasOverflow;
  }

  function parity() {
    return wasParity;
  }

  function carry() {
    return wasCarry;
  }

  function getParity8(v) {
    return alu.parityLUT8[v];
  }

  function getParity16(v) {
    return alu.parityLUT8[v * 255] ^ alu.parityLUT8[v >> 8];
  }

  function computeFlags8(r) {
    wasSign = r & 0x80 ? 1 : 0;
    wasZero = r == 0 ? 1 : 0;
    wasParity = getParity8(r);
    return r;
  }

  function computeFlags16(r) {
    wasSign = r & 0x8000 ? 1 : 0;
    wasZero = r == 0 ? 1 : 0;
    wasParity = getParity16(r);
    return r;
  }
  //
  // Basic logic
  //
  alu.eq8 = function(v1, v2) {
    v1 = v1.getUnsigned ? v1.getUnsigned() : v1;
    v2 = v2.getUnsigned ? v2.getUnsigned() : v2;

    return v1 === v2;
  }

  alu.neq8 = function(v1, v2) {
    v1 = v1.getUnsigned ? v1.getUnsigned() : v1;
    v2 = v2.getUnsigned ? v2.getUnsigned() : v2;

    return v1 !== v2;
  }


  //
  // Basic manipulation
  //
  alu.complement8 = function(v) {
    v = v.getUnsigned ? v.getUnsigned() : v;
    v = (~v) & 0xff;

    computeFlags8(v);

    return v;
  }

  alu.setBit8 = function(bit, value) {
    value = value.get ? value.getUnsigned() : value;
    value = value | (1 << bit);
    computeFlags8(value);
    return value;
  }

  alu.clearBit8 = function(bit, value) {
    value = value.get ? value.getUnsigned() : value;
    value = value & ~(1 << bit);
    computeFlags8(value);
    return value;
  }

  alu.testBit8 = function(bit, value) {
    value = value.get ? value.getUnsigned() : value;
    let isBitSet = value & (1 << bit) ? 1 : 0;
    wasSign = value & 0x80 ? 1 : 0;
    wasZero = isBitSet ? 0 : 1;
    wasOverflow = wasZero;
    wasParity = wasZero; // TODO: sure this isn't getParity8(value);?
    return isBitSet;
  }

  alu.and8 = function(v, v2) {
    v = v.getUnsigned ? v.getUnsigned() : v;
    v2 = v2.getUnsigned ? v2.getUnsigned() : v2;

    return computeFlags8(v & v2);
  }

  alu.xor8 = function(v, v2) {
    v = v.getUnsigned ? v.getUnsigned() : v;
    v2 = v2.getUnsigned ? v2.getUnsigned() : v2;

    return computeFlags8(v ^ v2);
  }

  alu.or8 = function(v, v2) {
    v = v.getUnsigned ? v.getUnsigned() : v;
    v2 = v2.getUnsigned ? v2.getUnsigned() : v2;

    return computeFlags8(v | v2);
  }

  //
  // Shift and rotates
  //
  alu.lsr8 = function(v, places) {
    v = v.getUnsigned ? v.getUnsigned() : v;
    wasCarry = v & 1;
    return v >> places;
  }

  alu.lsl8 = function(v, places) {
    v = v.getUnsigned ? v.getUnsigned() : v;
    wasCarry = v & 0x80 ? 1 : 0;
    return v << places;
  }

  alu.rra8 = function(v, carry) {
    v = v.getUnsigned ? v.getUnsigned() : v;

    v |= carry ? 0x100 : 0;
    wasCarry = v & 1;
    v >>= 1;
    v &= 0xff;

    computeFlags8(v);

    return v;
  }

  // SLL is undocumented it seems (at least in Zaks:82)
  // http://www.z80.info/z80undoc.htm
  // suggests it's like SLA, but with 1 in the LSB
  alu.sll8 = function(v) {
    v = v.getUnsigned ? v.getUnsigned() : v;

    wasCarry = v & 0x80 ? 1 : 0;
    v <<= 1;
    v |= 1;
    v = v & 0xff;

    computeFlags8(v);

    return v;
  }

  alu.sla8 = function(v) {
    v = v.getUnsigned ? v.getUnsigned() : v;

    wasCarry = v & 0x80 ? 1 : 0;
    v <<= 1;
    v = v & 0xff;

    computeFlags8(v);

    return v;
  }

  alu.sra8 = function(v) {
    v = v.getUnsigned ? v.getUnsigned() : v;

    wasCarry = v & 1;
    v >>= 1;
    v |= (v & 0x40) << 1;

    computeFlags8(v);

    return v;
  }

  alu.srl8 = function(v) {
    v = v.getUnsigned ? v.getUnsigned() : v;

    wasCarry = v & 1;
    v >>= 1;
    v = v & 0x7f;

    computeFlags8(v);

    return v;
  }

  alu.rlc8 = function(v) {
    v = v.getUnsigned ? v.getUnsigned() : v;

    wasCarry = v & 0x80 ? 1 : 0;
    v <<= 1;
    v |= wasCarry;
    v = v & 0xff;

    computeFlags8(v);

    return v;
  }

  alu.rl8 = function(v, carry) {
    v = v.getUnsigned ? v.getUnsigned() : v;

    wasCarry = v & 0x80 ? 1 : 0;
    v <<= 1;
    v |= carry;
    v = v & 0xff;

    computeFlags8(v);

    return v;
  }

  alu.rr8 = function(v, carry) {
    v = v.getUnsigned ? v.getUnsigned() : v;

    wasCarry = v & 1 ? 1 : 0;
    v >>= 1;
    v |= carry ? 0x80 : 0;

    computeFlags8(v);

    return v;
  }

  alu.rrc8 = function(v) {
    v = v.getUnsigned ? v.getUnsigned() : v;

    wasCarry = v & 1 ? 1 : 0;
    v >>= 1;
    v |= wasCarry ? 0x80 : 0;

    computeFlags8(v);

    return v;
  }
  //
  // Basic logic
  //
  alu.eq16 = function(v1, v2) {
    v1 = v1.getUnsigned ? v1.getUnsigned() : v1;
    v2 = v2.getUnsigned ? v2.getUnsigned() : v2;

    return v1 === v2;
  }

  alu.neq16 = function(v1, v2) {
    v1 = v1.getUnsigned ? v1.getUnsigned() : v1;
    v2 = v2.getUnsigned ? v2.getUnsigned() : v2;

    return v1 !== v2;
  }



  //
  // Basic manipulation
  //
  alu.complement16 = function(v) {
    v = v.getUnsigned ? v.getUnsigned() : v;
    v = (~v) & 0xffff;

    computeFlags16(v);

    return v;
  }

  alu.test16 = function(v) {
    return computeFlags16(v)
  }

  alu.xor16 = function(v1, v2) {
    return computeFlags16(v1 ^ v2);
  }

  alu.or16 = function(v1, v2) {
    return computeFlags16(v1 | v2);
  }

  alu.and16 = function(v1, v2) {
    return computeFlags16(v1 & v2);
  }

  function createRegisterPair(hi, lo) {
    let pair = new emf.Number(16);
    let pairAssign = pair.assign;
    let pairGetUnsigned = pair.getUnsigned;

    getMethods = (obj) => Object.getOwnPropertyNames(obj).filter(item => typeof obj[item] === 'function')
    let method = getMethods(pair);
    method.forEach((m) => {
      let original = pair[m];
      pair[m] = function(args) {
        //// Copy from individual
        let combined = (hi.getUnsigned() << 8) | lo.getUnsigned();
        pairAssign(combined);

        // Do normal math using genuine logic
        let returnValue = original(args);

        // Copy back
        let result = pairGetUnsigned();
        hi.assign(result >> 8);
        lo.assign(result & 255);

        return returnValue; // for those that use it. e.g. equals()
      }
    });

    // TODO: get() 
    pair.get = function() {
      return (hi.getUnsigned() << 8) | lo.getUnsigned();
    }
    pair.getUnsigned = function() {
      return (hi.getUnsigned() << 8) | lo.getUnsigned();
    }

    return pair;
  }

  /*
   **
   ** Utility methods
   **
   */
  function start() {
    alu.start();
    setupBusHandlersInternal();
    setupBusHandlers();
    return reset();
  }

  function reset() {
    alu.reset();
    r0.assign(0);
    r1.assign(0);
    r2.assign(0);
    r3.assign(0);
    pc.assign(0);
    sp.assign(0);
    ix.assign(0);
    iy.assign(0);
    ps.assign(0);
  }

  function getRegisterValueR0() {
    return r0.getUnsigned();
  }

  function setRegisterValueR0(v) {
    r0.assign(v);
  }

  function getRegisterValueR1() {
    return r1.getUnsigned();
  }

  function setRegisterValueR1(v) {
    r1.assign(v);
  }

  function getRegisterValueR2() {
    return r2.getUnsigned();
  }

  function setRegisterValueR2(v) {
    r2.assign(v);
  }

  function getRegisterValueR3() {
    return r3.getUnsigned();
  }

  function setRegisterValueR3(v) {
    r3.assign(v);
  }

  function getRegisterValuePC() {
    return pc.getUnsigned();
  }

  function setRegisterValuePC(v) {
    pc.assign(v);
  }

  function getRegisterValueSP() {
    return sp.getUnsigned();
  }

  function setRegisterValueSP(v) {
    sp.assign(v);
  }

  function getRegisterValueIX() {
    return ix.getUnsigned();
  }

  function setRegisterValueIX(v) {
    ix.assign(v);
  }

  function getRegisterValueIY() {
    return iy.getUnsigned();
  }

  function setRegisterValueIY(v) {
    iy.assign(v);
  }

  function getRegisterValuePS() {
    return ps.getUnsigned();
  }

  function setRegisterValuePS(v) {
    ps.assign(v);
  }

  function getRegisterValue(name) {
    name = name.toLowerCase();
    if (name == 'r0') return getRegisterValueR0();
    if (name == 'r1') return getRegisterValueR1();
    if (name == 'r2') return getRegisterValueR2();
    if (name == 'r3') return getRegisterValueR3();
    if (name == 'pc') return getRegisterValuePC();
    if (name == 'sp') return getRegisterValueSP();
    if (name == 'ix') return getRegisterValueIX();
    if (name == 'iy') return getRegisterValueIY();
    if (name == 'ps') return getRegisterValuePS();
  }

  function setRegisterValue(name, v) {
    name = name.toLowerCase();
    if (name === 'r0') return setRegisterValueR0(v);
    if (name === 'r1') return setRegisterValueR1(v);
    if (name === 'r2') return setRegisterValueR2(v);
    if (name === 'r3') return setRegisterValueR3(v);
    if (name === 'pc') return setRegisterValuePC(v);
    if (name === 'sp') return setRegisterValueSP(v);
    if (name === 'ix') return setRegisterValueIX(v);
    if (name === 'iy') return setRegisterValueIY(v);
    if (name === 'ps') return setRegisterValuePS(v);
  }

  function setFlagValue(name, v) {
    name = name.toLowerCase();
    if (name === 'u') return changeFlagU(v);
    if (name === 'd') return changeFlagD(v);
    if (name === 'c') return changeFlagC(v);
    if (name === 'x') return changeFlagX(v);
    if (name === 'v') return changeFlagV(v);
    if (name === 'z') return changeFlagZ(v);
    if (name === 'n') return changeFlagN(v);
    if (name === 'i') return changeFlagI(v);
  }

  function getFlagU() {
    return (ps.getUnsigned() & (1 << 7)) ? 1 : 0;
  }

  function clearFlagU() {
    ps.assign(ps.getUnsigned() & ~(1 << 7));
  }

  function setFlagU() {
    ps.assign(ps.getUnsigned() | (1 << 7));
  }

  function affectFlagU() {
    if (uflag()) {
      setFlagU();
    } else {
      clearFlagU();
    }
  }

  function changeFlagU(newState) {
    if (newState) {
      setFlagU();
    } else {
      clearFlagU();
    }
  }

  function getFlagD() {
    return (ps.getUnsigned() & (1 << 6)) ? 1 : 0;
  }

  function clearFlagD() {
    ps.assign(ps.getUnsigned() & ~(1 << 6));
  }

  function setFlagD() {
    ps.assign(ps.getUnsigned() | (1 << 6));
  }

  function affectFlagD() {
    if (dflag()) {
      setFlagD();
    } else {
      clearFlagD();
    }
  }

  function changeFlagD(newState) {
    if (newState) {
      setFlagD();
    } else {
      clearFlagD();
    }
  }

  function getFlagC() {
    return (ps.getUnsigned() & (1 << 5)) ? 1 : 0;
  }

  function clearFlagC() {
    ps.assign(ps.getUnsigned() & ~(1 << 5));
  }

  function setFlagC() {
    ps.assign(ps.getUnsigned() | (1 << 5));
  }

  function affectFlagC() {
    if (carry()) {
      setFlagC();
    } else {
      clearFlagC();
    }
  }

  function changeFlagC(newState) {
    if (newState) {
      setFlagC();
    } else {
      clearFlagC();
    }
  }

  function getFlagX() {
    return (ps.getUnsigned() & (1 << 4)) ? 1 : 0;
  }

  function clearFlagX() {
    ps.assign(ps.getUnsigned() & ~(1 << 4));
  }

  function setFlagX() {
    ps.assign(ps.getUnsigned() | (1 << 4));
  }

  function affectFlagX() {
    if (xflag()) {
      setFlagX();
    } else {
      clearFlagX();
    }
  }

  function changeFlagX(newState) {
    if (newState) {
      setFlagX();
    } else {
      clearFlagX();
    }
  }

  function getFlagV() {
    return (ps.getUnsigned() & (1 << 3)) ? 1 : 0;
  }

  function clearFlagV() {
    ps.assign(ps.getUnsigned() & ~(1 << 3));
  }

  function setFlagV() {
    ps.assign(ps.getUnsigned() | (1 << 3));
  }

  function affectFlagV() {
    if (overflow()) {
      setFlagV();
    } else {
      clearFlagV();
    }
  }

  function changeFlagV(newState) {
    if (newState) {
      setFlagV();
    } else {
      clearFlagV();
    }
  }

  function getFlagZ() {
    return (ps.getUnsigned() & (1 << 2)) ? 1 : 0;
  }

  function clearFlagZ() {
    ps.assign(ps.getUnsigned() & ~(1 << 2));
  }

  function setFlagZ() {
    ps.assign(ps.getUnsigned() | (1 << 2));
  }

  function affectFlagZ() {
    if (zero()) {
      setFlagZ();
    } else {
      clearFlagZ();
    }
  }

  function changeFlagZ(newState) {
    if (newState) {
      setFlagZ();
    } else {
      clearFlagZ();
    }
  }

  function getFlagN() {
    return (ps.getUnsigned() & (1 << 1)) ? 1 : 0;
  }

  function clearFlagN() {
    ps.assign(ps.getUnsigned() & ~(1 << 1));
  }

  function setFlagN() {
    ps.assign(ps.getUnsigned() | (1 << 1));
  }

  function affectFlagN() {
    if (sign()) {
      setFlagN();
    } else {
      clearFlagN();
    }
  }

  function changeFlagN(newState) {
    if (newState) {
      setFlagN();
    } else {
      clearFlagN();
    }
  }

  function getFlagI() {
    return (ps.getUnsigned() & (1 << 0)) ? 1 : 0;
  }

  function clearFlagI() {
    ps.assign(ps.getUnsigned() & ~(1 << 0));
  }

  function setFlagI() {
    ps.assign(ps.getUnsigned() | (1 << 0));
  }

  function affectFlagI() {
    if (iflag()) {
      setFlagI();
    } else {
      clearFlagI();
    }
  }

  function changeFlagI(newState) {
    if (newState) {
      setFlagI();
    } else {
      clearFlagI();
    }
  }

  function update(how) {
    // emf.control ensures only 1 step is executed
    return step();
  }
  let wasFlagX;
  // Shifts..

  let previousWeight;


  function alu_as_s5(v) {
    v &= 0x1f; // LSB 5 bits
    if (v & 0x10) { // -32 is set
      return -16 + (v & 0x0f);
    }
    return v;
  }

  // Logical
  function alu_lsl16(v, n) {
    n = alu_as_s5(n);
    if ((n) < 0) {
      return alu_lsr16_op(v, -(n));
    }

    return alu_lsl16_op(v, n);
  }

  function alu_lsr16(v, n) {
    n = alu_as_s5(n);
    if ((n) < 0) {
      return alu_lsl16_op(v, -(n));
    }
    return alu_lsr16_op(v, n);
  }

  function alu_lsl16_op(v, n) {
    let result = v;
    previousWeight = 0;

    wasCarry = 0; // because it's cleared for a shift of 0
    wasOverflow = 0;

    while (n) {
      let previousMSB = result & 0x8000;
      result <<= 1;

      if (previousMSB !== result & 0x8000) {
        wasOverflow = 1;
      }

      wasCarry = (result & 0x8000) ? 1 : 0
      wasFlagX = wasCarry;
      previousWeight += wasCarry;

      result &= 0xffff;
      computeFlags16(result);
      //
      --n;
    }
    //
    return result;
  }

  function alu_lsr16_op(v, n) {
    let result = v;
    previousWeight = 0;

    wasCarry = 0; // because it's cleared for a shift of 0
    wasOverflow = 0;

    while (n) {
      wasCarry = (result & 1) ? 1 : 0
      wasFlagX = wasCarry;
      previousWeight += wasCarry;

      let previousMSB = result & 0x8000;
      //
      result >>= 1;
      result &= 0xffff;
      //
      computeFlags16(result);

      if (previousMSB !== result & 0x8000) {
        wasOverflow = 1;
      }
      //
      --n;
    }

    return result;
  }

  function alu_lsl16wt(destreg, v, n) {
    alu_lsl16wt(v, n);
    destreg.assign(previousWeight);
  }

  function alu_lsr16wt(destreg, v, n) {
    alu_lsr16wt(v, n);
    destreg.assign(previousWeight);
  }


  // Arithmetic
  function alu_asl16(v, n) {
    // NOTE: ASL is the same as LSL, AFAICS
    n = alu_as_s5(n);
    if ((n) < 0) {
      return alu_asr16_op(v, -(n));
    }

    return alu_asl16_op(v, n);
  }

  function alu_asr16(v, n) {
    n = alu_as_s5(n);
    if ((n) < 0) {
      return alu_asl16_op(v, -(n));
    }
    return alu_asr16_op(v, n);
  }

  function alu_asl16_op(v, n) {
    let result = v;
    previousWeight = 0;

    while (n) {
      result <<= 1;

      wasCarry = (result & 0x8000) ? 1 : 0
      wasFlagX = wasCarry;
      previousWeight += wasCarry;

      result &= 0xffff;
      computeFlags16(result);
      //
      --n;
    }
    //
    return result;
  }

  function alu_asr16_op(v, n) {
    let result = v;
    previousWeight = 0;

    while (n) {
      wasCarry = (result & 1) ? 1 : 0
      wasFlagX = wasCarry;
      previousWeight += wasCarry;

      result >>= 1;
      result |= (result & 0x4000) << 1; // replicate the MSB, which is now 1 bit further to the right
      result &= 0xffff;
      //
      computeFlags16(result);
      //
      --n;
    }

    return result;
  }

  function alu_asl16wt(destreg, v, n) {
    alu_asl16wt(v, n);
    destreg.assign(previousWeight);
  }

  function alu_asr16wt(destreg, v, n) {
    alu_asr16wt(v, n);
    destreg.assign(previousWeight);
  }



  // Rolling
  function alu_rol16(v, n) {
    // NOTE: ASL is the same as LSL, AFAICS
    n = alu_as_s5(n);
    if ((n) < 0) {
      return alu_ror16_op(v, -(n));
    }

    return alu_rol16_op(v, n);
  }

  function alu_ror16(v, n) {
    n = alu_as_s5(n);
    if ((n) < 0) {
      return alu_rol16_op(v, -(n));
    }
    return alu_ror16_op(v, n);
  }

  function alu_rol16_op(v, n) {
    let result = v;
    previousWeight = 0;

    while (n) {
      result <<= 1;

      wasCarry = (result & 0x10000) ? 1 : 0
      result |= wasCarry;

      previousWeight += wasCarry;

      result &= 0xffff;
      computeFlags16(result);
      //
      --n;
    }
    //
    return result;
  }

  function alu_ror16_op(v, n) {
    let result = v;
    previousWeight = 0;
    let prevCarry = getFlagC();

    while (n) {
      wasCarry = (result & 1) ? 1 : 0
      previousWeight += wasCarry;

      result >>= 1;
      result |= prevCarry ? 0x8000 : 0;
      result &= 0xffff;
      //
      prevCarry = wasCarry;
      //
      computeFlags16(result);
      //
      --n;
    }

    return result;
  }

  function alu_rol16wt(destreg, v, n) {
    alu_rol16wt(v, n);
    destreg.assign(previousWeight);
  }

  function alu_ror16wt(destreg, v, n) {
    alu_ror16wt(v, n);
    destreg.assign(previousWeight);
  }


  // Extended Rolling
  function alu_roxl16(v, n) {
    n = alu_as_s5(n);
    if ((n) < 0) {
      return alu_roxr16_op(v, -(n));
    }

    return alu_roxl16_op(v, n);
  }

  function alu_roxr16(v, n) {
    n = alu_as_s5(n);
    if ((n) < 0) {
      return alu_roxl16_op(v, -(n));
    }
    return alu_roxr16_op(v, n);
  }

  function alu_roxl16_op(v, n) {
    let result = v;
    previousWeight = 0;
    wasXFlag = getFlagX();

    while (n) {
      result <<= 1;

      wasCarry = (result & 0x8000) ? 1 : 0;
      result |= wasXFlag;

      wasXFlag = wasCarry;

      previousWeight += (result & 2) ? 1 : 0; // &2 checks bit 1, because result has already been shifted

      result &= 0xffff;
      computeFlags16(result);
      //
      --n;
    }
    //
    return result;
  }

  function alu_roxr16_op(v, n) {
    let result = v;
    previousWeight = 0;
    wasXFlag = getFlagX();

    while (n) {
      wasCarry = (result & 1) ? 1 : 0
      previousWeight += wasCarry;

      result >>= 1;
      result |= wasXFlag ? 0x8000 : 0;
      result &= 0xffff;
      //
      wasXFlag = wasCarry;
      computeFlags16(result);
      //
      --n;
    }

    return result;
  }

  function alu_roxl16wt(destreg, v, n) {
    alu_roxl16wt(v, n);
    destreg.assign(previousWeight);
  }

  function alu_roxr16wt(destreg, v, n) {
    alu_roxr16wt(v, n);
    destreg.assign(previousWeight);
  }



  function alu_cmp16(v1, v2) {
    //TODO
    wasCarry = (v1 & 0x80) ? 1 : 0
    wasFlagX = wasCarry;
    wasZero = v1 == v2 ? 1 : 0;
  }


  function alu_bchg16(v1, bit) {
    let wasBit = v1 & (1 << bit);
    wasZero = wasBit == 0 ? 1 : 0;
    return v1 ^ (1 << bit); // change the bit with XOR
  }

  function alu_bclr16(v1, bit) {
    let wasBit = v1 & (1 << bit);
    wasZero = wasBit == 0 ? 1 : 0;
    return v1 & ~(1 << bit);
  }

  function alu_bset16(v1, bit) {
    let wasBit = v1 & (1 << bit);
    wasZero = wasBit == 0 ? 1 : 0;
    return v1 | (1 << bit);
  }

  function alu_btst16(v1, bit) {
    let wasBit = v1 & (1 << bit);
    wasZero = wasBit == 0 ? 1 : 0;
  }

  // MP-specific
  function mp_interruptCounter() {
    // Q. TODO. Is this right?
    mp_trapVector1();
  }

  function mp_interruptTimer() {
    // Q. TODO. Is this right?
    mp_trapVector1();
  }

  function mp_trapDivideZero() {
    mp_trapVector(2);
  }

  // The vectors are offsets of  0x0, 0x4, 0x8 and 0xC relative to the vector base.
  function mp_trapVector(vector) {
    // push pc
    set(sp, emf.Maths.add_u16u16(sp, lit(-2)));
    write16(get(sp), emf.Maths.add_u16u16(pc, 1));

    // push sp
    set(sp, emf.Maths.add_u16u16(get(sp), lit(-1)))
    write8(get(sp), get(ps))

    // Jump
    set(pc, 0 + vector * 4 - 1); // -1 because of PC increments afterwards

  }

  function mp_trapVector0() { // reset
    mp_trapVector(0);
  }

  function mp_trapVector1() { // ext_int
    mp_trapVector(1);
  }

  function mp_trapVector2() { // div_zero
    mp_trapVector(2);
  }

  function mp_trapVector3() { // illegal
    mp_trapVector(3);
  }


  function alu_divu() {
    if (r1.get() == 0) {
      mp_trapDivideZero();
    }
    let quotient = Math.floor(r0.getUnsigned() / r1.getUnsigned());
    let remainder = Math.floor(r0.getUnsigned() % r1.getUnsigned());

    let dflag = getFlagD();
    if (dflag && remainder < 0) { // no negative remainders allowed
      quotient += quotient > 0 ? 1 : -1; //i.e abs()
      remainder += r1.getUnsigned();
    }

    r2.assign(quotient);
    r3.assign(remainder);
  }

  function alu_divs() {
    alu_divu();
    r1.abs();
  }

  function alu_mulu() {
    let result = r0.getUnsigned() * r1.getUnsigned();

    r2.assign((result & 0x0000ffff) >> 0);
    r3.assign((result & 0xffff0000) >> 16);
  }

  function alu_muls() {
    alu_mulu();

    if (r0.get() < 0) {
      r0.assign(0);
    }

    if (r1.get() < 0) {
      r0.assign(r0.get() + r1.get());
    }
  }


  function alu_sqrt() {
    let root = Math.floor(Math.sqrt(r1.getUnsigned()));
    let error = r1.getUnsigned() - (root * root);

    r0.assign(root);
    r1.assign(error);
    r2.assign(0);
  }


  function alu_neg16(v) {
    if (v == 0x8000) {
      wasOverflow = 1;
    }
    //
    v = (-v & 0xffff);
    return computeFlags16(v);
  }

  function alu_signextend16(v) {
    if (v & 0x80) {
      v |= 0xff00;
    } else {
      v &= 0x00ff;
    }

    return computeFlags16(v);
  }

  function mp_trap() {
    pc.sub(2);
    write16(sp.getUnsigned(), pc.getUnsigned() + 1);
    sp.sub(1);
    write8(sp.getUnsigned(), ps.getUnsigned());
    pc.assign(0xc - 1);
  }



  // utility methods
  var wasXFlag;
  var wasIFlag;


  function xflag() {
    return wasXFlag;
  }

  function iflag() {
    return wasIFlag;
  }

  function uflag() {
    return 0;
  }

  function dflag() {
    return 0;
  }


  function complement(v1) {
    v1 = v1.get ? v1.getUnsigned() : v1;
    return computeFlags8(~v1);
  }

  function alu_invert16(v1) {
    v1 = v1.get ? v1.getUnsigned() : v1;
    return computeFlags16(~v1);
  }

  //
  // CPU handlers

  function updateMemoryRefresh() {}

  function updateInterupts() {
    return false;
  }

  function step() {
    return processOpcode();
  }

  function processOpcode() {
    var bit;
    var opcode = fetch8()
    var cycles = 1;

    switch (opcode) {
      case 0x0:
        // move @r,@s;
        // Reference:  page 34

        set(r0, get(r0));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        // sxt @r;
        // Reference:  page 53

        set(r0, alu_signextend16(get(r0)));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x1:
        // move @r,@s;
        // Reference:  page 34

        set(r1, get(r0));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        // sxt @r;
        // Reference:  page 53
        break;

      case 0x2:
        // move @r,@s;
        // Reference:  page 34

        set(r2, get(r0));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        // sxt @r;
        // Reference:  page 53
        break;

      case 0x3:
        // move @r,@s;
        // Reference:  page 34

        set(r3, get(r0));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        // sxt @r;
        // Reference:  page 53
        break;

      case 0x4:
        // move @r,@s;
        // Reference:  page 34

        set(r0, get(r1));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        // sxt @r;
        // Reference:  page 53
        break;

      case 0x5:
        // move @r,@s;
        // Reference:  page 34

        set(r1, get(r1));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        // sxt @r;
        // Reference:  page 53

        set(r1, alu_signextend16(get(r0)));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x6:
        // move @r,@s;
        // Reference:  page 34

        set(r2, get(r1));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        // sxt @r;
        // Reference:  page 53
        break;

      case 0x7:
        // move @r,@s;
        // Reference:  page 34

        set(r3, get(r1));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        // sxt @r;
        // Reference:  page 53
        break;

      case 0x8:
        // move @r,@s;
        // Reference:  page 34

        set(r0, get(r2));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        // sxt @r;
        // Reference:  page 53
        break;

      case 0x9:
        // move @r,@s;
        // Reference:  page 34

        set(r1, get(r2));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        // sxt @r;
        // Reference:  page 53
        break;

      case 0xa:
        // move @r,@s;
        // Reference:  page 34

        set(r2, get(r2));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        // sxt @r;
        // Reference:  page 53

        set(r2, alu_signextend16(get(r0)));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xb:
        // move @r,@s;
        // Reference:  page 34

        set(r3, get(r2));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        // sxt @r;
        // Reference:  page 53
        break;

      case 0xc:
        // move @r,@s;
        // Reference:  page 34

        set(r0, get(r3));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        // sxt @r;
        // Reference:  page 53
        break;

      case 0xd:
        // move @r,@s;
        // Reference:  page 34

        set(r1, get(r3));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        // sxt @r;
        // Reference:  page 53
        break;

      case 0xe:
        // move @r,@s;
        // Reference:  page 34

        set(r2, get(r3));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        // sxt @r;
        // Reference:  page 53
        break;

      case 0xf:
        // move @r,@s;
        // Reference:  page 34

        set(r3, get(r3));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        // sxt @r;
        // Reference:  page 53

        set(r3, alu_signextend16(get(r0)));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x10:
        // and @r,@s;
        // Reference:  page 9

        set(r0, alu.and16(get(r0), get(r0)));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        // test @r;
        // Reference:  page 55

        alu.test16(get(r0));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x11:
        // and @r,@s;
        // Reference:  page 9

        set(r1, alu.and16(get(r1), get(r0)));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        // test @r;
        // Reference:  page 55
        break;

      case 0x12:
        // and @r,@s;
        // Reference:  page 9

        set(r2, alu.and16(get(r2), get(r0)));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        // test @r;
        // Reference:  page 55
        break;

      case 0x13:
        // and @r,@s;
        // Reference:  page 9

        set(r3, alu.and16(get(r3), get(r0)));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        // test @r;
        // Reference:  page 55
        break;

      case 0x14:
        // and @r,@s;
        // Reference:  page 9

        set(r0, alu.and16(get(r0), get(r1)));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        // test @r;
        // Reference:  page 55
        break;

      case 0x15:
        // and @r,@s;
        // Reference:  page 9

        set(r1, alu.and16(get(r1), get(r1)));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        // test @r;
        // Reference:  page 55

        alu.test16(get(r1));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x16:
        // and @r,@s;
        // Reference:  page 9

        set(r2, alu.and16(get(r2), get(r1)));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        // test @r;
        // Reference:  page 55
        break;

      case 0x17:
        // and @r,@s;
        // Reference:  page 9

        set(r3, alu.and16(get(r3), get(r1)));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        // test @r;
        // Reference:  page 55
        break;

      case 0x18:
        // and @r,@s;
        // Reference:  page 9

        set(r0, alu.and16(get(r0), get(r2)));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        // test @r;
        // Reference:  page 55
        break;

      case 0x19:
        // and @r,@s;
        // Reference:  page 9

        set(r1, alu.and16(get(r1), get(r2)));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        // test @r;
        // Reference:  page 55
        break;

      case 0x1a:
        // and @r,@s;
        // Reference:  page 9

        set(r2, alu.and16(get(r2), get(r2)));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        // test @r;
        // Reference:  page 55

        alu.test16(get(r2));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x1b:
        // and @r,@s;
        // Reference:  page 9

        set(r3, alu.and16(get(r3), get(r2)));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        // test @r;
        // Reference:  page 55
        break;

      case 0x1c:
        // and @r,@s;
        // Reference:  page 9

        set(r0, alu.and16(get(r0), get(r3)));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        // test @r;
        // Reference:  page 55
        break;

      case 0x1d:
        // and @r,@s;
        // Reference:  page 9

        set(r1, alu.and16(get(r1), get(r3)));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        // test @r;
        // Reference:  page 55
        break;

      case 0x1e:
        // and @r,@s;
        // Reference:  page 9

        set(r2, alu.and16(get(r2), get(r3)));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        // test @r;
        // Reference:  page 55
        break;

      case 0x1f:
        // and @r,@s;
        // Reference:  page 9

        set(r3, alu.and16(get(r3), get(r3)));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        // test @r;
        // Reference:  page 55

        alu.test16(get(r3));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x20:
        // xor @r,@s;
        // Reference:  page 57

        set(r0, alu.xor16(get(r0), get(r0)));
        pc.add(1);
        return 1;


        break;

      case 0x21:
        // xor @r,@s;
        // Reference:  page 57

        set(r1, alu.xor16(get(r1), get(r0)));
        pc.add(1);
        return 1;


        break;

      case 0x22:
        // xor @r,@s;
        // Reference:  page 57

        set(r2, alu.xor16(get(r2), get(r0)));
        pc.add(1);
        return 1;


        break;

      case 0x23:
        // xor @r,@s;
        // Reference:  page 57

        set(r3, alu.xor16(get(r3), get(r0)));
        pc.add(1);
        return 1;


        break;

      case 0x24:
        // xor @r,@s;
        // Reference:  page 57

        set(r0, alu.xor16(get(r0), get(r1)));
        pc.add(1);
        return 1;


        break;

      case 0x25:
        // xor @r,@s;
        // Reference:  page 57

        set(r1, alu.xor16(get(r1), get(r1)));
        pc.add(1);
        return 1;


        break;

      case 0x26:
        // xor @r,@s;
        // Reference:  page 57

        set(r2, alu.xor16(get(r2), get(r1)));
        pc.add(1);
        return 1;


        break;

      case 0x27:
        // xor @r,@s;
        // Reference:  page 57

        set(r3, alu.xor16(get(r3), get(r1)));
        pc.add(1);
        return 1;


        break;

      case 0x28:
        // xor @r,@s;
        // Reference:  page 57

        set(r0, alu.xor16(get(r0), get(r2)));
        pc.add(1);
        return 1;


        break;

      case 0x29:
        // xor @r,@s;
        // Reference:  page 57

        set(r1, alu.xor16(get(r1), get(r2)));
        pc.add(1);
        return 1;


        break;

      case 0x2a:
        // xor @r,@s;
        // Reference:  page 57

        set(r2, alu.xor16(get(r2), get(r2)));
        pc.add(1);
        return 1;


        break;

      case 0x2b:
        // xor @r,@s;
        // Reference:  page 57

        set(r3, alu.xor16(get(r3), get(r2)));
        pc.add(1);
        return 1;


        break;

      case 0x2c:
        // xor @r,@s;
        // Reference:  page 57

        set(r0, alu.xor16(get(r0), get(r3)));
        pc.add(1);
        return 1;


        break;

      case 0x2d:
        // xor @r,@s;
        // Reference:  page 57

        set(r1, alu.xor16(get(r1), get(r3)));
        pc.add(1);
        return 1;


        break;

      case 0x2e:
        // xor @r,@s;
        // Reference:  page 57

        set(r2, alu.xor16(get(r2), get(r3)));
        pc.add(1);
        return 1;


        break;

      case 0x2f:
        // xor @r,@s;
        // Reference:  page 57

        set(r3, alu.xor16(get(r3), get(r3)));
        pc.add(1);
        return 1;


        break;

      case 0x30:
        // inv @r;
        // Reference:  page 22

        set(r0, alu_invert16(get(r0)));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        // or @r,@s;
        // Reference:  page 40

        set(r0, alu.or16(get(r0), get(r0)));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x31:
        // inv @r;
        // Reference:  page 22
        // or @r,@s;
        // Reference:  page 40

        set(r1, alu.or16(get(r1), get(r0)));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x32:
        // inv @r;
        // Reference:  page 22
        // or @r,@s;
        // Reference:  page 40

        set(r2, alu.or16(get(r2), get(r0)));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x33:
        // inv @r;
        // Reference:  page 22
        // or @r,@s;
        // Reference:  page 40

        set(r3, alu.or16(get(r3), get(r0)));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x34:
        // inv @r;
        // Reference:  page 22
        // or @r,@s;
        // Reference:  page 40

        set(r0, alu.or16(get(r0), get(r1)));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x35:
        // inv @r;
        // Reference:  page 22

        set(r1, alu_invert16(get(r1)));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        // or @r,@s;
        // Reference:  page 40

        set(r1, alu.or16(get(r1), get(r1)));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x36:
        // inv @r;
        // Reference:  page 22
        // or @r,@s;
        // Reference:  page 40

        set(r2, alu.or16(get(r2), get(r1)));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x37:
        // inv @r;
        // Reference:  page 22
        // or @r,@s;
        // Reference:  page 40

        set(r3, alu.or16(get(r3), get(r1)));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x38:
        // inv @r;
        // Reference:  page 22
        // or @r,@s;
        // Reference:  page 40

        set(r0, alu.or16(get(r0), get(r2)));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x39:
        // inv @r;
        // Reference:  page 22
        // or @r,@s;
        // Reference:  page 40

        set(r1, alu.or16(get(r1), get(r2)));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x3a:
        // inv @r;
        // Reference:  page 22

        set(r2, alu_invert16(get(r2)));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        // or @r,@s;
        // Reference:  page 40

        set(r2, alu.or16(get(r2), get(r2)));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x3b:
        // inv @r;
        // Reference:  page 22
        // or @r,@s;
        // Reference:  page 40

        set(r3, alu.or16(get(r3), get(r2)));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x3c:
        // inv @r;
        // Reference:  page 22
        // or @r,@s;
        // Reference:  page 40

        set(r0, alu.or16(get(r0), get(r3)));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x3d:
        // inv @r;
        // Reference:  page 22
        // or @r,@s;
        // Reference:  page 40

        set(r1, alu.or16(get(r1), get(r3)));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x3e:
        // inv @r;
        // Reference:  page 22
        // or @r,@s;
        // Reference:  page 40

        set(r2, alu.or16(get(r2), get(r3)));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x3f:
        // inv @r;
        // Reference:  page 22

        set(r3, alu_invert16(get(r3)));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        // or @r,@s;
        // Reference:  page 40

        set(r3, alu.or16(get(r3), get(r3)));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x40:
        // add @r,@s;
        // Reference:  page 5

        set(r0, alu.add_u16u16c(get(r0), get(r0)));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x41:
        // add @r,@s;
        // Reference:  page 5

        set(r1, alu.add_u16u16c(get(r1), get(r0)));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x42:
        // add @r,@s;
        // Reference:  page 5

        set(r2, alu.add_u16u16c(get(r2), get(r0)));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x43:
        // add @r,@s;
        // Reference:  page 5

        set(r3, alu.add_u16u16c(get(r3), get(r0)));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x44:
        // add @r,@s;
        // Reference:  page 5

        set(r0, alu.add_u16u16c(get(r0), get(r1)));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x45:
        // add @r,@s;
        // Reference:  page 5

        set(r1, alu.add_u16u16c(get(r1), get(r1)));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x46:
        // add @r,@s;
        // Reference:  page 5

        set(r2, alu.add_u16u16c(get(r2), get(r1)));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x47:
        // add @r,@s;
        // Reference:  page 5

        set(r3, alu.add_u16u16c(get(r3), get(r1)));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x48:
        // add @r,@s;
        // Reference:  page 5

        set(r0, alu.add_u16u16c(get(r0), get(r2)));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x49:
        // add @r,@s;
        // Reference:  page 5

        set(r1, alu.add_u16u16c(get(r1), get(r2)));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x4a:
        // add @r,@s;
        // Reference:  page 5

        set(r2, alu.add_u16u16c(get(r2), get(r2)));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x4b:
        // add @r,@s;
        // Reference:  page 5

        set(r3, alu.add_u16u16c(get(r3), get(r2)));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x4c:
        // add @r,@s;
        // Reference:  page 5

        set(r0, alu.add_u16u16c(get(r0), get(r3)));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x4d:
        // add @r,@s;
        // Reference:  page 5

        set(r1, alu.add_u16u16c(get(r1), get(r3)));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x4e:
        // add @r,@s;
        // Reference:  page 5

        set(r2, alu.add_u16u16c(get(r2), get(r3)));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x4f:
        // add @r,@s;
        // Reference:  page 5

        set(r3, alu.add_u16u16c(get(r3), get(r3)));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x50:
        // addq @r,#@q;
        // Reference:  page 7

        set(r0, alu.add_u16u16c(get(r0), lit(2)));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x51:
        // addq @r,#@q;
        // Reference:  page 7

        set(r1, alu.add_u16u16c(get(r1), lit(2)));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x52:
        // addq @r,#@q;
        // Reference:  page 7

        set(r2, alu.add_u16u16c(get(r2), lit(2)));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x53:
        // addq @r,#@q;
        // Reference:  page 7

        set(r3, alu.add_u16u16c(get(r3), lit(2)));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x54:
        // addq @r,#@q;
        // Reference:  page 7

        set(r0, alu.add_u16u16c(get(r0), lit(1)));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x55:
        // addq @r,#@q;
        // Reference:  page 7

        set(r1, alu.add_u16u16c(get(r1), lit(1)));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x56:
        // addq @r,#@q;
        // Reference:  page 7

        set(r2, alu.add_u16u16c(get(r2), lit(1)));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x57:
        // addq @r,#@q;
        // Reference:  page 7

        set(r3, alu.add_u16u16c(get(r3), lit(1)));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x58:
        // addq @r,#@q;
        // Reference:  page 7

        set(r0, alu.add_u16u16c(get(r0), lit(-2)));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x59:
        // addq @r,#@q;
        // Reference:  page 7

        set(r1, alu.add_u16u16c(get(r1), lit(-2)));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x5a:
        // addq @r,#@q;
        // Reference:  page 7

        set(r2, alu.add_u16u16c(get(r2), lit(-2)));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x5b:
        // addq @r,#@q;
        // Reference:  page 7

        set(r3, alu.add_u16u16c(get(r3), lit(-2)));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x5c:
        // addq @r,#@q;
        // Reference:  page 7

        set(r0, alu.add_u16u16c(get(r0), lit(-1)));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x5d:
        // addq @r,#@q;
        // Reference:  page 7

        set(r1, alu.add_u16u16c(get(r1), lit(-1)));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x5e:
        // addq @r,#@q;
        // Reference:  page 7

        set(r2, alu.add_u16u16c(get(r2), lit(-1)));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x5f:
        // addq @r,#@q;
        // Reference:  page 7

        set(r3, alu.add_u16u16c(get(r3), lit(-1)));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x60:
        // neg @r;
        // Reference:  page 37

        set(r0, alu_neg16(get(r0)));
        clearFlagN();
        clearFlagZ();
        clearFlagV();
        clearFlagX();
        clearFlagC();
        pc.add(1);
        return 1;


        // sub @r,@s;
        // Reference:  page 52

        set(r0, alu.add_u16u16c(get(r0), -get(r0)));
        clearFlagN();
        clearFlagZ();
        clearFlagV();
        clearFlagX();
        clearFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x61:
        // neg @r;
        // Reference:  page 37
        // sub @r,@s;
        // Reference:  page 52

        set(r1, alu.add_u16u16c(get(r1), -get(r0)));
        clearFlagN();
        clearFlagZ();
        clearFlagV();
        clearFlagX();
        clearFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x62:
        // neg @r;
        // Reference:  page 37
        // sub @r,@s;
        // Reference:  page 52

        set(r2, alu.add_u16u16c(get(r2), -get(r0)));
        clearFlagN();
        clearFlagZ();
        clearFlagV();
        clearFlagX();
        clearFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x63:
        // neg @r;
        // Reference:  page 37
        // sub @r,@s;
        // Reference:  page 52

        set(r3, alu.add_u16u16c(get(r3), -get(r0)));
        clearFlagN();
        clearFlagZ();
        clearFlagV();
        clearFlagX();
        clearFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x64:
        // neg @r;
        // Reference:  page 37
        // sub @r,@s;
        // Reference:  page 52

        set(r0, alu.add_u16u16c(get(r0), -get(r1)));
        clearFlagN();
        clearFlagZ();
        clearFlagV();
        clearFlagX();
        clearFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x65:
        // neg @r;
        // Reference:  page 37

        set(r1, alu_neg16(get(r1)));
        clearFlagN();
        clearFlagZ();
        clearFlagV();
        clearFlagX();
        clearFlagC();
        pc.add(1);
        return 1;


        // sub @r,@s;
        // Reference:  page 52

        set(r1, alu.add_u16u16c(get(r1), -get(r1)));
        clearFlagN();
        clearFlagZ();
        clearFlagV();
        clearFlagX();
        clearFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x66:
        // neg @r;
        // Reference:  page 37
        // sub @r,@s;
        // Reference:  page 52

        set(r2, alu.add_u16u16c(get(r2), -get(r1)));
        clearFlagN();
        clearFlagZ();
        clearFlagV();
        clearFlagX();
        clearFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x67:
        // neg @r;
        // Reference:  page 37
        // sub @r,@s;
        // Reference:  page 52

        set(r3, alu.add_u16u16c(get(r3), -get(r1)));
        clearFlagN();
        clearFlagZ();
        clearFlagV();
        clearFlagX();
        clearFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x68:
        // neg @r;
        // Reference:  page 37
        // sub @r,@s;
        // Reference:  page 52

        set(r0, alu.add_u16u16c(get(r0), -get(r2)));
        clearFlagN();
        clearFlagZ();
        clearFlagV();
        clearFlagX();
        clearFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x69:
        // neg @r;
        // Reference:  page 37
        // sub @r,@s;
        // Reference:  page 52

        set(r1, alu.add_u16u16c(get(r1), -get(r2)));
        clearFlagN();
        clearFlagZ();
        clearFlagV();
        clearFlagX();
        clearFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x6a:
        // neg @r;
        // Reference:  page 37

        set(r2, alu_neg16(get(r2)));
        clearFlagN();
        clearFlagZ();
        clearFlagV();
        clearFlagX();
        clearFlagC();
        pc.add(1);
        return 1;


        // sub @r,@s;
        // Reference:  page 52

        set(r2, alu.add_u16u16c(get(r2), -get(r2)));
        clearFlagN();
        clearFlagZ();
        clearFlagV();
        clearFlagX();
        clearFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x6b:
        // neg @r;
        // Reference:  page 37
        // sub @r,@s;
        // Reference:  page 52

        set(r3, alu.add_u16u16c(get(r3), -get(r2)));
        clearFlagN();
        clearFlagZ();
        clearFlagV();
        clearFlagX();
        clearFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x6c:
        // neg @r;
        // Reference:  page 37
        // sub @r,@s;
        // Reference:  page 52

        set(r0, alu.add_u16u16c(get(r0), -get(r3)));
        clearFlagN();
        clearFlagZ();
        clearFlagV();
        clearFlagX();
        clearFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x6d:
        // neg @r;
        // Reference:  page 37
        // sub @r,@s;
        // Reference:  page 52

        set(r1, alu.add_u16u16c(get(r1), -get(r3)));
        clearFlagN();
        clearFlagZ();
        clearFlagV();
        clearFlagX();
        clearFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x6e:
        // neg @r;
        // Reference:  page 37
        // sub @r,@s;
        // Reference:  page 52

        set(r2, alu.add_u16u16c(get(r2), -get(r3)));
        clearFlagN();
        clearFlagZ();
        clearFlagV();
        clearFlagX();
        clearFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x6f:
        // neg @r;
        // Reference:  page 37

        set(r3, alu_neg16(get(r3)));
        clearFlagN();
        clearFlagZ();
        clearFlagV();
        clearFlagX();
        clearFlagC();
        pc.add(1);
        return 1;


        // sub @r,@s;
        // Reference:  page 52

        set(r3, alu.add_u16u16c(get(r3), -get(r3)));
        clearFlagN();
        clearFlagZ();
        clearFlagV();
        clearFlagX();
        clearFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x70:
        // abs @r;
        // Reference:  page 4

        set(r0, alu.abs16(get(r0)));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 1;


        // cmp @r,@s;
        // Reference:  page 19

        alu_cmp16(get(r0), get(r0));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x71:
        // abs @r;
        // Reference:  page 4
        // cmp @r,@s;
        // Reference:  page 19

        alu_cmp16(get(r1), get(r0));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x72:
        // abs @r;
        // Reference:  page 4
        // cmp @r,@s;
        // Reference:  page 19

        alu_cmp16(get(r2), get(r0));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x73:
        // abs @r;
        // Reference:  page 4
        // cmp @r,@s;
        // Reference:  page 19

        alu_cmp16(get(r3), get(r0));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x74:
        // abs @r;
        // Reference:  page 4
        // cmp @r,@s;
        // Reference:  page 19

        alu_cmp16(get(r0), get(r1));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x75:
        // abs @r;
        // Reference:  page 4

        set(r1, alu.abs16(get(r1)));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 1;


        // cmp @r,@s;
        // Reference:  page 19

        alu_cmp16(get(r1), get(r1));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x76:
        // abs @r;
        // Reference:  page 4
        // cmp @r,@s;
        // Reference:  page 19

        alu_cmp16(get(r2), get(r1));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x77:
        // abs @r;
        // Reference:  page 4
        // cmp @r,@s;
        // Reference:  page 19

        alu_cmp16(get(r3), get(r1));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x78:
        // abs @r;
        // Reference:  page 4
        // cmp @r,@s;
        // Reference:  page 19

        alu_cmp16(get(r0), get(r2));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x79:
        // abs @r;
        // Reference:  page 4
        // cmp @r,@s;
        // Reference:  page 19

        alu_cmp16(get(r1), get(r2));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x7a:
        // abs @r;
        // Reference:  page 4

        set(r2, alu.abs16(get(r2)));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 1;


        // cmp @r,@s;
        // Reference:  page 19

        alu_cmp16(get(r2), get(r2));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x7b:
        // abs @r;
        // Reference:  page 4
        // cmp @r,@s;
        // Reference:  page 19

        alu_cmp16(get(r3), get(r2));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x7c:
        // abs @r;
        // Reference:  page 4
        // cmp @r,@s;
        // Reference:  page 19

        alu_cmp16(get(r0), get(r3));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x7d:
        // abs @r;
        // Reference:  page 4
        // cmp @r,@s;
        // Reference:  page 19

        alu_cmp16(get(r1), get(r3));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x7e:
        // abs @r;
        // Reference:  page 4
        // cmp @r,@s;
        // Reference:  page 19

        alu_cmp16(get(r2), get(r3));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x7f:
        // abs @r;
        // Reference:  page 4

        set(r3, alu.abs16(get(r3)));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 1;


        // cmp @r,@s;
        // Reference:  page 19

        alu_cmp16(get(r3), get(r3));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x80:
        // ld.w @r,(@s);
        // Reference:  page 28

        set(r0, read16(get(r2)));
        computeFlags16(get(r0));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 2;


        break;

      case 0x81:
        // ld.w @r,(@s);
        // Reference:  page 28

        set(r1, read16(get(r2)));
        computeFlags16(get(r1));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 2;


        break;

      case 0x82:
        // ld.w @r,(@s);
        // Reference:  page 28

        set(r0, read16(get(r3)));
        computeFlags16(get(r0));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 2;


        break;

      case 0x83:
        // ld.w @r,(@s);
        // Reference:  page 28

        set(r1, read16(get(r3)));
        computeFlags16(get(r1));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 2;


        break;

      case 0x84:
        // ld.b @r,(@s);
        // Reference:  page 28

        set(r0, read8(get(r2)));
        computeFlags16(get(r0));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 2;


        break;

      case 0x85:
        // ld.b @r,(@s);
        // Reference:  page 28

        set(r1, read8(get(r2)));
        computeFlags16(get(r1));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 2;


        break;

      case 0x86:
        // ld.b @r,(@s);
        // Reference:  page 28

        set(r0, read8(get(r3)));
        computeFlags16(get(r0));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 2;


        break;

      case 0x87:
        // ld.b @r,(@s);
        // Reference:  page 28

        set(r1, read8(get(r3)));
        computeFlags16(get(r1));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 2;


        break;

      case 0x88:
        // st.w (@s),@r;
        // Reference:  page 28

        write16((get(r2)), get(r0));
        computeFlags16(get(r0));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 2;


        break;

      case 0x89:
        // st.w (@s),@r;
        // Reference:  page 28

        write16((get(r2)), get(r1));
        computeFlags16(get(r1));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 2;


        break;

      case 0x8a:
        // st.w (@s),@r;
        // Reference:  page 28

        write16((get(r3)), get(r0));
        computeFlags16(get(r0));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 2;


        break;

      case 0x8b:
        // st.w (@s),@r;
        // Reference:  page 28

        write16((get(r3)), get(r1));
        computeFlags16(get(r1));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 2;


        break;

      case 0x8c:
        // st.b (@s),@r;
        // Reference:  page 28

        write8(get(r2), get(r0));
        computeFlags16(get(r0));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 2;


        break;

      case 0x8d:
        // st.b (@s),@r;
        // Reference:  page 28

        write8(get(r2), get(r1));
        computeFlags16(get(r1));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 2;


        break;

      case 0x8e:
        // st.b (@s),@r;
        // Reference:  page 28

        write8(get(r3), get(r0));
        computeFlags16(get(r0));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 2;


        break;

      case 0x8f:
        // st.b (@s),@r;
        // Reference:  page 28

        write8(get(r3), get(r1));
        computeFlags16(get(r1));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 2;


        break;

      case 0x90:
        // ld.w @s,(@r++);
        // Reference:  page 29

        set(r0, read16(get(r2)));
        set(r2, alu.add_u16u16c(get(r2), lit(2)));
        computeFlags16(get(r0));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 2;


        break;

      case 0x91:
        // ld.w @s,(@r++);
        // Reference:  page 29

        set(r1, read16(get(r2)));
        set(r2, alu.add_u16u16c(get(r2), lit(2)));
        computeFlags16(get(r1));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 2;


        break;

      case 0x92:
        // ld.w @s,(@r++);
        // Reference:  page 29

        set(r0, read16(get(r3)));
        set(r3, alu.add_u16u16c(get(r3), lit(2)));
        computeFlags16(get(r0));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 2;


        break;

      case 0x93:
        // ld.w @s,(@r++);
        // Reference:  page 29

        set(r1, read16(get(r3)));
        set(r3, alu.add_u16u16c(get(r3), lit(2)));
        computeFlags16(get(r1));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 2;


        break;

      case 0x94:
        // ld.b @s,(@r++);
        // Reference:  page 29

        set(r0, read8(get(r2)));
        set(r2, alu.add_u16u16c(get(r2), lit(1)));
        computeFlags16(get(r0));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 2;


        break;

      case 0x95:
        // ld.b @s,(@r++);
        // Reference:  page 29

        set(r1, read8(get(r2)));
        set(r2, alu.add_u16u16c(get(r2), lit(1)));
        computeFlags16(get(r1));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 2;


        break;

      case 0x96:
        // ld.b @s,(@r++);
        // Reference:  page 29

        set(r0, read8(get(r3)));
        set(r3, alu.add_u16u16c(get(r3), lit(1)));
        computeFlags16(get(r0));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 2;


        break;

      case 0x97:
        // ld.b @s,(@r++);
        // Reference:  page 29

        set(r1, read8(get(r3)));
        set(r3, alu.add_u16u16c(get(r3), lit(1)));
        computeFlags16(get(r1));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 2;


        break;

      case 0x98:
        // st.w (@r++),@s;
        // Reference:  page 29

        write16(get(r2), get(r0));
        set(r2, alu.add_u16u16c(get(r2), lit(2)));
        computeFlags16(get(r0));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 2;


        break;

      case 0x99:
        // st.w (@r++),@s;
        // Reference:  page 29

        write16(get(r2), get(r1));
        set(r2, alu.add_u16u16c(get(r2), lit(2)));
        computeFlags16(get(r1));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 2;


        break;

      case 0x9a:
        // st.w (@r++),@s;
        // Reference:  page 29

        write16(get(r3), get(r0));
        set(r3, alu.add_u16u16c(get(r3), lit(2)));
        computeFlags16(get(r0));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 2;


        break;

      case 0x9b:
        // st.w (@r++),@s;
        // Reference:  page 29

        write16(get(r3), get(r1));
        set(r3, alu.add_u16u16c(get(r3), lit(2)));
        computeFlags16(get(r1));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 2;


        break;

      case 0x9c:
        // st.b (@r++),@s;
        // Reference:  page 29

        write8(get(r2), get(r0));
        set(r2, alu.add_u16u16c(get(r2), lit(1)));
        computeFlags16(get(r0));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 2;


        break;

      case 0x9d:
        // st.b (@r++),@s;
        // Reference:  page 29

        write8(get(r2), get(r1));
        set(r2, alu.add_u16u16c(get(r2), lit(1)));
        computeFlags16(get(r1));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 2;


        break;

      case 0x9e:
        // st.b (@r++),@s;
        // Reference:  page 29

        write8(get(r3), get(r0));
        set(r3, alu.add_u16u16c(get(r3), lit(1)));
        computeFlags16(get(r0));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 2;


        break;

      case 0x9f:
        // st.b (@r++),@s;
        // Reference:  page 29

        write8(get(r3), get(r1));
        set(r3, alu.add_u16u16c(get(r3), lit(1)));
        computeFlags16(get(r1));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(1);
        return 2;


        break;

      case 0xa0:
        // ld.w @r, (SP,@n);
        // Reference:  page 30

        set(tmp16, emf.Maths.add_u16u8(get(sp), lit(read8(pc.getUnsigned() + (1)))));
        set(r0, read16(get(tmp16)));
        computeFlags16(get(r0));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(2);
        return 2;


        break;

      case 0xa1:
        // ld.w @r, (SP,@n);
        // Reference:  page 30

        set(tmp16, emf.Maths.add_u16u8(get(sp), lit(read8(pc.getUnsigned() + (1)))));
        set(r1, read16(get(tmp16)));
        computeFlags16(get(r1));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(2);
        return 2;


        break;

      case 0xa2:
        // ld.w @r, (SP,@n);
        // Reference:  page 30

        set(tmp16, emf.Maths.add_u16u8(get(sp), lit(read8(pc.getUnsigned() + (1)))));
        set(r2, read16(get(tmp16)));
        computeFlags16(get(r2));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(2);
        return 2;


        break;

      case 0xa3:
        // ld.w @r, (SP,@n);
        // Reference:  page 30

        set(tmp16, emf.Maths.add_u16u8(get(sp), lit(read8(pc.getUnsigned() + (1)))));
        set(r3, read16(get(tmp16)));
        computeFlags16(get(r3));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(2);
        return 2;


        break;

      case 0xa4:
        // ld.b @r, (SP,@n);
        // Reference:  page 30

        set(tmp16, emf.Maths.add_u16u8(get(sp), lit(read8(pc.getUnsigned() + (1)))));
        set(r0, read8(get(tmp16)));
        computeFlags16(get(r0));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(2);
        return 2;


        break;

      case 0xa5:
        // ld.b @r, (SP,@n);
        // Reference:  page 30

        set(tmp16, emf.Maths.add_u16u8(get(sp), lit(read8(pc.getUnsigned() + (1)))));
        set(r1, read8(get(tmp16)));
        computeFlags16(get(r1));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(2);
        return 2;


        break;

      case 0xa6:
        // ld.b @r, (SP,@n);
        // Reference:  page 30

        set(tmp16, emf.Maths.add_u16u8(get(sp), lit(read8(pc.getUnsigned() + (1)))));
        set(r2, read8(get(tmp16)));
        computeFlags16(get(r2));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(2);
        return 2;


        break;

      case 0xa7:
        // ld.b @r, (SP,@n);
        // Reference:  page 30

        set(tmp16, emf.Maths.add_u16u8(get(sp), lit(read8(pc.getUnsigned() + (1)))));
        set(r3, read8(get(tmp16)));
        computeFlags16(get(r3));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(2);
        return 2;


        break;

      case 0xa8:
        // st.w (SP,@n), @r;
        // Reference:  page 30

        set(tmp16, emf.Maths.add_u16u8(get(sp), lit(read8(pc.getUnsigned() + (1)))));
        write16(get(tmp16), get(r0));
        computeFlags16(get(r0));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(2);
        return 2;


        break;

      case 0xa9:
        // st.w (SP,@n), @r;
        // Reference:  page 30

        set(tmp16, emf.Maths.add_u16u8(get(sp), lit(read8(pc.getUnsigned() + (1)))));
        write16(get(tmp16), get(r1));
        computeFlags16(get(r1));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(2);
        return 2;


        break;

      case 0xaa:
        // st.w (SP,@n), @r;
        // Reference:  page 30

        set(tmp16, emf.Maths.add_u16u8(get(sp), lit(read8(pc.getUnsigned() + (1)))));
        write16(get(tmp16), get(r2));
        computeFlags16(get(r2));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(2);
        return 2;


        break;

      case 0xab:
        // st.w (SP,@n), @r;
        // Reference:  page 30

        set(tmp16, emf.Maths.add_u16u8(get(sp), lit(read8(pc.getUnsigned() + (1)))));
        write16(get(tmp16), get(r3));
        computeFlags16(get(r3));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(2);
        return 2;


        break;

      case 0xac:
        // st.b (SP,@n), @r;
        // Reference:  page 30

        set(tmp16, emf.Maths.add_u16u8(get(sp), lit(read8(pc.getUnsigned() + (1)))));
        write8(get(tmp16), get(r0));
        computeFlags16(get(r0));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(2);
        return 2;


        break;

      case 0xad:
        // st.b (SP,@n), @r;
        // Reference:  page 30

        set(tmp16, emf.Maths.add_u16u8(get(sp), lit(read8(pc.getUnsigned() + (1)))));
        write8(get(tmp16), get(r1));
        computeFlags16(get(r1));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(2);
        return 2;


        break;

      case 0xae:
        // st.b (SP,@n), @r;
        // Reference:  page 30

        set(tmp16, emf.Maths.add_u16u8(get(sp), lit(read8(pc.getUnsigned() + (1)))));
        write8(get(tmp16), get(r2));
        computeFlags16(get(r2));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(2);
        return 2;


        break;

      case 0xaf:
        // st.b (SP,@n), @r;
        // Reference:  page 30

        set(tmp16, emf.Maths.add_u16u8(get(sp), lit(read8(pc.getUnsigned() + (1)))));
        write8(get(tmp16), get(r3));
        computeFlags16(get(r3));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(2);
        return 2;


        break;

      case 0xb0:
        // ld.w @r,@n;
        // Reference:  page 31

        set(r0, read16(lit(read16(pc.getUnsigned() + (1)))));
        computeFlags16(get(r0));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(3);
        return 2;


        break;

      case 0xb1:
        // ld.w @r,@n;
        // Reference:  page 31

        set(r1, read16(lit(read16(pc.getUnsigned() + (1)))));
        computeFlags16(get(r1));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(3);
        return 2;


        break;

      case 0xb2:
        // ld.w @r,@n;
        // Reference:  page 31

        set(r2, read16(lit(read16(pc.getUnsigned() + (1)))));
        computeFlags16(get(r2));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(3);
        return 2;


        break;

      case 0xb3:
        // ld.w @r,@n;
        // Reference:  page 31

        set(r3, read16(lit(read16(pc.getUnsigned() + (1)))));
        computeFlags16(get(r3));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(3);
        return 2;


        break;

      case 0xb4:
        // ld.b @r,@n;
        // Reference:  page 31

        set(r0, read8(lit(read16(pc.getUnsigned() + (1)))));
        computeFlags16(get(r0));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(3);
        return 3;


        break;

      case 0xb5:
        // ld.b @r,@n;
        // Reference:  page 31

        set(r1, read8(lit(read16(pc.getUnsigned() + (1)))));
        computeFlags16(get(r1));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(3);
        return 3;


        break;

      case 0xb6:
        // ld.b @r,@n;
        // Reference:  page 31

        set(r2, read8(lit(read16(pc.getUnsigned() + (1)))));
        computeFlags16(get(r2));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(3);
        return 3;


        break;

      case 0xb7:
        // ld.b @r,@n;
        // Reference:  page 31

        set(r3, read8(lit(read16(pc.getUnsigned() + (1)))));
        computeFlags16(get(r3));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(3);
        return 3;


        break;

      case 0xb8:
        // st.w @n, @r;
        // Reference:  page 31

        write16(lit(read16(pc.getUnsigned() + (1))), get(r0));
        computeFlags16(get(r0));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(3);
        return 2;


        break;

      case 0xb9:
        // st.w @n, @r;
        // Reference:  page 31

        write16(lit(read16(pc.getUnsigned() + (1))), get(r1));
        computeFlags16(get(r1));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(3);
        return 2;


        break;

      case 0xba:
        // st.w @n, @r;
        // Reference:  page 31

        write16(lit(read16(pc.getUnsigned() + (1))), get(r2));
        computeFlags16(get(r2));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(3);
        return 2;


        break;

      case 0xbb:
        // st.w @n, @r;
        // Reference:  page 31

        write16(lit(read16(pc.getUnsigned() + (1))), get(r3));
        computeFlags16(get(r3));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(3);
        return 2;


        break;

      case 0xbc:
        // st.b @n,@r;
        // Reference:  page 31

        write8(lit(read16(pc.getUnsigned() + (1))), get(r0));
        computeFlags16(get(r0));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(3);
        return 2;


        break;

      case 0xbd:
        // st.b @n,@r;
        // Reference:  page 31

        write8(lit(read16(pc.getUnsigned() + (1))), get(r1));
        computeFlags16(get(r1));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(3);
        return 2;


        break;

      case 0xbe:
        // st.b @n,@r;
        // Reference:  page 31

        write8(lit(read16(pc.getUnsigned() + (1))), get(r2));
        computeFlags16(get(r2));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(3);
        return 2;


        break;

      case 0xbf:
        // st.b @n,@r;
        // Reference:  page 31

        write8(lit(read16(pc.getUnsigned() + (1))), get(r3));
        computeFlags16(get(r3));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(3);
        return 2;


        break;

      case 0xc0:
        // pop @r;
        // Reference:  page 42

        set(r0, read16(sp));
        set(sp, emf.Maths.add_u16u16(get(sp), lit(2)));
        pc.add(1);
        return 3;


        break;

      case 0xc1:
        // pop @r;
        // Reference:  page 42

        set(r1, read16(sp));
        set(sp, emf.Maths.add_u16u16(get(sp), lit(2)));
        pc.add(1);
        return 3;


        break;

      case 0xc2:
        // pop @r;
        // Reference:  page 42

        set(r2, read16(sp));
        set(sp, emf.Maths.add_u16u16(get(sp), lit(2)));
        pc.add(1);
        return 3;


        break;

      case 0xc3:
        // pop @r;
        // Reference:  page 42

        set(r3, read16(sp));
        set(sp, emf.Maths.add_u16u16(get(sp), lit(2)));
        pc.add(1);
        return 3;


        break;

      case 0xc4:
        // pop PS;
        // Reference:  page 42

        set(ps, read8(sp));
        set(sp, emf.Maths.add_u16u16(get(sp), lit(1)));
        pc.add(1);
        return 3;


        break;

      case 0xc5:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xc6:
        // ret;
        // Reference:  page 44

        pc.assign(read16(sp) - 1);
        sp.assign(emf.Maths.add_u16u16(sp, 2));
        pc.add(1);
        return 4;


        break;

      case 0xc7:
        // reti;
        // Reference:  page 45

        ps.assign(read8(sp));
        sp.assign(emf.Maths.add_u16u16(sp, 1));
        pc.assign(read16(sp) - 1);
        sp.assign(emf.Maths.add_u16u16(sp, 2));
        affectFlagI();
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 5;


        break;

      case 0xc8:
        // push @r;
        // Reference:  page 42

        set(sp, emf.Maths.add_u16u16(get(sp), lit(-2)));
        write16(get(sp), get(r0));
        pc.add(1);
        return 3;


        break;

      case 0xc9:
        // push @r;
        // Reference:  page 42

        set(sp, emf.Maths.add_u16u16(get(sp), lit(-2)));
        write16(get(sp), get(r1));
        pc.add(1);
        return 3;


        break;

      case 0xca:
        // push @r;
        // Reference:  page 42

        set(sp, emf.Maths.add_u16u16(get(sp), lit(-2)));
        write16(get(sp), get(r2));
        pc.add(1);
        return 3;


        break;

      case 0xcb:
        // push @r;
        // Reference:  page 42

        set(sp, emf.Maths.add_u16u16(get(sp), lit(-2)));
        write16(get(sp), get(r3));
        pc.add(1);
        return 3;


        break;

      case 0xcc:
        // push PS;
        // Reference:  page 42

        set(sp, emf.Maths.add_u16u16(get(sp), lit(-1)));
        write8(get(sp), get(ps));
        pc.add(1);
        return 2;


        break;

      case 0xcd:
        // trap;
        // Reference:  page 56

        mp_trapVector(3);
        clearFlagI();
        pc.add(1);
        return 6;


        break;

      case 0xce:
        // jsr (r0);
        // Reference:  page 25

        set(sp, emf.Maths.add_u16u16(sp, lit(-2)));;
        write16(get(sp), emf.Maths.add_u16u16(pc, 1));;
        set(pc, emf.Maths.add_u16u16(r0, -1));
        pc.add(1);
        return 3;


        break;

      case 0xcf:
        // jsr @n;
        // Reference:  page 26

        set(sp, emf.Maths.add_u16u16(sp, lit(-2)));;
        write16(get(sp), emf.Maths.add_u16u16(pc, 3));;
        set(pc, emf.Maths.add_u16u16(read16(pc.getUnsigned() + (1)), -3));
        pc.add(3);
        return 3;


        // pushpop;
        // Reference:  page 39

        ;
        pc.add(1);
        return 1;


        break;

      case 0xd0:
        // ld.w @r,#@n;
        // Reference:  page 27

        set(r0, lit(read16(pc.getUnsigned() + (1))));
        computeFlags16(get(r0));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(3);
        return 3;


        break;

      case 0xd1:
        // ld.w @r,#@n;
        // Reference:  page 27

        set(r1, lit(read16(pc.getUnsigned() + (1))));
        computeFlags16(get(r1));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(3);
        return 3;


        break;

      case 0xd2:
        // ld.w @r,#@n;
        // Reference:  page 27

        set(r2, lit(read16(pc.getUnsigned() + (1))));
        computeFlags16(get(r2));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(3);
        return 3;


        break;

      case 0xd3:
        // ld.w @r,#@n;
        // Reference:  page 27

        set(r3, lit(read16(pc.getUnsigned() + (1))));
        computeFlags16(get(r3));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(3);
        return 3;


        break;

      case 0xd4:
        // ld.b @r, #@n;
        // Reference:  page 27

        set(r0, lit(read8(pc.getUnsigned() + (1))));
        computeFlags16(get(r0));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(2);
        return 2;


        break;

      case 0xd5:
        // ld.b @r, #@n;
        // Reference:  page 27

        set(r1, lit(read8(pc.getUnsigned() + (1))));
        computeFlags16(get(r1));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(2);
        return 2;


        break;

      case 0xd6:
        // ld.b @r, #@n;
        // Reference:  page 27

        set(r2, lit(read8(pc.getUnsigned() + (1))));
        computeFlags16(get(r2));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(2);
        return 2;


        break;

      case 0xd7:
        // ld.b @r, #@n;
        // Reference:  page 27

        set(r3, lit(read8(pc.getUnsigned() + (1))));
        computeFlags16(get(r3));
        clearFlagV();
        clearFlagC();
        affectFlagN();
        affectFlagZ();
        pc.add(2);
        return 2;


        break;

      case 0xd8:
        // LSL;
        // Reference:  page 32
        // Reference: This is all shifts, logical and arithmetic
        // return d8_ext();
        // extended instructions beginning d8 called lsl

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return lsl_ext('r0', r0);;
        pc.add(1);
        return 0;


        break;

      case 0xd9:
        // LSL;
        // Reference:  page 32
        // Reference: This is all shifts, logical and arithmetic
        // return d9_ext();
        // extended instructions beginning d9 called lsl

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return lsl_ext('r1', r1);;
        pc.add(1);
        return 0;


        break;

      case 0xda:
        // LSL;
        // Reference:  page 32
        // Reference: This is all shifts, logical and arithmetic
        // return da_ext();
        // extended instructions beginning da called lsl

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return lsl_ext('r2', r2);;
        pc.add(1);
        return 0;


        break;

      case 0xdb:
        // LSL;
        // Reference:  page 32
        // Reference: This is all shifts, logical and arithmetic
        // return db_ext();
        // extended instructions beginning db called lsl

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return lsl_ext('r3', r3);;
        pc.add(1);
        return 0;


        break;

      case 0xdc:
        // bchg;
        // Reference:  page 15
        // return dc_ext();
        // extended instructions beginning dc called bits

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return bits_ext('r0', r0);;
        pc.add(1);
        return 0;


        break;

      case 0xdd:
        // bchg;
        // Reference:  page 15
        // return dd_ext();
        // extended instructions beginning dd called bits

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return bits_ext('r1', r1);;
        pc.add(1);
        return 0;


        break;

      case 0xde:
        // bchg;
        // Reference:  page 15
        // return de_ext();
        // extended instructions beginning de called bits

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return bits_ext('r2', r2);;
        pc.add(1);
        return 0;


        break;

      case 0xdf:
        // bchg;
        // Reference:  page 15
        // return df_ext();
        // extended instructions beginning df called bits

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return bits_ext('r3', r3);;
        pc.add(1);
        return 0;


        break;

      case 0xe0:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xe1:
        // buc @n;
        // Reference:  page 13

        if ((getFlagU() == 0)) {
          set(pc, emf.Maths.add_u16s8(pc, lit(read8(pc.getUnsigned() + (1)))));
          cycles = 1;
        }
        pc.add(2);
        return 2 + cycles;


        // bus @n;
        // Reference:  page 13

        if ((getFlagU() == 1)) {
          set(pc, emf.Maths.add_u16s8(pc, lit(read8(pc.getUnsigned() + (1)))));
          cycles = 1;
        }
        pc.add(2);
        return 2 + cycles;


        break;

      case 0xe2:
        // bhi @n;
        // Reference:  page 13

        if ((getFlagC() == 0) && (getFlagZ() == 0)) {
          set(pc, emf.Maths.add_u16s8(pc, lit(read8(pc.getUnsigned() + (1)))));
          cycles = 1;
        }
        pc.add(2);
        return 2 + cycles;


        break;

      case 0xe3:
        // blo @n;
        // Reference:  page 13

        if ((getFlagC() == 1) || (getFlagZ() == 1)) {
          set(pc, emf.Maths.add_u16s8(pc, lit(read8(pc.getUnsigned() + (1)))));
          cycles = 1;
        }
        pc.add(2);
        return 2 + cycles;


        break;

      case 0xe4:
        // bcc @n;
        // Reference:  page 13

        if ((getFlagC() == 0)) {
          set(pc, emf.Maths.add_u16s8(pc, lit(read8(pc.getUnsigned() + (1)))));
          cycles = 1;
        }
        pc.add(2);
        return 2 + cycles;


        break;

      case 0xe5:
        // bcs @n;
        // Reference:  page 13

        if ((getFlagC() == 1)) {
          set(pc, emf.Maths.add_u16s8(pc, lit(read8(pc.getUnsigned() + (1)))));
          cycles = 1;
        }
        pc.add(2);
        return 2 + cycles;


        break;

      case 0xe6:
        // bne @n;
        // Reference:  page 13

        if ((getFlagZ() == 0)) {
          set(pc, emf.Maths.add_u16s8(pc, lit(read8(pc.getUnsigned() + (1)))));
          cycles = 1;
        }
        pc.add(2);
        return 2 + cycles;


        break;

      case 0xe7:
        // beq @n;
        // Reference:  page 13

        if ((getFlagZ() == 1)) {
          set(pc, emf.Maths.add_u16s8(pc, lit(read8(pc.getUnsigned() + (1)))));
          cycles = 1;
        }
        pc.add(2);
        return 2 + cycles;


        break;

      case 0xe8:
        // bvc @n;
        // Reference:  page 13

        if ((getFlagV() == 0)) {
          set(pc, emf.Maths.add_u16s8(pc, lit(read8(pc.getUnsigned() + (1)))));
          cycles = 1;
        }
        pc.add(2);
        return 2 + cycles;


        break;

      case 0xe9:
        // bvs @n;
        // Reference:  page 13

        if ((getFlagV() == 1)) {
          set(pc, emf.Maths.add_u16s8(pc, lit(read8(pc.getUnsigned() + (1)))));
          cycles = 1;
        }
        pc.add(2);
        return 2 + cycles;


        break;

      case 0xea:
        // bpl @n;
        // Reference:  page 13

        if ((getFlagN() == 0)) {
          set(pc, emf.Maths.add_u16s8(pc, lit(read8(pc.getUnsigned() + (1)))));
          cycles = 1;
        }
        pc.add(2);
        return 2 + cycles;


        break;

      case 0xeb:
        // bmi @n;
        // Reference:  page 13

        if ((getFlagN() == 1)) {
          set(pc, emf.Maths.add_u16s8(pc, lit(read8(pc.getUnsigned() + (1)))));
          cycles = 1;
        }
        pc.add(2);
        return 2 + cycles;


        break;

      case 0xec:
        // bge @n;
        // Reference:  page 13

        if (((getFlagN() == 1) && (getFlagV() == 1)) || ((getFlagN() == 0) && (getFlagV() == 0))) {
          set(pc, emf.Maths.add_u16s8(pc, lit(read8(pc.getUnsigned() + (1)))));
          cycles = 1;
        }
        pc.add(2);
        return 2 + cycles;


        break;

      case 0xed:
        // blt @n;
        // Reference:  page 13

        if (((getFlagN() == 1) && (getFlagV() == 0)) || ((getFlagN() == 0) && (getFlagV() == 1))) {
          set(pc, emf.Maths.add_u16s8(pc, lit(read8(pc.getUnsigned() + (1)))));
          cycles = 1;
        }
        pc.add(2);
        return 2 + cycles;


        break;

      case 0xee:
        // bgt @n;
        // Reference:  page 13

        if (((getFlagN() == 1) && (getFlagV() == 1) && (getFlagZ() == 0)) || ((getFlagN() == 0) && (getFlagV() == 0) && (getFlagZ() == 0))) {
          pc.assign(emf.Maths.add_u16u16(emf_Maths_add_u16s8(pc, read8(pc.getUnsigned() + (1))), 0));
          cycles = 1;
        }
        pc.add(2);
        return 2 + cycles;


        break;

      case 0xef:
        // ble @n;
        // Reference:  page 13

        if (((getFlagZ() == 1)) || ((getFlagN() == 1) && (getFlagV() == 0)) || ((getFlagN() == 0) && (getFlagV() == 1))) {
          pc.assign(emf.Maths.add_u16u16(emf_Maths_add_u16s8(pc, read8(pc.getUnsigned() + (1))), 0));
          cycles = 1;
        }
        pc.add(2);
        return 2 + cycles;


        break;

      case 0xf0:
        // move r0,sp;
        // Reference:  page 35

        set(r0, get(sp));
        pc.add(1);
        return 1;


        break;

      case 0xf1:
        // move sp,r0;
        // Reference:  page 35

        set(sp, get(r0));
        pc.add(1);
        return 1;


        break;

      case 0xf2:
        // JMP (r0);
        // Reference:  page 23

        set(pc, emf.Maths.add_u16u16(r0, -1));
        pc.add(1);
        return 2;


        break;

      case 0xf3:
        // JMP @n;
        // Reference:  page 24

        set(pc, emf.Maths.add_u16u16(read16(pc.getUnsigned() + (1)), -3));
        pc.add(3);
        return 4;


        break;

      case 0xf4:
        // and PS,@n;
        // Reference:  page 9

        set(ps, alu.and16(get(ps), lit(read8(pc.getUnsigned() + (1)))));
        affectFlagI();
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(2);
        return 1;


        break;

      case 0xf5:
        // or PS,#n;
        // Reference:  page 41

        set(ps, alu.or16(get(ps), lit(read7(pc.getUnsigned() + (1)))));
        affectFlagI();
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 2;


        break;

      case 0xf6:
        // add sp,#n;
        // Reference:  page 6

        set(sp, emf.Maths.add_u16s8(get(sp), lit(read8(pc.getUnsigned() + (1)))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(2);
        return 1;


        break;

      case 0xf7:
        // sqrt;
        // Reference:  page 50

        alu_sqrt();
        clearFlagN();
        clearFlagZ();
        clearFlagV();
        clearFlagX();
        clearFlagC();
        pc.add(1);
        return 18;


        break;

      case 0xf8:
        // mulu;
        // Reference:  page 35

        alu_mulu();
        clearFlagN();
        clearFlagZ();
        clearFlagV();
        clearFlagX();
        clearFlagC();
        pc.add(1);
        return 1;


        break;

      case 0xf9:
        // muls;
        // Reference:  page 35

        alu_muls();
        clearFlagN();
        clearFlagZ();
        clearFlagV();
        clearFlagX();
        clearFlagC();
        pc.add(1);
        return 1;


        break;

      case 0xfa:
        // div.u;
        // Reference:  page 20

        alu_divu();
        clearFlagN();
        clearFlagZ();
        clearFlagV();
        clearFlagX();
        clearFlagC();
        pc.add(1);
        return 18;


        break;

      case 0xfb:
        // div.s;
        // Reference:  page 20

        alu_divs();
        clearFlagN();
        clearFlagZ();
        clearFlagV();
        clearFlagX();
        clearFlagC();
        pc.add(1);
        return 19;


        break;

      case 0xfc:
        // addx r0,r1;
        // Reference:  page 8

        set(r0, alu.add_u16u16c(get(r0), get(r1), getFlagC()));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0xfd:
        // subx r0,r1;
        // Reference:  page 53

        set(r0, alu.add_u16u16c(get(r0), -get(r1), -getFlagC()));
        clearFlagN();
        clearFlagZ();
        clearFlagV();
        clearFlagX();
        clearFlagC();
        pc.add(1);
        return 1;


        break;

      case 0xfe:
        // negx r0;
        // Reference:  page 38

        set(r0, alu.add_u16u16c(-get(r0), -getFlagC()));
        clearFlagN();
        clearFlagZ();
        clearFlagV();
        clearFlagX();
        clearFlagC();
        pc.add(1);
        return 1;


        break;

      case 0xff:
        // NOP;
        // Reference:  page 39

        ;
        pc.add(1);
        return 1;


        break;

    } // hctiws
    return 1;
  }

  function lsl_ext() {
    var bit;
    var opcode = fetch8()
    var cycles = 1;

    switch (opcode) {
      case 0x0:
        // lsl @r,#@n-16
        // Reference:  page 32

        var thereg = arguments[1];;
        set(thereg, alu_lsl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x1:
        // lsl @r,#@n-16
        // Reference:  page 32

        var thereg = arguments[1];;
        set(thereg, alu_lsl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x2:
        // lsl @r,#@n-16
        // Reference:  page 32

        var thereg = arguments[1];;
        set(thereg, alu_lsl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x3:
        // lsl @r,#@n-16
        // Reference:  page 32

        var thereg = arguments[1];;
        set(thereg, alu_lsl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x4:
        // lsl @r,#@n-16
        // Reference:  page 32

        var thereg = arguments[1];;
        set(thereg, alu_lsl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x5:
        // lsl @r,#@n-16
        // Reference:  page 32

        var thereg = arguments[1];;
        set(thereg, alu_lsl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x6:
        // lsl @r,#@n-16
        // Reference:  page 32

        var thereg = arguments[1];;
        set(thereg, alu_lsl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x7:
        // lsl @r,#@n-16
        // Reference:  page 32

        var thereg = arguments[1];;
        set(thereg, alu_lsl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x8:
        // lsl @r,#@n-16
        // Reference:  page 32

        var thereg = arguments[1];;
        set(thereg, alu_lsl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x9:
        // lsl @r,#@n-16
        // Reference:  page 32

        var thereg = arguments[1];;
        set(thereg, alu_lsl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0xa:
        // lsl @r,#@n-16
        // Reference:  page 32

        var thereg = arguments[1];;
        set(thereg, alu_lsl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0xb:
        // lsl @r,#@n-16
        // Reference:  page 32

        var thereg = arguments[1];;
        set(thereg, alu_lsl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0xc:
        // lsl @r,#@n-16
        // Reference:  page 32

        var thereg = arguments[1];;
        set(thereg, alu_lsl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0xd:
        // lsl @r,#@n-16
        // Reference:  page 32

        var thereg = arguments[1];;
        set(thereg, alu_lsl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0xe:
        // lsl @r,#@n-16
        // Reference:  page 32

        var thereg = arguments[1];;
        set(thereg, alu_lsl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0xf:
        // lsl @r,#@n-16
        // Reference:  page 32

        var thereg = arguments[1];;
        set(thereg, alu_lsl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x10:
        // lsl @r,#@n-16
        // Reference:  page 32

        var thereg = arguments[1];;
        set(thereg, alu_lsl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x11:
        // lsl @r,#@n-16
        // Reference:  page 32

        var thereg = arguments[1];;
        set(thereg, alu_lsl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x12:
        // lsl @r,#@n-16
        // Reference:  page 32

        var thereg = arguments[1];;
        set(thereg, alu_lsl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x13:
        // lsl @r,#@n-16
        // Reference:  page 32

        var thereg = arguments[1];;
        set(thereg, alu_lsl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x14:
        // lsl @r,#@n-16
        // Reference:  page 32

        var thereg = arguments[1];;
        set(thereg, alu_lsl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x15:
        // lsl @r,#@n-16
        // Reference:  page 32

        var thereg = arguments[1];;
        set(thereg, alu_lsl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x16:
        // lsl @r,#@n-16
        // Reference:  page 32

        var thereg = arguments[1];;
        set(thereg, alu_lsl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x17:
        // lsl @r,#@n-16
        // Reference:  page 32

        var thereg = arguments[1];;
        set(thereg, alu_lsl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x18:
        // lsl @r,#@n-16
        // Reference:  page 32

        var thereg = arguments[1];;
        set(thereg, alu_lsl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x19:
        // lsl @r,#@n-16
        // Reference:  page 32

        var thereg = arguments[1];;
        set(thereg, alu_lsl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x1a:
        // lsl @r,#@n-16
        // Reference:  page 32

        var thereg = arguments[1];;
        set(thereg, alu_lsl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x1b:
        // lsl @r,#@n-16
        // Reference:  page 32

        var thereg = arguments[1];;
        set(thereg, alu_lsl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x1c:
        // lsl @r,#@n-16
        // Reference:  page 32

        var thereg = arguments[1];;
        set(thereg, alu_lsl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x1d:
        // lsl @r,#@n-16
        // Reference:  page 32

        var thereg = arguments[1];;
        set(thereg, alu_lsl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x1e:
        // lsl @r,#@n-16
        // Reference:  page 32

        var thereg = arguments[1];;
        set(thereg, alu_lsl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x1f:
        // lsl @r,#@n-16
        // Reference:  page 32

        var thereg = arguments[1];;
        set(thereg, alu_lsl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x20:
        // lsl @r,@s
        // Reference:  page 32

        var thereg = arguments[1];;
        set(thereg, alu_lsl16(get(thereg), alu_as_s5(get(r0))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x21:
        // lsl @r,@s
        // Reference:  page 32

        var thereg = arguments[1];;
        set(thereg, alu_lsl16(get(thereg), alu_as_s5(get(r1))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x22:
        // lsl @r,@s
        // Reference:  page 32

        var thereg = arguments[1];;
        set(thereg, alu_lsl16(get(thereg), alu_as_s5(get(r2))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x23:
        // lsl @r,@s
        // Reference:  page 32

        var thereg = arguments[1];;
        set(thereg, alu_lsl16(get(thereg), alu_as_s5(get(r3))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x24:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x25:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x26:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x27:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x28:
        // lsl.wt @r,@s
        // Reference:  page 32
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        var thereg = arguments[1];;
        set(thereg, alu_lsl16wt(thereg, get(thereg), alu_as_s5(reg(r0))));
        clearFlagN();
        clearFlagV();
        clearFlagX();
        affectFlagZ();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x29:
        // lsl.wt @r,@s
        // Reference:  page 32
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        var thereg = arguments[1];;
        set(thereg, alu_lsl16wt(thereg, get(thereg), alu_as_s5(reg(r1))));
        clearFlagN();
        clearFlagV();
        clearFlagX();
        affectFlagZ();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x2a:
        // lsl.wt @r,@s
        // Reference:  page 32
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        var thereg = arguments[1];;
        set(thereg, alu_lsl16wt(thereg, get(thereg), alu_as_s5(reg(r2))));
        clearFlagN();
        clearFlagV();
        clearFlagX();
        affectFlagZ();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x2b:
        // lsl.wt @r,@s
        // Reference:  page 32
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        var thereg = arguments[1];;
        set(thereg, alu_lsl16wt(thereg, get(thereg), alu_as_s5(reg(r3))));
        clearFlagN();
        clearFlagV();
        clearFlagX();
        affectFlagZ();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x2c:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x2d:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x2e:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x2f:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x30:
        // lsr @r,@s
        // Reference:  page 32

        var thereg = arguments[1];;
        set(thereg, alu_lsr16(get(thereg), alu_as_s5(reg(r0))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x31:
        // lsr @r,@s
        // Reference:  page 32

        var thereg = arguments[1];;
        set(thereg, alu_lsr16(get(thereg), alu_as_s5(reg(r1))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x32:
        // lsr @r,@s
        // Reference:  page 32

        var thereg = arguments[1];;
        set(thereg, alu_lsr16(get(thereg), alu_as_s5(reg(r2))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x33:
        // lsr @r,@s
        // Reference:  page 32

        var thereg = arguments[1];;
        set(thereg, alu_lsr16(get(thereg), alu_as_s5(reg(r3))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x34:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x35:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x36:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x37:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x38:
        // lsr.wt @r,@s
        // Reference:  page 32
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        var thereg = arguments[1];;
        set(thereg, alu_lsr16wt(thereg, get(thereg), alu_as_s5(reg(r0))));
        clearFlagN();
        clearFlagV();
        clearFlagX();
        affectFlagZ();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x39:
        // lsr.wt @r,@s
        // Reference:  page 32
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        var thereg = arguments[1];;
        set(thereg, alu_lsr16wt(thereg, get(thereg), alu_as_s5(reg(r1))));
        clearFlagN();
        clearFlagV();
        clearFlagX();
        affectFlagZ();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x3a:
        // lsr.wt @r,@s
        // Reference:  page 32
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        var thereg = arguments[1];;
        set(thereg, alu_lsr16wt(thereg, get(thereg), alu_as_s5(reg(r2))));
        clearFlagN();
        clearFlagV();
        clearFlagX();
        affectFlagZ();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x3b:
        // lsr.wt @r,@s
        // Reference:  page 32
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        var thereg = arguments[1];;
        set(thereg, alu_lsr16wt(thereg, get(thereg), alu_as_s5(reg(r3))));
        clearFlagN();
        clearFlagV();
        clearFlagX();
        affectFlagZ();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x3c:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x3d:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x3e:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x3f:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x40:
        // asl @r,#@n-16
        // Reference:  page 11

        var thereg = arguments[1];;
        set(thereg, alu_asl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x41:
        // asl @r,#@n-16
        // Reference:  page 11

        var thereg = arguments[1];;
        set(thereg, alu_asl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x42:
        // asl @r,#@n-16
        // Reference:  page 11

        var thereg = arguments[1];;
        set(thereg, alu_asl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x43:
        // asl @r,#@n-16
        // Reference:  page 11

        var thereg = arguments[1];;
        set(thereg, alu_asl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x44:
        // asl @r,#@n-16
        // Reference:  page 11

        var thereg = arguments[1];;
        set(thereg, alu_asl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x45:
        // asl @r,#@n-16
        // Reference:  page 11

        var thereg = arguments[1];;
        set(thereg, alu_asl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x46:
        // asl @r,#@n-16
        // Reference:  page 11

        var thereg = arguments[1];;
        set(thereg, alu_asl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x47:
        // asl @r,#@n-16
        // Reference:  page 11

        var thereg = arguments[1];;
        set(thereg, alu_asl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x48:
        // asl @r,#@n-16
        // Reference:  page 11

        var thereg = arguments[1];;
        set(thereg, alu_asl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x49:
        // asl @r,#@n-16
        // Reference:  page 11

        var thereg = arguments[1];;
        set(thereg, alu_asl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x4a:
        // asl @r,#@n-16
        // Reference:  page 11

        var thereg = arguments[1];;
        set(thereg, alu_asl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x4b:
        // asl @r,#@n-16
        // Reference:  page 11

        var thereg = arguments[1];;
        set(thereg, alu_asl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x4c:
        // asl @r,#@n-16
        // Reference:  page 11

        var thereg = arguments[1];;
        set(thereg, alu_asl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x4d:
        // asl @r,#@n-16
        // Reference:  page 11

        var thereg = arguments[1];;
        set(thereg, alu_asl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x4e:
        // asl @r,#@n-16
        // Reference:  page 11

        var thereg = arguments[1];;
        set(thereg, alu_asl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x4f:
        // asl @r,#@n-16
        // Reference:  page 11

        var thereg = arguments[1];;
        set(thereg, alu_asl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x50:
        // asl @r,#@n-16
        // Reference:  page 11

        var thereg = arguments[1];;
        set(thereg, alu_asl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x51:
        // asl @r,#@n-16
        // Reference:  page 11

        var thereg = arguments[1];;
        set(thereg, alu_asl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x52:
        // asl @r,#@n-16
        // Reference:  page 11

        var thereg = arguments[1];;
        set(thereg, alu_asl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x53:
        // asl @r,#@n-16
        // Reference:  page 11

        var thereg = arguments[1];;
        set(thereg, alu_asl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x54:
        // asl @r,#@n-16
        // Reference:  page 11

        var thereg = arguments[1];;
        set(thereg, alu_asl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x55:
        // asl @r,#@n-16
        // Reference:  page 11

        var thereg = arguments[1];;
        set(thereg, alu_asl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x56:
        // asl @r,#@n-16
        // Reference:  page 11

        var thereg = arguments[1];;
        set(thereg, alu_asl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x57:
        // asl @r,#@n-16
        // Reference:  page 11

        var thereg = arguments[1];;
        set(thereg, alu_asl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x58:
        // asl @r,#@n-16
        // Reference:  page 11

        var thereg = arguments[1];;
        set(thereg, alu_asl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x59:
        // asl @r,#@n-16
        // Reference:  page 11

        var thereg = arguments[1];;
        set(thereg, alu_asl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x5a:
        // asl @r,#@n-16
        // Reference:  page 11

        var thereg = arguments[1];;
        set(thereg, alu_asl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x5b:
        // asl @r,#@n-16
        // Reference:  page 11

        var thereg = arguments[1];;
        set(thereg, alu_asl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x5c:
        // asl @r,#@n-16
        // Reference:  page 11

        var thereg = arguments[1];;
        set(thereg, alu_asl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x5d:
        // asl @r,#@n-16
        // Reference:  page 11

        var thereg = arguments[1];;
        set(thereg, alu_asl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x5e:
        // asl @r,#@n-16
        // Reference:  page 11

        var thereg = arguments[1];;
        set(thereg, alu_asl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x5f:
        // asl @r,#@n-16
        // Reference:  page 11

        var thereg = arguments[1];;
        set(thereg, alu_asl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x60:
        // asl @r,@s
        // Reference:  page 11

        var thereg = arguments[1];;
        set(thereg, alu_asl16(get(thereg), alu_as_s5(get(r0))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x61:
        // asl @r,@s
        // Reference:  page 11

        var thereg = arguments[1];;
        set(thereg, alu_asl16(get(thereg), alu_as_s5(get(r1))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x62:
        // asl @r,@s
        // Reference:  page 11

        var thereg = arguments[1];;
        set(thereg, alu_asl16(get(thereg), alu_as_s5(get(r2))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x63:
        // asl @r,@s
        // Reference:  page 11

        var thereg = arguments[1];;
        set(thereg, alu_asl16(get(thereg), alu_as_s5(get(r3))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 10;


        break;

      case 0x64:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x65:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x66:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x67:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x68:
        // asl.wt @r,@s
        // Reference:  page 11
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        var thereg = arguments[1];;
        set(thereg, alu_asl16wt(thereg, get(thereg), alu_as_s5(reg(r0))));
        clearFlagN();
        clearFlagV();
        clearFlagX();
        affectFlagZ();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x69:
        // asl.wt @r,@s
        // Reference:  page 11
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        var thereg = arguments[1];;
        set(thereg, alu_asl16wt(thereg, get(thereg), alu_as_s5(reg(r1))));
        clearFlagN();
        clearFlagV();
        clearFlagX();
        affectFlagZ();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x6a:
        // asl.wt @r,@s
        // Reference:  page 11
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        var thereg = arguments[1];;
        set(thereg, alu_asl16wt(thereg, get(thereg), alu_as_s5(reg(r2))));
        clearFlagN();
        clearFlagV();
        clearFlagX();
        affectFlagZ();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x6b:
        // asl.wt @r,@s
        // Reference:  page 11
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        var thereg = arguments[1];;
        set(thereg, alu_asl16wt(thereg, get(thereg), alu_as_s5(reg(r3))));
        clearFlagN();
        clearFlagV();
        clearFlagX();
        affectFlagZ();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x6c:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x6d:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x6e:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x6f:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x70:
        // asr @r,@s
        // Reference:  page 11

        var thereg = arguments[1];;
        set(thereg, alu_asr16(get(thereg), alu_as_s5(reg(r0))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x71:
        // asr @r,@s
        // Reference:  page 11

        var thereg = arguments[1];;
        set(thereg, alu_asr16(get(thereg), alu_as_s5(reg(r1))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x72:
        // asr @r,@s
        // Reference:  page 11

        var thereg = arguments[1];;
        set(thereg, alu_asr16(get(thereg), alu_as_s5(reg(r2))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x73:
        // asr @r,@s
        // Reference:  page 11

        var thereg = arguments[1];;
        set(thereg, alu_asr16(get(thereg), alu_as_s5(reg(r3))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x74:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x75:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x76:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x77:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x78:
        // asr.wt @r,@s
        // Reference:  page 1
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        var thereg = arguments[1];;
        set(thereg, alu_asr16wt(thereg, get(thereg), alu_as_s5(reg(r0))));
        clearFlagN();
        clearFlagV();
        clearFlagX();
        affectFlagZ();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x79:
        // asr.wt @r,@s
        // Reference:  page 1
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        var thereg = arguments[1];;
        set(thereg, alu_asr16wt(thereg, get(thereg), alu_as_s5(reg(r1))));
        clearFlagN();
        clearFlagV();
        clearFlagX();
        affectFlagZ();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x7a:
        // asr.wt @r,@s
        // Reference:  page 1
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        var thereg = arguments[1];;
        set(thereg, alu_asr16wt(thereg, get(thereg), alu_as_s5(reg(r2))));
        clearFlagN();
        clearFlagV();
        clearFlagX();
        affectFlagZ();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x7b:
        // asr.wt @r,@s
        // Reference:  page 1
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        var thereg = arguments[1];;
        set(thereg, alu_asr16wt(thereg, get(thereg), alu_as_s5(reg(r3))));
        clearFlagN();
        clearFlagV();
        clearFlagX();
        affectFlagZ();
        affectFlagC();
        pc.add(1);
        return 1;


        break;

      case 0x7c:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x7d:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x7e:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x7f:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x80:
        // rol @r,#@n-16
        // Reference:  page 46

        var thereg = arguments[1];;
        set(thereg, alu_rol16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0x81:
        // rol @r,#@n-16
        // Reference:  page 46

        var thereg = arguments[1];;
        set(thereg, alu_rol16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0x82:
        // rol @r,#@n-16
        // Reference:  page 46

        var thereg = arguments[1];;
        set(thereg, alu_rol16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0x83:
        // rol @r,#@n-16
        // Reference:  page 46

        var thereg = arguments[1];;
        set(thereg, alu_rol16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0x84:
        // rol @r,#@n-16
        // Reference:  page 46

        var thereg = arguments[1];;
        set(thereg, alu_rol16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0x85:
        // rol @r,#@n-16
        // Reference:  page 46

        var thereg = arguments[1];;
        set(thereg, alu_rol16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0x86:
        // rol @r,#@n-16
        // Reference:  page 46

        var thereg = arguments[1];;
        set(thereg, alu_rol16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0x87:
        // rol @r,#@n-16
        // Reference:  page 46

        var thereg = arguments[1];;
        set(thereg, alu_rol16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0x88:
        // rol @r,#@n-16
        // Reference:  page 46

        var thereg = arguments[1];;
        set(thereg, alu_rol16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0x89:
        // rol @r,#@n-16
        // Reference:  page 46

        var thereg = arguments[1];;
        set(thereg, alu_rol16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0x8a:
        // rol @r,#@n-16
        // Reference:  page 46

        var thereg = arguments[1];;
        set(thereg, alu_rol16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0x8b:
        // rol @r,#@n-16
        // Reference:  page 46

        var thereg = arguments[1];;
        set(thereg, alu_rol16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0x8c:
        // rol @r,#@n-16
        // Reference:  page 46

        var thereg = arguments[1];;
        set(thereg, alu_rol16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0x8d:
        // rol @r,#@n-16
        // Reference:  page 46

        var thereg = arguments[1];;
        set(thereg, alu_rol16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0x8e:
        // rol @r,#@n-16
        // Reference:  page 46

        var thereg = arguments[1];;
        set(thereg, alu_rol16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0x8f:
        // rol @r,#@n-16
        // Reference:  page 46

        var thereg = arguments[1];;
        set(thereg, alu_rol16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0x90:
        // rol @r,#@n-16
        // Reference:  page 46

        var thereg = arguments[1];;
        set(thereg, alu_rol16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0x91:
        // rol @r,#@n-16
        // Reference:  page 46

        var thereg = arguments[1];;
        set(thereg, alu_rol16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0x92:
        // rol @r,#@n-16
        // Reference:  page 46

        var thereg = arguments[1];;
        set(thereg, alu_rol16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0x93:
        // rol @r,#@n-16
        // Reference:  page 46

        var thereg = arguments[1];;
        set(thereg, alu_rol16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0x94:
        // rol @r,#@n-16
        // Reference:  page 46

        var thereg = arguments[1];;
        set(thereg, alu_rol16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0x95:
        // rol @r,#@n-16
        // Reference:  page 46

        var thereg = arguments[1];;
        set(thereg, alu_rol16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0x96:
        // rol @r,#@n-16
        // Reference:  page 46

        var thereg = arguments[1];;
        set(thereg, alu_rol16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0x97:
        // rol @r,#@n-16
        // Reference:  page 46

        var thereg = arguments[1];;
        set(thereg, alu_rol16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0x98:
        // rol @r,#@n-16
        // Reference:  page 46

        var thereg = arguments[1];;
        set(thereg, alu_rol16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0x99:
        // rol @r,#@n-16
        // Reference:  page 46

        var thereg = arguments[1];;
        set(thereg, alu_rol16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0x9a:
        // rol @r,#@n-16
        // Reference:  page 46

        var thereg = arguments[1];;
        set(thereg, alu_rol16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0x9b:
        // rol @r,#@n-16
        // Reference:  page 46

        var thereg = arguments[1];;
        set(thereg, alu_rol16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0x9c:
        // rol @r,#@n-16
        // Reference:  page 46

        var thereg = arguments[1];;
        set(thereg, alu_rol16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0x9d:
        // rol @r,#@n-16
        // Reference:  page 46

        var thereg = arguments[1];;
        set(thereg, alu_rol16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0x9e:
        // rol @r,#@n-16
        // Reference:  page 46

        var thereg = arguments[1];;
        set(thereg, alu_rol16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0x9f:
        // rol @r,#@n-16
        // Reference:  page 46

        var thereg = arguments[1];;
        set(thereg, alu_rol16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xa0:
        // rol @r,@s
        // Reference:  page 46

        var thereg = arguments[1];;
        set(thereg, alu_rol16(get(thereg), alu_as_s5(get(r0))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xa1:
        // rol @r,@s
        // Reference:  page 46

        var thereg = arguments[1];;
        set(thereg, alu_rol16(get(thereg), alu_as_s5(get(r1))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xa2:
        // rol @r,@s
        // Reference:  page 46

        var thereg = arguments[1];;
        set(thereg, alu_rol16(get(thereg), alu_as_s5(get(r2))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xa3:
        // rol @r,@s
        // Reference:  page 46

        var thereg = arguments[1];;
        set(thereg, alu_rol16(get(thereg), alu_as_s5(get(r3))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xa4:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xa5:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xa6:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xa7:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xa8:
        // rol.wt @r,@s
        // Reference:  page 46
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        var thereg = arguments[1];;
        set(thereg, alu_rol16wt(thereg, get(thereg), alu_as_s5(reg(r0))));
        clearFlagN();
        clearFlagV();
        clearFlagX();
        affectFlagZ();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xa9:
        // rol.wt @r,@s
        // Reference:  page 46
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        var thereg = arguments[1];;
        set(thereg, alu_rol16wt(thereg, get(thereg), alu_as_s5(reg(r1))));
        clearFlagN();
        clearFlagV();
        clearFlagX();
        affectFlagZ();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xaa:
        // rol.wt @r,@s
        // Reference:  page 46
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        var thereg = arguments[1];;
        set(thereg, alu_rol16wt(thereg, get(thereg), alu_as_s5(reg(r2))));
        clearFlagN();
        clearFlagV();
        clearFlagX();
        affectFlagZ();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xab:
        // rol.wt @r,@s
        // Reference:  page 46
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        var thereg = arguments[1];;
        set(thereg, alu_rol16wt(thereg, get(thereg), alu_as_s5(reg(r3))));
        clearFlagN();
        clearFlagV();
        clearFlagX();
        affectFlagZ();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xac:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xad:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xae:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xaf:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xb0:
        // ror @r,@s
        // Reference:  page 46

        var thereg = arguments[1];;
        set(thereg, alu_ror16(get(thereg), alu_as_s5(reg(r0))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xb1:
        // ror @r,@s
        // Reference:  page 46

        var thereg = arguments[1];;
        set(thereg, alu_ror16(get(thereg), alu_as_s5(reg(r1))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xb2:
        // ror @r,@s
        // Reference:  page 46

        var thereg = arguments[1];;
        set(thereg, alu_ror16(get(thereg), alu_as_s5(reg(r2))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xb3:
        // ror @r,@s
        // Reference:  page 46

        var thereg = arguments[1];;
        set(thereg, alu_ror16(get(thereg), alu_as_s5(reg(r3))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xb4:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xb5:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xb6:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xb7:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xb8:
        // ror.wt @r,@s
        // Reference:  page 46
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        var thereg = arguments[1];;
        set(thereg, alu_ror16wt(thereg, get(thereg), alu_as_s5(reg(r0))));
        clearFlagN();
        clearFlagV();
        clearFlagX();
        affectFlagZ();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xb9:
        // ror.wt @r,@s
        // Reference:  page 46
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        var thereg = arguments[1];;
        set(thereg, alu_ror16wt(thereg, get(thereg), alu_as_s5(reg(r1))));
        clearFlagN();
        clearFlagV();
        clearFlagX();
        affectFlagZ();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xba:
        // ror.wt @r,@s
        // Reference:  page 46
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        var thereg = arguments[1];;
        set(thereg, alu_ror16wt(thereg, get(thereg), alu_as_s5(reg(r2))));
        clearFlagN();
        clearFlagV();
        clearFlagX();
        affectFlagZ();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xbb:
        // ror.wt @r,@s
        // Reference:  page 46
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        var thereg = arguments[1];;
        set(thereg, alu_ror16wt(thereg, get(thereg), alu_as_s5(reg(r3))));
        clearFlagN();
        clearFlagV();
        clearFlagX();
        affectFlagZ();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xbc:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xbd:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xbe:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xbf:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xc0:
        // roxl @r,#@n-16
        // Reference:  page 48

        var thereg = arguments[1];;
        set(thereg, alu_roxl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xc1:
        // roxl @r,#@n-16
        // Reference:  page 48

        var thereg = arguments[1];;
        set(thereg, alu_roxl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xc2:
        // roxl @r,#@n-16
        // Reference:  page 48

        var thereg = arguments[1];;
        set(thereg, alu_roxl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xc3:
        // roxl @r,#@n-16
        // Reference:  page 48

        var thereg = arguments[1];;
        set(thereg, alu_roxl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xc4:
        // roxl @r,#@n-16
        // Reference:  page 48

        var thereg = arguments[1];;
        set(thereg, alu_roxl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xc5:
        // roxl @r,#@n-16
        // Reference:  page 48

        var thereg = arguments[1];;
        set(thereg, alu_roxl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xc6:
        // roxl @r,#@n-16
        // Reference:  page 48

        var thereg = arguments[1];;
        set(thereg, alu_roxl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xc7:
        // roxl @r,#@n-16
        // Reference:  page 48

        var thereg = arguments[1];;
        set(thereg, alu_roxl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xc8:
        // roxl @r,#@n-16
        // Reference:  page 48

        var thereg = arguments[1];;
        set(thereg, alu_roxl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xc9:
        // roxl @r,#@n-16
        // Reference:  page 48

        var thereg = arguments[1];;
        set(thereg, alu_roxl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xca:
        // roxl @r,#@n-16
        // Reference:  page 48

        var thereg = arguments[1];;
        set(thereg, alu_roxl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xcb:
        // roxl @r,#@n-16
        // Reference:  page 48

        var thereg = arguments[1];;
        set(thereg, alu_roxl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xcc:
        // roxl @r,#@n-16
        // Reference:  page 48

        var thereg = arguments[1];;
        set(thereg, alu_roxl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xcd:
        // roxl @r,#@n-16
        // Reference:  page 48

        var thereg = arguments[1];;
        set(thereg, alu_roxl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xce:
        // roxl @r,#@n-16
        // Reference:  page 48

        var thereg = arguments[1];;
        set(thereg, alu_roxl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xcf:
        // roxl @r,#@n-16
        // Reference:  page 48

        var thereg = arguments[1];;
        set(thereg, alu_roxl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xd0:
        // roxl @r,#@n-16
        // Reference:  page 48

        var thereg = arguments[1];;
        set(thereg, alu_roxl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xd1:
        // roxl @r,#@n-16
        // Reference:  page 48

        var thereg = arguments[1];;
        set(thereg, alu_roxl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xd2:
        // roxl @r,#@n-16
        // Reference:  page 48

        var thereg = arguments[1];;
        set(thereg, alu_roxl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xd3:
        // roxl @r,#@n-16
        // Reference:  page 48

        var thereg = arguments[1];;
        set(thereg, alu_roxl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xd4:
        // roxl @r,#@n-16
        // Reference:  page 48

        var thereg = arguments[1];;
        set(thereg, alu_roxl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xd5:
        // roxl @r,#@n-16
        // Reference:  page 48

        var thereg = arguments[1];;
        set(thereg, alu_roxl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xd6:
        // roxl @r,#@n-16
        // Reference:  page 48

        var thereg = arguments[1];;
        set(thereg, alu_roxl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xd7:
        // roxl @r,#@n-16
        // Reference:  page 48

        var thereg = arguments[1];;
        set(thereg, alu_roxl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xd8:
        // roxl @r,#@n-16
        // Reference:  page 48

        var thereg = arguments[1];;
        set(thereg, alu_roxl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xd9:
        // roxl @r,#@n-16
        // Reference:  page 48

        var thereg = arguments[1];;
        set(thereg, alu_roxl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xda:
        // roxl @r,#@n-16
        // Reference:  page 48

        var thereg = arguments[1];;
        set(thereg, alu_roxl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xdb:
        // roxl @r,#@n-16
        // Reference:  page 48

        var thereg = arguments[1];;
        set(thereg, alu_roxl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xdc:
        // roxl @r,#@n-16
        // Reference:  page 48

        var thereg = arguments[1];;
        set(thereg, alu_roxl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xdd:
        // roxl @r,#@n-16
        // Reference:  page 48

        var thereg = arguments[1];;
        set(thereg, alu_roxl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xde:
        // roxl @r,#@n-16
        // Reference:  page 48

        var thereg = arguments[1];;
        set(thereg, alu_roxl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xdf:
        // roxl @r,#@n-16
        // Reference:  page 48

        var thereg = arguments[1];;
        set(thereg, alu_roxl16(get(thereg), alu_as_s5(lit(read5(pc.getUnsigned() + (0))))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xe0:
        // roxl @r,@s
        // Reference:  page 48

        var thereg = arguments[1];;
        set(thereg, alu_roxl16(get(thereg), alu_as_s5(get(r0))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xe1:
        // roxl @r,@s
        // Reference:  page 48

        var thereg = arguments[1];;
        set(thereg, alu_roxl16(get(thereg), alu_as_s5(get(r1))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xe2:
        // roxl @r,@s
        // Reference:  page 48

        var thereg = arguments[1];;
        set(thereg, alu_roxl16(get(thereg), alu_as_s5(get(r2))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xe3:
        // roxl @r,@s
        // Reference:  page 48

        var thereg = arguments[1];;
        set(thereg, alu_roxl16(get(thereg), alu_as_s5(get(r3))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xe4:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xe5:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xe6:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xe7:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xe8:
        // roxl.wt @r,@s
        // Reference:  page 48
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        var thereg = arguments[1];;
        set(thereg, alu_roxl16wt(thereg, get(thereg), alu_as_s5(reg(r0))));
        clearFlagN();
        clearFlagV();
        clearFlagX();
        affectFlagZ();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xe9:
        // roxl.wt @r,@s
        // Reference:  page 48
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        var thereg = arguments[1];;
        set(thereg, alu_roxl16wt(thereg, get(thereg), alu_as_s5(reg(r1))));
        clearFlagN();
        clearFlagV();
        clearFlagX();
        affectFlagZ();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xea:
        // roxl.wt @r,@s
        // Reference:  page 48
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        var thereg = arguments[1];;
        set(thereg, alu_roxl16wt(thereg, get(thereg), alu_as_s5(reg(r2))));
        clearFlagN();
        clearFlagV();
        clearFlagX();
        affectFlagZ();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xeb:
        // roxl.wt @r,@s
        // Reference:  page 48
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        var thereg = arguments[1];;
        set(thereg, alu_roxl16wt(thereg, get(thereg), alu_as_s5(reg(r3))));
        clearFlagN();
        clearFlagV();
        clearFlagX();
        affectFlagZ();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xec:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xed:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xee:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xef:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xf0:
        // roxr @r,@s
        // Reference:  page 48

        var thereg = arguments[1];;
        set(thereg, alu_roxr16(get(thereg), alu_as_s5(reg(r0))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xf1:
        // roxr @r,@s
        // Reference:  page 48

        var thereg = arguments[1];;
        set(thereg, alu_roxr16(get(thereg), alu_as_s5(reg(r1))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xf2:
        // roxr @r,@s
        // Reference:  page 48

        var thereg = arguments[1];;
        set(thereg, alu_roxr16(get(thereg), alu_as_s5(reg(r2))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xf3:
        // roxr @r,@s
        // Reference:  page 48

        var thereg = arguments[1];;
        set(thereg, alu_roxr16(get(thereg), alu_as_s5(reg(r3))));
        affectFlagN();
        affectFlagZ();
        affectFlagV();
        affectFlagX();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xf4:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xf5:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xf6:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xf7:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xf8:
        // roxr.wt @r,@s
        // Reference:  page 48
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        var thereg = arguments[1];;
        set(thereg, alu_roxr16wt(thereg, get(thereg), alu_as_s5(reg(r0))));
        clearFlagN();
        clearFlagV();
        clearFlagX();
        affectFlagZ();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xf9:
        // roxr.wt @r,@s
        // Reference:  page 48
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        var thereg = arguments[1];;
        set(thereg, alu_roxr16wt(thereg, get(thereg), alu_as_s5(reg(r1))));
        clearFlagN();
        clearFlagV();
        clearFlagX();
        affectFlagZ();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xfa:
        // roxr.wt @r,@s
        // Reference:  page 48
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        var thereg = arguments[1];;
        set(thereg, alu_roxr16wt(thereg, get(thereg), alu_as_s5(reg(r2))));
        clearFlagN();
        clearFlagV();
        clearFlagX();
        affectFlagZ();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xfb:
        // roxr.wt @r,@s
        // Reference:  page 48
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        var thereg = arguments[1];;
        set(thereg, alu_roxr16wt(thereg, get(thereg), alu_as_s5(reg(r3))));
        clearFlagN();
        clearFlagV();
        clearFlagX();
        affectFlagZ();
        affectFlagC();
        pc.add(1);
        return 4;


        break;

      case 0xfc:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xfd:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xfe:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xff:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

    } // hctiws
    return 1;
  }

  function bits_ext() {
    var bit;
    var opcode = fetch8()
    var cycles = 1;

    switch (opcode) {
      case 0x0:
        // btst @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        alu_btst16(get(thereg), lit(read5(pc.getUnsigned() + (0))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x1:
        // btst @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        alu_btst16(get(thereg), lit(read5(pc.getUnsigned() + (0))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x2:
        // btst @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        alu_btst16(get(thereg), lit(read5(pc.getUnsigned() + (0))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x3:
        // btst @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        alu_btst16(get(thereg), lit(read5(pc.getUnsigned() + (0))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x4:
        // btst @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        alu_btst16(get(thereg), lit(read5(pc.getUnsigned() + (0))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x5:
        // btst @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        alu_btst16(get(thereg), lit(read5(pc.getUnsigned() + (0))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x6:
        // btst @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        alu_btst16(get(thereg), lit(read5(pc.getUnsigned() + (0))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x7:
        // btst @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        alu_btst16(get(thereg), lit(read5(pc.getUnsigned() + (0))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x8:
        // btst @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        alu_btst16(get(thereg), lit(read5(pc.getUnsigned() + (0))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x9:
        // btst @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        alu_btst16(get(thereg), lit(read5(pc.getUnsigned() + (0))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xa:
        // btst @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        alu_btst16(get(thereg), lit(read5(pc.getUnsigned() + (0))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xb:
        // btst @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        alu_btst16(get(thereg), lit(read5(pc.getUnsigned() + (0))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xc:
        // btst @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        alu_btst16(get(thereg), lit(read5(pc.getUnsigned() + (0))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xd:
        // btst @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        alu_btst16(get(thereg), lit(read5(pc.getUnsigned() + (0))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xe:
        // btst @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        alu_btst16(get(thereg), lit(read5(pc.getUnsigned() + (0))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xf:
        // btst @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        alu_btst16(get(thereg), lit(read5(pc.getUnsigned() + (0))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x10:
        // btst @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        alu_btst16(get(thereg), lit(read5(pc.getUnsigned() + (0))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x11:
        // btst @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        alu_btst16(get(thereg), lit(read5(pc.getUnsigned() + (0))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x12:
        // btst @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        alu_btst16(get(thereg), lit(read5(pc.getUnsigned() + (0))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x13:
        // btst @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        alu_btst16(get(thereg), lit(read5(pc.getUnsigned() + (0))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x14:
        // btst @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        alu_btst16(get(thereg), lit(read5(pc.getUnsigned() + (0))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x15:
        // btst @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        alu_btst16(get(thereg), lit(read5(pc.getUnsigned() + (0))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x16:
        // btst @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        alu_btst16(get(thereg), lit(read5(pc.getUnsigned() + (0))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x17:
        // btst @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        alu_btst16(get(thereg), lit(read5(pc.getUnsigned() + (0))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x18:
        // btst @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        alu_btst16(get(thereg), lit(read5(pc.getUnsigned() + (0))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x19:
        // btst @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        alu_btst16(get(thereg), lit(read5(pc.getUnsigned() + (0))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x1a:
        // btst @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        alu_btst16(get(thereg), lit(read5(pc.getUnsigned() + (0))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x1b:
        // btst @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        alu_btst16(get(thereg), lit(read5(pc.getUnsigned() + (0))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x1c:
        // btst @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        alu_btst16(get(thereg), lit(read5(pc.getUnsigned() + (0))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x1d:
        // btst @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        alu_btst16(get(thereg), lit(read5(pc.getUnsigned() + (0))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x1e:
        // btst @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        alu_btst16(get(thereg), lit(read5(pc.getUnsigned() + (0))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x1f:
        // btst @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        alu_btst16(get(thereg), lit(read5(pc.getUnsigned() + (0))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x20:
        // btst @r,@s
        // Reference:  page 16

        var thereg = arguments[1];;
        alu_btst16(get(thereg), alu.and8(get(r0), 0x0f));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x21:
        // btst @r,@s
        // Reference:  page 16

        var thereg = arguments[1];;
        alu_btst16(get(thereg), alu.and8(get(r1), 0x0f));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x22:
        // btst @r,@s
        // Reference:  page 16

        var thereg = arguments[1];;
        alu_btst16(get(thereg), alu.and8(get(r2), 0x0f));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x23:
        // btst @r,@s
        // Reference:  page 16

        var thereg = arguments[1];;
        alu_btst16(get(thereg), alu.and8(get(r3), 0x0f));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x24:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x25:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x26:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x27:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x28:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x29:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x2a:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x2b:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x2c:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x2d:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x2e:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x2f:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x30:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x31:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x32:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x33:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x34:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x35:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x36:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x37:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x38:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x39:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x3a:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x3b:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x3c:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x3d:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x3e:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x3f:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x40:
        // bchg @r,#@n
        // Reference:  page 15

        var thereg = arguments[1];;
        set(thereg, alu_bchg16(get(thereg), lit(read4(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x41:
        // bchg @r,#@n
        // Reference:  page 15

        var thereg = arguments[1];;
        set(thereg, alu_bchg16(get(thereg), lit(read4(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x42:
        // bchg @r,#@n
        // Reference:  page 15

        var thereg = arguments[1];;
        set(thereg, alu_bchg16(get(thereg), lit(read4(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x43:
        // bchg @r,#@n
        // Reference:  page 15

        var thereg = arguments[1];;
        set(thereg, alu_bchg16(get(thereg), lit(read4(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x44:
        // bchg @r,#@n
        // Reference:  page 15

        var thereg = arguments[1];;
        set(thereg, alu_bchg16(get(thereg), lit(read4(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x45:
        // bchg @r,#@n
        // Reference:  page 15

        var thereg = arguments[1];;
        set(thereg, alu_bchg16(get(thereg), lit(read4(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x46:
        // bchg @r,#@n
        // Reference:  page 15

        var thereg = arguments[1];;
        set(thereg, alu_bchg16(get(thereg), lit(read4(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x47:
        // bchg @r,#@n
        // Reference:  page 15

        var thereg = arguments[1];;
        set(thereg, alu_bchg16(get(thereg), lit(read4(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x48:
        // bchg @r,#@n
        // Reference:  page 15

        var thereg = arguments[1];;
        set(thereg, alu_bchg16(get(thereg), lit(read4(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x49:
        // bchg @r,#@n
        // Reference:  page 15

        var thereg = arguments[1];;
        set(thereg, alu_bchg16(get(thereg), lit(read4(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x4a:
        // bchg @r,#@n
        // Reference:  page 15

        var thereg = arguments[1];;
        set(thereg, alu_bchg16(get(thereg), lit(read4(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x4b:
        // bchg @r,#@n
        // Reference:  page 15

        var thereg = arguments[1];;
        set(thereg, alu_bchg16(get(thereg), lit(read4(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x4c:
        // bchg @r,#@n
        // Reference:  page 15

        var thereg = arguments[1];;
        set(thereg, alu_bchg16(get(thereg), lit(read4(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x4d:
        // bchg @r,#@n
        // Reference:  page 15

        var thereg = arguments[1];;
        set(thereg, alu_bchg16(get(thereg), lit(read4(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x4e:
        // bchg @r,#@n
        // Reference:  page 15

        var thereg = arguments[1];;
        set(thereg, alu_bchg16(get(thereg), lit(read4(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x4f:
        // bchg @r,#@n
        // Reference:  page 15

        var thereg = arguments[1];;
        set(thereg, alu_bchg16(get(thereg), lit(read4(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x50:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x51:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x52:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x53:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x54:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x55:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x56:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x57:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x58:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x59:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x5a:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x5b:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x5c:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x5d:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x5e:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x5f:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x60:
        // bchg @r,@s
        // Reference:  page 15

        var thereg = arguments[1];;
        set(thereg, alu_bchg16(get(thereg), alu.and8(get(r0), 0x0f)));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x61:
        // bchg @r,@s
        // Reference:  page 15

        var thereg = arguments[1];;
        set(thereg, alu_bchg16(get(thereg), alu.and8(get(r1), 0x0f)));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x62:
        // bchg @r,@s
        // Reference:  page 15

        var thereg = arguments[1];;
        set(thereg, alu_bchg16(get(thereg), alu.and8(get(r2), 0x0f)));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x63:
        // bchg @r,@s
        // Reference:  page 15

        var thereg = arguments[1];;
        set(thereg, alu_bchg16(get(thereg), alu.and8(get(r3), 0x0f)));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x64:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x65:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x66:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x67:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x68:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x69:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x6a:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x6b:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x6c:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x6d:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x6e:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x6f:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x70:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x71:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x72:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x73:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x74:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x75:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x76:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x77:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x78:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x79:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x7a:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x7b:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x7c:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x7d:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x7e:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x7f:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x80:
        // bclr @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bclr16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x81:
        // bclr @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bclr16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x82:
        // bclr @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bclr16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x83:
        // bclr @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bclr16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x84:
        // bclr @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bclr16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x85:
        // bclr @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bclr16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x86:
        // bclr @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bclr16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x87:
        // bclr @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bclr16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x88:
        // bclr @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bclr16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x89:
        // bclr @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bclr16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x8a:
        // bclr @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bclr16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x8b:
        // bclr @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bclr16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x8c:
        // bclr @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bclr16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x8d:
        // bclr @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bclr16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x8e:
        // bclr @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bclr16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x8f:
        // bclr @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bclr16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x90:
        // bclr @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bclr16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x91:
        // bclr @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bclr16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x92:
        // bclr @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bclr16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x93:
        // bclr @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bclr16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x94:
        // bclr @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bclr16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x95:
        // bclr @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bclr16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x96:
        // bclr @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bclr16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x97:
        // bclr @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bclr16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x98:
        // bclr @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bclr16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x99:
        // bclr @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bclr16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x9a:
        // bclr @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bclr16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x9b:
        // bclr @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bclr16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x9c:
        // bclr @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bclr16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x9d:
        // bclr @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bclr16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x9e:
        // bclr @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bclr16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0x9f:
        // bclr @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bclr16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xa0:
        // bclr @r,@s
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bclr16(get(thereg), alu.and8(get(r0), 0x0f)));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xa1:
        // bclr @r,@s
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bclr16(get(thereg), alu.and8(get(r1), 0x0f)));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xa2:
        // bclr @r,@s
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bclr16(get(thereg), alu.and8(get(r2), 0x0f)));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xa3:
        // bclr @r,@s
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bclr16(get(thereg), alu.and8(get(r3), 0x0f)));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xa4:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xa5:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xa6:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xa7:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xa8:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xa9:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xaa:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xab:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xac:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xad:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xae:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xaf:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xb0:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xb1:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xb2:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xb3:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xb4:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xb5:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xb6:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xb7:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xb8:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xb9:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xba:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xbb:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xbc:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xbd:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xbe:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xbf:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xc0:
        // bset @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bset16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xc1:
        // bset @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bset16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xc2:
        // bset @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bset16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xc3:
        // bset @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bset16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xc4:
        // bset @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bset16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xc5:
        // bset @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bset16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xc6:
        // bset @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bset16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xc7:
        // bset @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bset16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xc8:
        // bset @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bset16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xc9:
        // bset @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bset16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xca:
        // bset @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bset16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xcb:
        // bset @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bset16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xcc:
        // bset @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bset16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xcd:
        // bset @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bset16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xce:
        // bset @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bset16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xcf:
        // bset @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bset16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xd0:
        // bset @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bset16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xd1:
        // bset @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bset16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xd2:
        // bset @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bset16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xd3:
        // bset @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bset16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xd4:
        // bset @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bset16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xd5:
        // bset @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bset16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xd6:
        // bset @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bset16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xd7:
        // bset @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bset16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xd8:
        // bset @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bset16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xd9:
        // bset @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bset16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xda:
        // bset @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bset16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xdb:
        // bset @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bset16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xdc:
        // bset @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bset16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xdd:
        // bset @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bset16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xde:
        // bset @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bset16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xdf:
        // bset @r,#@n
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bset16(get(thereg), lit(read5(pc.getUnsigned() + (0)))));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xe0:
        // bset @r,@s
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bset16(get(thereg), alu.and8(get(r0), 0x0f)));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xe1:
        // bset @r,@s
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bset16(get(thereg), alu.and8(get(r1), 0x0f)));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xe2:
        // bset @r,@s
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bset16(get(thereg), alu.and8(get(r2), 0x0f)));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xe3:
        // bset @r,@s
        // Reference:  page 16

        var thereg = arguments[1];;
        set(thereg, alu_bset16(get(thereg), alu.and8(get(r3), 0x0f)));
        affectFlagZ();
        pc.add(1);
        return 1;


        break;

      case 0xe4:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xe5:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xe6:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xe7:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xe8:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xe9:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xea:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xeb:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xec:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xed:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xee:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xef:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xf0:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xf1:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xf2:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xf3:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xf4:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xf5:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xf6:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xf7:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xf8:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xf9:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xfa:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xfb:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xfc:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xfd:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xfe:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xff:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

    } // hctiws
    return 1;
  }
  // importEmulatorALU
  // let alu_btst16 ;
  // let alu_btst16 ;
  // let alu_btst16 ;
  // let alu_btst16 ;
  // let alu_btst16 ;
  // let alu_btst16 ;
  // let alu_btst16 ;
  // let alu_btst16 ;
  // let alu_btst16 ;
  // let alu_btst16 ;
  // let alu_btst16 ;
  // let alu_btst16 ;
  // let alu_btst16 ;
  // let alu_btst16 ;
  // let alu_btst16 ;
  // let alu_btst16 ;
  // let alu_btst16 ;
  // let alu_btst16 ;
  // let alu_btst16 ;
  // let alu_btst16 ;
  // let alu_btst16 ;
  // let alu_btst16 ;
  // let alu_btst16 ;
  // let alu_btst16 ;
  // let alu_btst16 ;
  // let alu_btst16 ;
  // let alu_btst16 ;
  // let alu_btst16 ;
  // let alu_btst16 ;
  // let alu_btst16 ;
  // let alu_btst16 ;
  // let alu_btst16 ;
  // let alu_btst16 ;
  // let alu_btst16 ;
  // let alu_btst16 ;
  // let alu_btst16 ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;
  // let set ;

  /*
   **
   ** State
   **
   */
  function getState() {
    gsRegisterR0.assign(getRegisterValueR0());
    gsRegisterR1.assign(getRegisterValueR1());
    gsRegisterR2.assign(getRegisterValueR2());
    gsRegisterR3.assign(getRegisterValueR3());
    gsRegisterPC.assign(getRegisterValuePC());
    gsRegisterSP.assign(getRegisterValueSP());
    gsRegisterIX.assign(getRegisterValueIX());
    gsRegisterIY.assign(getRegisterValueIY());
    gsRegisterPS.assign(getRegisterValuePS());
    return {
      flags: {
        u: getFlagU(),
        d: getFlagD(),
        c: getFlagC(),
        x: getFlagX(),
        v: getFlagV(),
        z: getFlagZ(),
        n: getFlagN(),
        i: getFlagI(),
      },

      registers: {
        r0: gsRegisterR0,
        r1: gsRegisterR1,
        r2: gsRegisterR2,
        r3: gsRegisterR3,
        pc: gsRegisterPC,
        sp: gsRegisterSP,
        ix: gsRegisterIX,
        iy: gsRegisterIY,
        ps: gsRegisterPS,
      },

      state: {},
    };
  }

  function setState(newState) {
    // registers:
    if (typeof newState.registers.r0 !== typeof undefined) {
      setRegisterValueR0(newState.registers.r0);
    }
    if (typeof newState.registers.r1 !== typeof undefined) {
      setRegisterValueR1(newState.registers.r1);
    }
    if (typeof newState.registers.r2 !== typeof undefined) {
      setRegisterValueR2(newState.registers.r2);
    }
    if (typeof newState.registers.r3 !== typeof undefined) {
      setRegisterValueR3(newState.registers.r3);
    }
    if (typeof newState.registers.pc !== typeof undefined) {
      setRegisterValuePC(newState.registers.pc);
    }
    if (typeof newState.registers.sp !== typeof undefined) {
      setRegisterValueSP(newState.registers.sp);
    }
    if (typeof newState.registers.ix !== typeof undefined) {
      setRegisterValueIX(newState.registers.ix);
    }
    if (typeof newState.registers.iy !== typeof undefined) {
      setRegisterValueIY(newState.registers.iy);
    }
    if (typeof newState.registers.ps !== typeof undefined) {
      setRegisterValuePS(newState.registers.ps);
    }

    // Flags:
    if (typeof newState.flags.u !== typeof undefined) {
      changeFlagU(newState.flags.u);
    }
    if (typeof newState.flags.d !== typeof undefined) {
      changeFlagD(newState.flags.d);
    }
    if (typeof newState.flags.c !== typeof undefined) {
      changeFlagC(newState.flags.c);
    }
    if (typeof newState.flags.x !== typeof undefined) {
      changeFlagX(newState.flags.x);
    }
    if (typeof newState.flags.v !== typeof undefined) {
      changeFlagV(newState.flags.v);
    }
    if (typeof newState.flags.z !== typeof undefined) {
      changeFlagZ(newState.flags.z);
    }
    if (typeof newState.flags.n !== typeof undefined) {
      changeFlagN(newState.flags.n);
    }
    if (typeof newState.flags.i !== typeof undefined) {
      changeFlagI(newState.flags.i);
    }

    // state
  }


  /*
   **
   ** Expose this API
   **
   */
  return {
    start,
    reset,
    update,
    getState,
    setState,
    getRegisterValueR0,
    setRegisterValueR0,
    getRegisterValueR1,
    setRegisterValueR1,
    getRegisterValueR2,
    setRegisterValueR2,
    getRegisterValueR3,
    setRegisterValueR3,
    getRegisterValuePC,
    setRegisterValuePC,
    getRegisterValueSP,
    setRegisterValueSP,
    getRegisterValueIX,
    setRegisterValueIX,
    getRegisterValueIY,
    setRegisterValueIY,
    getRegisterValuePS,
    setRegisterValuePS,
    getRegisterValue,
    setRegisterValue,
    setFlagValue,
  }
});