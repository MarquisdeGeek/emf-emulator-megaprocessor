// megaprocessor_cpu_disassemble
let megaprocessor_cpu_disassemble = (function(bus, options) {
  function disassemble(address) {
    return step(bus, address);
  }

  function getAddressText16(address) {
    let label = bus.memory.getLabel(address);
    if (label) {
      return label;
    }
    return emf.utils.hex16(address) + "H"
  }
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

  function start() {
    read8 = bus.memory.read8;
    read16 = bus.memory.read16;
  }

  function step(bus, addr) {
    var dis = new Object();
    dis.instruction = "Unknown opcode";
    dis.byte_length = 1;
    var instr; /* of type uint */
    let pc = new emf.Number(16, 2, addr);
    let opcode = read8(addr);

    switch (opcode) {
      case 0x0:
        // move @r,@s;
        // Reference:  page 34

        dis.byte_length = 1;
        dis.instruction = "move r0,r0;";
        return dis;

        // sxt @r;
        // Reference:  page 53

        dis.byte_length = 1;
        dis.instruction = "sxt r0;";
        return dis;

        break;

      case 0x1:
        // move @r,@s;
        // Reference:  page 34

        dis.byte_length = 1;
        dis.instruction = "move r1,r0;";
        return dis;

        // sxt @r;
        // Reference:  page 53
        break;

      case 0x2:
        // move @r,@s;
        // Reference:  page 34

        dis.byte_length = 1;
        dis.instruction = "move r2,r0;";
        return dis;

        // sxt @r;
        // Reference:  page 53
        break;

      case 0x3:
        // move @r,@s;
        // Reference:  page 34

        dis.byte_length = 1;
        dis.instruction = "move r3,r0;";
        return dis;

        // sxt @r;
        // Reference:  page 53
        break;

      case 0x4:
        // move @r,@s;
        // Reference:  page 34

        dis.byte_length = 1;
        dis.instruction = "move r0,r1;";
        return dis;

        // sxt @r;
        // Reference:  page 53
        break;

      case 0x5:
        // move @r,@s;
        // Reference:  page 34

        dis.byte_length = 1;
        dis.instruction = "move r1,r1;";
        return dis;

        // sxt @r;
        // Reference:  page 53

        dis.byte_length = 1;
        dis.instruction = "sxt r1;";
        return dis;

        break;

      case 0x6:
        // move @r,@s;
        // Reference:  page 34

        dis.byte_length = 1;
        dis.instruction = "move r2,r1;";
        return dis;

        // sxt @r;
        // Reference:  page 53
        break;

      case 0x7:
        // move @r,@s;
        // Reference:  page 34

        dis.byte_length = 1;
        dis.instruction = "move r3,r1;";
        return dis;

        // sxt @r;
        // Reference:  page 53
        break;

      case 0x8:
        // move @r,@s;
        // Reference:  page 34

        dis.byte_length = 1;
        dis.instruction = "move r0,r2;";
        return dis;

        // sxt @r;
        // Reference:  page 53
        break;

      case 0x9:
        // move @r,@s;
        // Reference:  page 34

        dis.byte_length = 1;
        dis.instruction = "move r1,r2;";
        return dis;

        // sxt @r;
        // Reference:  page 53
        break;

      case 0xa:
        // move @r,@s;
        // Reference:  page 34

        dis.byte_length = 1;
        dis.instruction = "move r2,r2;";
        return dis;

        // sxt @r;
        // Reference:  page 53

        dis.byte_length = 1;
        dis.instruction = "sxt r2;";
        return dis;

        break;

      case 0xb:
        // move @r,@s;
        // Reference:  page 34

        dis.byte_length = 1;
        dis.instruction = "move r3,r2;";
        return dis;

        // sxt @r;
        // Reference:  page 53
        break;

      case 0xc:
        // move @r,@s;
        // Reference:  page 34

        dis.byte_length = 1;
        dis.instruction = "move r0,r3;";
        return dis;

        // sxt @r;
        // Reference:  page 53
        break;

      case 0xd:
        // move @r,@s;
        // Reference:  page 34

        dis.byte_length = 1;
        dis.instruction = "move r1,r3;";
        return dis;

        // sxt @r;
        // Reference:  page 53
        break;

      case 0xe:
        // move @r,@s;
        // Reference:  page 34

        dis.byte_length = 1;
        dis.instruction = "move r2,r3;";
        return dis;

        // sxt @r;
        // Reference:  page 53
        break;

      case 0xf:
        // move @r,@s;
        // Reference:  page 34

        dis.byte_length = 1;
        dis.instruction = "move r3,r3;";
        return dis;

        // sxt @r;
        // Reference:  page 53

        dis.byte_length = 1;
        dis.instruction = "sxt r3;";
        return dis;

        break;

      case 0x10:
        // and @r,@s;
        // Reference:  page 9

        dis.byte_length = 1;
        dis.instruction = "and r0,r0;";
        return dis;

        // test @r;
        // Reference:  page 55

        dis.byte_length = 1;
        dis.instruction = "test r0;";
        return dis;

        break;

      case 0x11:
        // and @r,@s;
        // Reference:  page 9

        dis.byte_length = 1;
        dis.instruction = "and r1,r0;";
        return dis;

        // test @r;
        // Reference:  page 55
        break;

      case 0x12:
        // and @r,@s;
        // Reference:  page 9

        dis.byte_length = 1;
        dis.instruction = "and r2,r0;";
        return dis;

        // test @r;
        // Reference:  page 55
        break;

      case 0x13:
        // and @r,@s;
        // Reference:  page 9

        dis.byte_length = 1;
        dis.instruction = "and r3,r0;";
        return dis;

        // test @r;
        // Reference:  page 55
        break;

      case 0x14:
        // and @r,@s;
        // Reference:  page 9

        dis.byte_length = 1;
        dis.instruction = "and r0,r1;";
        return dis;

        // test @r;
        // Reference:  page 55
        break;

      case 0x15:
        // and @r,@s;
        // Reference:  page 9

        dis.byte_length = 1;
        dis.instruction = "and r1,r1;";
        return dis;

        // test @r;
        // Reference:  page 55

        dis.byte_length = 1;
        dis.instruction = "test r1;";
        return dis;

        break;

      case 0x16:
        // and @r,@s;
        // Reference:  page 9

        dis.byte_length = 1;
        dis.instruction = "and r2,r1;";
        return dis;

        // test @r;
        // Reference:  page 55
        break;

      case 0x17:
        // and @r,@s;
        // Reference:  page 9

        dis.byte_length = 1;
        dis.instruction = "and r3,r1;";
        return dis;

        // test @r;
        // Reference:  page 55
        break;

      case 0x18:
        // and @r,@s;
        // Reference:  page 9

        dis.byte_length = 1;
        dis.instruction = "and r0,r2;";
        return dis;

        // test @r;
        // Reference:  page 55
        break;

      case 0x19:
        // and @r,@s;
        // Reference:  page 9

        dis.byte_length = 1;
        dis.instruction = "and r1,r2;";
        return dis;

        // test @r;
        // Reference:  page 55
        break;

      case 0x1a:
        // and @r,@s;
        // Reference:  page 9

        dis.byte_length = 1;
        dis.instruction = "and r2,r2;";
        return dis;

        // test @r;
        // Reference:  page 55

        dis.byte_length = 1;
        dis.instruction = "test r2;";
        return dis;

        break;

      case 0x1b:
        // and @r,@s;
        // Reference:  page 9

        dis.byte_length = 1;
        dis.instruction = "and r3,r2;";
        return dis;

        // test @r;
        // Reference:  page 55
        break;

      case 0x1c:
        // and @r,@s;
        // Reference:  page 9

        dis.byte_length = 1;
        dis.instruction = "and r0,r3;";
        return dis;

        // test @r;
        // Reference:  page 55
        break;

      case 0x1d:
        // and @r,@s;
        // Reference:  page 9

        dis.byte_length = 1;
        dis.instruction = "and r1,r3;";
        return dis;

        // test @r;
        // Reference:  page 55
        break;

      case 0x1e:
        // and @r,@s;
        // Reference:  page 9

        dis.byte_length = 1;
        dis.instruction = "and r2,r3;";
        return dis;

        // test @r;
        // Reference:  page 55
        break;

      case 0x1f:
        // and @r,@s;
        // Reference:  page 9

        dis.byte_length = 1;
        dis.instruction = "and r3,r3;";
        return dis;

        // test @r;
        // Reference:  page 55

        dis.byte_length = 1;
        dis.instruction = "test r3;";
        return dis;

        break;

      case 0x20:
        // xor @r,@s;
        // Reference:  page 57

        dis.byte_length = 1;
        dis.instruction = "xor r0,r0;";
        return dis;

        break;

      case 0x21:
        // xor @r,@s;
        // Reference:  page 57

        dis.byte_length = 1;
        dis.instruction = "xor r1,r0;";
        return dis;

        break;

      case 0x22:
        // xor @r,@s;
        // Reference:  page 57

        dis.byte_length = 1;
        dis.instruction = "xor r2,r0;";
        return dis;

        break;

      case 0x23:
        // xor @r,@s;
        // Reference:  page 57

        dis.byte_length = 1;
        dis.instruction = "xor r3,r0;";
        return dis;

        break;

      case 0x24:
        // xor @r,@s;
        // Reference:  page 57

        dis.byte_length = 1;
        dis.instruction = "xor r0,r1;";
        return dis;

        break;

      case 0x25:
        // xor @r,@s;
        // Reference:  page 57

        dis.byte_length = 1;
        dis.instruction = "xor r1,r1;";
        return dis;

        break;

      case 0x26:
        // xor @r,@s;
        // Reference:  page 57

        dis.byte_length = 1;
        dis.instruction = "xor r2,r1;";
        return dis;

        break;

      case 0x27:
        // xor @r,@s;
        // Reference:  page 57

        dis.byte_length = 1;
        dis.instruction = "xor r3,r1;";
        return dis;

        break;

      case 0x28:
        // xor @r,@s;
        // Reference:  page 57

        dis.byte_length = 1;
        dis.instruction = "xor r0,r2;";
        return dis;

        break;

      case 0x29:
        // xor @r,@s;
        // Reference:  page 57

        dis.byte_length = 1;
        dis.instruction = "xor r1,r2;";
        return dis;

        break;

      case 0x2a:
        // xor @r,@s;
        // Reference:  page 57

        dis.byte_length = 1;
        dis.instruction = "xor r2,r2;";
        return dis;

        break;

      case 0x2b:
        // xor @r,@s;
        // Reference:  page 57

        dis.byte_length = 1;
        dis.instruction = "xor r3,r2;";
        return dis;

        break;

      case 0x2c:
        // xor @r,@s;
        // Reference:  page 57

        dis.byte_length = 1;
        dis.instruction = "xor r0,r3;";
        return dis;

        break;

      case 0x2d:
        // xor @r,@s;
        // Reference:  page 57

        dis.byte_length = 1;
        dis.instruction = "xor r1,r3;";
        return dis;

        break;

      case 0x2e:
        // xor @r,@s;
        // Reference:  page 57

        dis.byte_length = 1;
        dis.instruction = "xor r2,r3;";
        return dis;

        break;

      case 0x2f:
        // xor @r,@s;
        // Reference:  page 57

        dis.byte_length = 1;
        dis.instruction = "xor r3,r3;";
        return dis;

        break;

      case 0x30:
        // inv @r;
        // Reference:  page 22

        dis.byte_length = 1;
        dis.instruction = "inv r0;";
        return dis;

        // or @r,@s;
        // Reference:  page 40

        dis.byte_length = 1;
        dis.instruction = "or r0,r0;";
        return dis;

        break;

      case 0x31:
        // inv @r;
        // Reference:  page 22
        // or @r,@s;
        // Reference:  page 40

        dis.byte_length = 1;
        dis.instruction = "or r1,r0;";
        return dis;

        break;

      case 0x32:
        // inv @r;
        // Reference:  page 22
        // or @r,@s;
        // Reference:  page 40

        dis.byte_length = 1;
        dis.instruction = "or r2,r0;";
        return dis;

        break;

      case 0x33:
        // inv @r;
        // Reference:  page 22
        // or @r,@s;
        // Reference:  page 40

        dis.byte_length = 1;
        dis.instruction = "or r3,r0;";
        return dis;

        break;

      case 0x34:
        // inv @r;
        // Reference:  page 22
        // or @r,@s;
        // Reference:  page 40

        dis.byte_length = 1;
        dis.instruction = "or r0,r1;";
        return dis;

        break;

      case 0x35:
        // inv @r;
        // Reference:  page 22

        dis.byte_length = 1;
        dis.instruction = "inv r1;";
        return dis;

        // or @r,@s;
        // Reference:  page 40

        dis.byte_length = 1;
        dis.instruction = "or r1,r1;";
        return dis;

        break;

      case 0x36:
        // inv @r;
        // Reference:  page 22
        // or @r,@s;
        // Reference:  page 40

        dis.byte_length = 1;
        dis.instruction = "or r2,r1;";
        return dis;

        break;

      case 0x37:
        // inv @r;
        // Reference:  page 22
        // or @r,@s;
        // Reference:  page 40

        dis.byte_length = 1;
        dis.instruction = "or r3,r1;";
        return dis;

        break;

      case 0x38:
        // inv @r;
        // Reference:  page 22
        // or @r,@s;
        // Reference:  page 40

        dis.byte_length = 1;
        dis.instruction = "or r0,r2;";
        return dis;

        break;

      case 0x39:
        // inv @r;
        // Reference:  page 22
        // or @r,@s;
        // Reference:  page 40

        dis.byte_length = 1;
        dis.instruction = "or r1,r2;";
        return dis;

        break;

      case 0x3a:
        // inv @r;
        // Reference:  page 22

        dis.byte_length = 1;
        dis.instruction = "inv r2;";
        return dis;

        // or @r,@s;
        // Reference:  page 40

        dis.byte_length = 1;
        dis.instruction = "or r2,r2;";
        return dis;

        break;

      case 0x3b:
        // inv @r;
        // Reference:  page 22
        // or @r,@s;
        // Reference:  page 40

        dis.byte_length = 1;
        dis.instruction = "or r3,r2;";
        return dis;

        break;

      case 0x3c:
        // inv @r;
        // Reference:  page 22
        // or @r,@s;
        // Reference:  page 40

        dis.byte_length = 1;
        dis.instruction = "or r0,r3;";
        return dis;

        break;

      case 0x3d:
        // inv @r;
        // Reference:  page 22
        // or @r,@s;
        // Reference:  page 40

        dis.byte_length = 1;
        dis.instruction = "or r1,r3;";
        return dis;

        break;

      case 0x3e:
        // inv @r;
        // Reference:  page 22
        // or @r,@s;
        // Reference:  page 40

        dis.byte_length = 1;
        dis.instruction = "or r2,r3;";
        return dis;

        break;

      case 0x3f:
        // inv @r;
        // Reference:  page 22

        dis.byte_length = 1;
        dis.instruction = "inv r3;";
        return dis;

        // or @r,@s;
        // Reference:  page 40

        dis.byte_length = 1;
        dis.instruction = "or r3,r3;";
        return dis;

        break;

      case 0x40:
        // add @r,@s;
        // Reference:  page 5

        dis.byte_length = 1;
        dis.instruction = "add r0,r0;";
        return dis;

        break;

      case 0x41:
        // add @r,@s;
        // Reference:  page 5

        dis.byte_length = 1;
        dis.instruction = "add r1,r0;";
        return dis;

        break;

      case 0x42:
        // add @r,@s;
        // Reference:  page 5

        dis.byte_length = 1;
        dis.instruction = "add r2,r0;";
        return dis;

        break;

      case 0x43:
        // add @r,@s;
        // Reference:  page 5

        dis.byte_length = 1;
        dis.instruction = "add r3,r0;";
        return dis;

        break;

      case 0x44:
        // add @r,@s;
        // Reference:  page 5

        dis.byte_length = 1;
        dis.instruction = "add r0,r1;";
        return dis;

        break;

      case 0x45:
        // add @r,@s;
        // Reference:  page 5

        dis.byte_length = 1;
        dis.instruction = "add r1,r1;";
        return dis;

        break;

      case 0x46:
        // add @r,@s;
        // Reference:  page 5

        dis.byte_length = 1;
        dis.instruction = "add r2,r1;";
        return dis;

        break;

      case 0x47:
        // add @r,@s;
        // Reference:  page 5

        dis.byte_length = 1;
        dis.instruction = "add r3,r1;";
        return dis;

        break;

      case 0x48:
        // add @r,@s;
        // Reference:  page 5

        dis.byte_length = 1;
        dis.instruction = "add r0,r2;";
        return dis;

        break;

      case 0x49:
        // add @r,@s;
        // Reference:  page 5

        dis.byte_length = 1;
        dis.instruction = "add r1,r2;";
        return dis;

        break;

      case 0x4a:
        // add @r,@s;
        // Reference:  page 5

        dis.byte_length = 1;
        dis.instruction = "add r2,r2;";
        return dis;

        break;

      case 0x4b:
        // add @r,@s;
        // Reference:  page 5

        dis.byte_length = 1;
        dis.instruction = "add r3,r2;";
        return dis;

        break;

      case 0x4c:
        // add @r,@s;
        // Reference:  page 5

        dis.byte_length = 1;
        dis.instruction = "add r0,r3;";
        return dis;

        break;

      case 0x4d:
        // add @r,@s;
        // Reference:  page 5

        dis.byte_length = 1;
        dis.instruction = "add r1,r3;";
        return dis;

        break;

      case 0x4e:
        // add @r,@s;
        // Reference:  page 5

        dis.byte_length = 1;
        dis.instruction = "add r2,r3;";
        return dis;

        break;

      case 0x4f:
        // add @r,@s;
        // Reference:  page 5

        dis.byte_length = 1;
        dis.instruction = "add r3,r3;";
        return dis;

        break;

      case 0x50:
        // addq @r,#@q;
        // Reference:  page 7

        dis.byte_length = 1;
        dis.instruction = "addq r0,#2;";
        return dis;

        break;

      case 0x51:
        // addq @r,#@q;
        // Reference:  page 7

        dis.byte_length = 1;
        dis.instruction = "addq r1,#2;";
        return dis;

        break;

      case 0x52:
        // addq @r,#@q;
        // Reference:  page 7

        dis.byte_length = 1;
        dis.instruction = "addq r2,#2;";
        return dis;

        break;

      case 0x53:
        // addq @r,#@q;
        // Reference:  page 7

        dis.byte_length = 1;
        dis.instruction = "addq r3,#2;";
        return dis;

        break;

      case 0x54:
        // addq @r,#@q;
        // Reference:  page 7

        dis.byte_length = 1;
        dis.instruction = "addq r0,#1;";
        return dis;

        break;

      case 0x55:
        // addq @r,#@q;
        // Reference:  page 7

        dis.byte_length = 1;
        dis.instruction = "addq r1,#1;";
        return dis;

        break;

      case 0x56:
        // addq @r,#@q;
        // Reference:  page 7

        dis.byte_length = 1;
        dis.instruction = "addq r2,#1;";
        return dis;

        break;

      case 0x57:
        // addq @r,#@q;
        // Reference:  page 7

        dis.byte_length = 1;
        dis.instruction = "addq r3,#1;";
        return dis;

        break;

      case 0x58:
        // addq @r,#@q;
        // Reference:  page 7

        dis.byte_length = 1;
        dis.instruction = "addq r0,#-2;";
        return dis;

        break;

      case 0x59:
        // addq @r,#@q;
        // Reference:  page 7

        dis.byte_length = 1;
        dis.instruction = "addq r1,#-2;";
        return dis;

        break;

      case 0x5a:
        // addq @r,#@q;
        // Reference:  page 7

        dis.byte_length = 1;
        dis.instruction = "addq r2,#-2;";
        return dis;

        break;

      case 0x5b:
        // addq @r,#@q;
        // Reference:  page 7

        dis.byte_length = 1;
        dis.instruction = "addq r3,#-2;";
        return dis;

        break;

      case 0x5c:
        // addq @r,#@q;
        // Reference:  page 7

        dis.byte_length = 1;
        dis.instruction = "addq r0,#-1;";
        return dis;

        break;

      case 0x5d:
        // addq @r,#@q;
        // Reference:  page 7

        dis.byte_length = 1;
        dis.instruction = "addq r1,#-1;";
        return dis;

        break;

      case 0x5e:
        // addq @r,#@q;
        // Reference:  page 7

        dis.byte_length = 1;
        dis.instruction = "addq r2,#-1;";
        return dis;

        break;

      case 0x5f:
        // addq @r,#@q;
        // Reference:  page 7

        dis.byte_length = 1;
        dis.instruction = "addq r3,#-1;";
        return dis;

        break;

      case 0x60:
        // neg @r;
        // Reference:  page 37

        dis.byte_length = 1;
        dis.instruction = "neg r0;";
        return dis;

        // sub @r,@s;
        // Reference:  page 52

        dis.byte_length = 1;
        dis.instruction = "sub r0,r0;";
        return dis;

        break;

      case 0x61:
        // neg @r;
        // Reference:  page 37
        // sub @r,@s;
        // Reference:  page 52

        dis.byte_length = 1;
        dis.instruction = "sub r1,r0;";
        return dis;

        break;

      case 0x62:
        // neg @r;
        // Reference:  page 37
        // sub @r,@s;
        // Reference:  page 52

        dis.byte_length = 1;
        dis.instruction = "sub r2,r0;";
        return dis;

        break;

      case 0x63:
        // neg @r;
        // Reference:  page 37
        // sub @r,@s;
        // Reference:  page 52

        dis.byte_length = 1;
        dis.instruction = "sub r3,r0;";
        return dis;

        break;

      case 0x64:
        // neg @r;
        // Reference:  page 37
        // sub @r,@s;
        // Reference:  page 52

        dis.byte_length = 1;
        dis.instruction = "sub r0,r1;";
        return dis;

        break;

      case 0x65:
        // neg @r;
        // Reference:  page 37

        dis.byte_length = 1;
        dis.instruction = "neg r1;";
        return dis;

        // sub @r,@s;
        // Reference:  page 52

        dis.byte_length = 1;
        dis.instruction = "sub r1,r1;";
        return dis;

        break;

      case 0x66:
        // neg @r;
        // Reference:  page 37
        // sub @r,@s;
        // Reference:  page 52

        dis.byte_length = 1;
        dis.instruction = "sub r2,r1;";
        return dis;

        break;

      case 0x67:
        // neg @r;
        // Reference:  page 37
        // sub @r,@s;
        // Reference:  page 52

        dis.byte_length = 1;
        dis.instruction = "sub r3,r1;";
        return dis;

        break;

      case 0x68:
        // neg @r;
        // Reference:  page 37
        // sub @r,@s;
        // Reference:  page 52

        dis.byte_length = 1;
        dis.instruction = "sub r0,r2;";
        return dis;

        break;

      case 0x69:
        // neg @r;
        // Reference:  page 37
        // sub @r,@s;
        // Reference:  page 52

        dis.byte_length = 1;
        dis.instruction = "sub r1,r2;";
        return dis;

        break;

      case 0x6a:
        // neg @r;
        // Reference:  page 37

        dis.byte_length = 1;
        dis.instruction = "neg r2;";
        return dis;

        // sub @r,@s;
        // Reference:  page 52

        dis.byte_length = 1;
        dis.instruction = "sub r2,r2;";
        return dis;

        break;

      case 0x6b:
        // neg @r;
        // Reference:  page 37
        // sub @r,@s;
        // Reference:  page 52

        dis.byte_length = 1;
        dis.instruction = "sub r3,r2;";
        return dis;

        break;

      case 0x6c:
        // neg @r;
        // Reference:  page 37
        // sub @r,@s;
        // Reference:  page 52

        dis.byte_length = 1;
        dis.instruction = "sub r0,r3;";
        return dis;

        break;

      case 0x6d:
        // neg @r;
        // Reference:  page 37
        // sub @r,@s;
        // Reference:  page 52

        dis.byte_length = 1;
        dis.instruction = "sub r1,r3;";
        return dis;

        break;

      case 0x6e:
        // neg @r;
        // Reference:  page 37
        // sub @r,@s;
        // Reference:  page 52

        dis.byte_length = 1;
        dis.instruction = "sub r2,r3;";
        return dis;

        break;

      case 0x6f:
        // neg @r;
        // Reference:  page 37

        dis.byte_length = 1;
        dis.instruction = "neg r3;";
        return dis;

        // sub @r,@s;
        // Reference:  page 52

        dis.byte_length = 1;
        dis.instruction = "sub r3,r3;";
        return dis;

        break;

      case 0x70:
        // abs @r;
        // Reference:  page 4

        dis.byte_length = 1;
        dis.instruction = "abs r0;";
        return dis;

        // cmp @r,@s;
        // Reference:  page 19

        dis.byte_length = 1;
        dis.instruction = "cmp r0,r0;";
        return dis;

        break;

      case 0x71:
        // abs @r;
        // Reference:  page 4
        // cmp @r,@s;
        // Reference:  page 19

        dis.byte_length = 1;
        dis.instruction = "cmp r1,r0;";
        return dis;

        break;

      case 0x72:
        // abs @r;
        // Reference:  page 4
        // cmp @r,@s;
        // Reference:  page 19

        dis.byte_length = 1;
        dis.instruction = "cmp r2,r0;";
        return dis;

        break;

      case 0x73:
        // abs @r;
        // Reference:  page 4
        // cmp @r,@s;
        // Reference:  page 19

        dis.byte_length = 1;
        dis.instruction = "cmp r3,r0;";
        return dis;

        break;

      case 0x74:
        // abs @r;
        // Reference:  page 4
        // cmp @r,@s;
        // Reference:  page 19

        dis.byte_length = 1;
        dis.instruction = "cmp r0,r1;";
        return dis;

        break;

      case 0x75:
        // abs @r;
        // Reference:  page 4

        dis.byte_length = 1;
        dis.instruction = "abs r1;";
        return dis;

        // cmp @r,@s;
        // Reference:  page 19

        dis.byte_length = 1;
        dis.instruction = "cmp r1,r1;";
        return dis;

        break;

      case 0x76:
        // abs @r;
        // Reference:  page 4
        // cmp @r,@s;
        // Reference:  page 19

        dis.byte_length = 1;
        dis.instruction = "cmp r2,r1;";
        return dis;

        break;

      case 0x77:
        // abs @r;
        // Reference:  page 4
        // cmp @r,@s;
        // Reference:  page 19

        dis.byte_length = 1;
        dis.instruction = "cmp r3,r1;";
        return dis;

        break;

      case 0x78:
        // abs @r;
        // Reference:  page 4
        // cmp @r,@s;
        // Reference:  page 19

        dis.byte_length = 1;
        dis.instruction = "cmp r0,r2;";
        return dis;

        break;

      case 0x79:
        // abs @r;
        // Reference:  page 4
        // cmp @r,@s;
        // Reference:  page 19

        dis.byte_length = 1;
        dis.instruction = "cmp r1,r2;";
        return dis;

        break;

      case 0x7a:
        // abs @r;
        // Reference:  page 4

        dis.byte_length = 1;
        dis.instruction = "abs r2;";
        return dis;

        // cmp @r,@s;
        // Reference:  page 19

        dis.byte_length = 1;
        dis.instruction = "cmp r2,r2;";
        return dis;

        break;

      case 0x7b:
        // abs @r;
        // Reference:  page 4
        // cmp @r,@s;
        // Reference:  page 19

        dis.byte_length = 1;
        dis.instruction = "cmp r3,r2;";
        return dis;

        break;

      case 0x7c:
        // abs @r;
        // Reference:  page 4
        // cmp @r,@s;
        // Reference:  page 19

        dis.byte_length = 1;
        dis.instruction = "cmp r0,r3;";
        return dis;

        break;

      case 0x7d:
        // abs @r;
        // Reference:  page 4
        // cmp @r,@s;
        // Reference:  page 19

        dis.byte_length = 1;
        dis.instruction = "cmp r1,r3;";
        return dis;

        break;

      case 0x7e:
        // abs @r;
        // Reference:  page 4
        // cmp @r,@s;
        // Reference:  page 19

        dis.byte_length = 1;
        dis.instruction = "cmp r2,r3;";
        return dis;

        break;

      case 0x7f:
        // abs @r;
        // Reference:  page 4

        dis.byte_length = 1;
        dis.instruction = "abs r3;";
        return dis;

        // cmp @r,@s;
        // Reference:  page 19

        dis.byte_length = 1;
        dis.instruction = "cmp r3,r3;";
        return dis;

        break;

      case 0x80:
        // ld.w @r,(@s);
        // Reference:  page 28

        dis.byte_length = 1;
        dis.instruction = "ld.w r0,(r2);";
        return dis;

        break;

      case 0x81:
        // ld.w @r,(@s);
        // Reference:  page 28

        dis.byte_length = 1;
        dis.instruction = "ld.w r1,(r2);";
        return dis;

        break;

      case 0x82:
        // ld.w @r,(@s);
        // Reference:  page 28

        dis.byte_length = 1;
        dis.instruction = "ld.w r0,(r3);";
        return dis;

        break;

      case 0x83:
        // ld.w @r,(@s);
        // Reference:  page 28

        dis.byte_length = 1;
        dis.instruction = "ld.w r1,(r3);";
        return dis;

        break;

      case 0x84:
        // ld.b @r,(@s);
        // Reference:  page 28

        dis.byte_length = 1;
        dis.instruction = "ld.b r0,(r2);";
        return dis;

        break;

      case 0x85:
        // ld.b @r,(@s);
        // Reference:  page 28

        dis.byte_length = 1;
        dis.instruction = "ld.b r1,(r2);";
        return dis;

        break;

      case 0x86:
        // ld.b @r,(@s);
        // Reference:  page 28

        dis.byte_length = 1;
        dis.instruction = "ld.b r0,(r3);";
        return dis;

        break;

      case 0x87:
        // ld.b @r,(@s);
        // Reference:  page 28

        dis.byte_length = 1;
        dis.instruction = "ld.b r1,(r3);";
        return dis;

        break;

      case 0x88:
        // st.w (@s),@r;
        // Reference:  page 28

        dis.byte_length = 1;
        dis.instruction = "st.w (r2),r0;";
        return dis;

        break;

      case 0x89:
        // st.w (@s),@r;
        // Reference:  page 28

        dis.byte_length = 1;
        dis.instruction = "st.w (r2),r1;";
        return dis;

        break;

      case 0x8a:
        // st.w (@s),@r;
        // Reference:  page 28

        dis.byte_length = 1;
        dis.instruction = "st.w (r3),r0;";
        return dis;

        break;

      case 0x8b:
        // st.w (@s),@r;
        // Reference:  page 28

        dis.byte_length = 1;
        dis.instruction = "st.w (r3),r1;";
        return dis;

        break;

      case 0x8c:
        // st.b (@s),@r;
        // Reference:  page 28

        dis.byte_length = 1;
        dis.instruction = "st.b (r2),r0;";
        return dis;

        break;

      case 0x8d:
        // st.b (@s),@r;
        // Reference:  page 28

        dis.byte_length = 1;
        dis.instruction = "st.b (r2),r1;";
        return dis;

        break;

      case 0x8e:
        // st.b (@s),@r;
        // Reference:  page 28

        dis.byte_length = 1;
        dis.instruction = "st.b (r3),r0;";
        return dis;

        break;

      case 0x8f:
        // st.b (@s),@r;
        // Reference:  page 28

        dis.byte_length = 1;
        dis.instruction = "st.b (r3),r1;";
        return dis;

        break;

      case 0x90:
        // ld.w @s,(@r++);
        // Reference:  page 29

        dis.byte_length = 1;
        dis.instruction = "ld.w r0,(r2++);";
        return dis;

        break;

      case 0x91:
        // ld.w @s,(@r++);
        // Reference:  page 29

        dis.byte_length = 1;
        dis.instruction = "ld.w r1,(r2++);";
        return dis;

        break;

      case 0x92:
        // ld.w @s,(@r++);
        // Reference:  page 29

        dis.byte_length = 1;
        dis.instruction = "ld.w r0,(r3++);";
        return dis;

        break;

      case 0x93:
        // ld.w @s,(@r++);
        // Reference:  page 29

        dis.byte_length = 1;
        dis.instruction = "ld.w r1,(r3++);";
        return dis;

        break;

      case 0x94:
        // ld.b @s,(@r++);
        // Reference:  page 29

        dis.byte_length = 1;
        dis.instruction = "ld.b r0,(r2++);";
        return dis;

        break;

      case 0x95:
        // ld.b @s,(@r++);
        // Reference:  page 29

        dis.byte_length = 1;
        dis.instruction = "ld.b r1,(r2++);";
        return dis;

        break;

      case 0x96:
        // ld.b @s,(@r++);
        // Reference:  page 29

        dis.byte_length = 1;
        dis.instruction = "ld.b r0,(r3++);";
        return dis;

        break;

      case 0x97:
        // ld.b @s,(@r++);
        // Reference:  page 29

        dis.byte_length = 1;
        dis.instruction = "ld.b r1,(r3++);";
        return dis;

        break;

      case 0x98:
        // st.w (@r++),@s;
        // Reference:  page 29

        dis.byte_length = 1;
        dis.instruction = "st.w (r2++),r0;";
        return dis;

        break;

      case 0x99:
        // st.w (@r++),@s;
        // Reference:  page 29

        dis.byte_length = 1;
        dis.instruction = "st.w (r2++),r1;";
        return dis;

        break;

      case 0x9a:
        // st.w (@r++),@s;
        // Reference:  page 29

        dis.byte_length = 1;
        dis.instruction = "st.w (r3++),r0;";
        return dis;

        break;

      case 0x9b:
        // st.w (@r++),@s;
        // Reference:  page 29

        dis.byte_length = 1;
        dis.instruction = "st.w (r3++),r1;";
        return dis;

        break;

      case 0x9c:
        // st.b (@r++),@s;
        // Reference:  page 29

        dis.byte_length = 1;
        dis.instruction = "st.b (r2++),r0;";
        return dis;

        break;

      case 0x9d:
        // st.b (@r++),@s;
        // Reference:  page 29

        dis.byte_length = 1;
        dis.instruction = "st.b (r2++),r1;";
        return dis;

        break;

      case 0x9e:
        // st.b (@r++),@s;
        // Reference:  page 29

        dis.byte_length = 1;
        dis.instruction = "st.b (r3++),r0;";
        return dis;

        break;

      case 0x9f:
        // st.b (@r++),@s;
        // Reference:  page 29

        dis.byte_length = 1;
        dis.instruction = "st.b (r3++),r1;";
        return dis;

        break;

      case 0xa0:
        // ld.w @r, (SP,@n);
        // Reference:  page 30

        dis.byte_length = 2;
        dis.instruction = "ld.w r0, (SP," + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H);";
        return dis;

        break;

      case 0xa1:
        // ld.w @r, (SP,@n);
        // Reference:  page 30

        dis.byte_length = 2;
        dis.instruction = "ld.w r1, (SP," + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H);";
        return dis;

        break;

      case 0xa2:
        // ld.w @r, (SP,@n);
        // Reference:  page 30

        dis.byte_length = 2;
        dis.instruction = "ld.w r2, (SP," + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H);";
        return dis;

        break;

      case 0xa3:
        // ld.w @r, (SP,@n);
        // Reference:  page 30

        dis.byte_length = 2;
        dis.instruction = "ld.w r3, (SP," + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H);";
        return dis;

        break;

      case 0xa4:
        // ld.b @r, (SP,@n);
        // Reference:  page 30

        dis.byte_length = 2;
        dis.instruction = "ld.b r0, (SP," + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H);";
        return dis;

        break;

      case 0xa5:
        // ld.b @r, (SP,@n);
        // Reference:  page 30

        dis.byte_length = 2;
        dis.instruction = "ld.b r1, (SP," + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H);";
        return dis;

        break;

      case 0xa6:
        // ld.b @r, (SP,@n);
        // Reference:  page 30

        dis.byte_length = 2;
        dis.instruction = "ld.b r2, (SP," + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H);";
        return dis;

        break;

      case 0xa7:
        // ld.b @r, (SP,@n);
        // Reference:  page 30

        dis.byte_length = 2;
        dis.instruction = "ld.b r3, (SP," + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H);";
        return dis;

        break;

      case 0xa8:
        // st.w (SP,@n), @r;
        // Reference:  page 30

        dis.byte_length = 2;
        dis.instruction = "st.w (SP," + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H), r0;";
        return dis;

        break;

      case 0xa9:
        // st.w (SP,@n), @r;
        // Reference:  page 30

        dis.byte_length = 2;
        dis.instruction = "st.w (SP," + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H), r1;";
        return dis;

        break;

      case 0xaa:
        // st.w (SP,@n), @r;
        // Reference:  page 30

        dis.byte_length = 2;
        dis.instruction = "st.w (SP," + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H), r2;";
        return dis;

        break;

      case 0xab:
        // st.w (SP,@n), @r;
        // Reference:  page 30

        dis.byte_length = 2;
        dis.instruction = "st.w (SP," + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H), r3;";
        return dis;

        break;

      case 0xac:
        // st.b (SP,@n), @r;
        // Reference:  page 30

        dis.byte_length = 2;
        dis.instruction = "st.b (SP," + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H), r0;";
        return dis;

        break;

      case 0xad:
        // st.b (SP,@n), @r;
        // Reference:  page 30

        dis.byte_length = 2;
        dis.instruction = "st.b (SP," + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H), r1;";
        return dis;

        break;

      case 0xae:
        // st.b (SP,@n), @r;
        // Reference:  page 30

        dis.byte_length = 2;
        dis.instruction = "st.b (SP," + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H), r2;";
        return dis;

        break;

      case 0xaf:
        // st.b (SP,@n), @r;
        // Reference:  page 30

        dis.byte_length = 2;
        dis.instruction = "st.b (SP," + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H), r3;";
        return dis;

        break;

      case 0xb0:
        // ld.w @r,@n;
        // Reference:  page 31

        dis.byte_length = 3;
        dis.instruction = "ld.w r0," + getAddressText16(read16(addr + 1)) + ";";
        return dis;

        break;

      case 0xb1:
        // ld.w @r,@n;
        // Reference:  page 31

        dis.byte_length = 3;
        dis.instruction = "ld.w r1," + getAddressText16(read16(addr + 1)) + ";";
        return dis;

        break;

      case 0xb2:
        // ld.w @r,@n;
        // Reference:  page 31

        dis.byte_length = 3;
        dis.instruction = "ld.w r2," + getAddressText16(read16(addr + 1)) + ";";
        return dis;

        break;

      case 0xb3:
        // ld.w @r,@n;
        // Reference:  page 31

        dis.byte_length = 3;
        dis.instruction = "ld.w r3," + getAddressText16(read16(addr + 1)) + ";";
        return dis;

        break;

      case 0xb4:
        // ld.b @r,@n;
        // Reference:  page 31

        dis.byte_length = 3;
        dis.instruction = "ld.b r0," + getAddressText16(read16(addr + 1)) + ";";
        return dis;

        break;

      case 0xb5:
        // ld.b @r,@n;
        // Reference:  page 31

        dis.byte_length = 3;
        dis.instruction = "ld.b r1," + getAddressText16(read16(addr + 1)) + ";";
        return dis;

        break;

      case 0xb6:
        // ld.b @r,@n;
        // Reference:  page 31

        dis.byte_length = 3;
        dis.instruction = "ld.b r2," + getAddressText16(read16(addr + 1)) + ";";
        return dis;

        break;

      case 0xb7:
        // ld.b @r,@n;
        // Reference:  page 31

        dis.byte_length = 3;
        dis.instruction = "ld.b r3," + getAddressText16(read16(addr + 1)) + ";";
        return dis;

        break;

      case 0xb8:
        // st.w @n, @r;
        // Reference:  page 31

        dis.byte_length = 3;
        dis.instruction = "st.w " + getAddressText16(read16(addr + 1)) + ", r0;";
        return dis;

        break;

      case 0xb9:
        // st.w @n, @r;
        // Reference:  page 31

        dis.byte_length = 3;
        dis.instruction = "st.w " + getAddressText16(read16(addr + 1)) + ", r1;";
        return dis;

        break;

      case 0xba:
        // st.w @n, @r;
        // Reference:  page 31

        dis.byte_length = 3;
        dis.instruction = "st.w " + getAddressText16(read16(addr + 1)) + ", r2;";
        return dis;

        break;

      case 0xbb:
        // st.w @n, @r;
        // Reference:  page 31

        dis.byte_length = 3;
        dis.instruction = "st.w " + getAddressText16(read16(addr + 1)) + ", r3;";
        return dis;

        break;

      case 0xbc:
        // st.b @n,@r;
        // Reference:  page 31

        dis.byte_length = 3;
        dis.instruction = "st.b " + getAddressText16(read16(addr + 1)) + ",r0;";
        return dis;

        break;

      case 0xbd:
        // st.b @n,@r;
        // Reference:  page 31

        dis.byte_length = 3;
        dis.instruction = "st.b " + getAddressText16(read16(addr + 1)) + ",r1;";
        return dis;

        break;

      case 0xbe:
        // st.b @n,@r;
        // Reference:  page 31

        dis.byte_length = 3;
        dis.instruction = "st.b " + getAddressText16(read16(addr + 1)) + ",r2;";
        return dis;

        break;

      case 0xbf:
        // st.b @n,@r;
        // Reference:  page 31

        dis.byte_length = 3;
        dis.instruction = "st.b " + getAddressText16(read16(addr + 1)) + ",r3;";
        return dis;

        break;

      case 0xc0:
        // pop @r;
        // Reference:  page 42

        dis.byte_length = 1;
        dis.instruction = "pop r0;";
        return dis;

        break;

      case 0xc1:
        // pop @r;
        // Reference:  page 42

        dis.byte_length = 1;
        dis.instruction = "pop r1;";
        return dis;

        break;

      case 0xc2:
        // pop @r;
        // Reference:  page 42

        dis.byte_length = 1;
        dis.instruction = "pop r2;";
        return dis;

        break;

      case 0xc3:
        // pop @r;
        // Reference:  page 42

        dis.byte_length = 1;
        dis.instruction = "pop r3;";
        return dis;

        break;

      case 0xc4:
        // pop PS;
        // Reference:  page 42

        dis.byte_length = 1;
        dis.instruction = "pop PS;";
        return dis;

        break;

      case 0xc5:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xc5";
        return dis;
        break;

      case 0xc6:
        // ret;
        // Reference:  page 44

        dis.byte_length = 1;
        dis.instruction = "ret;";
        return dis;

        break;

      case 0xc7:
        // reti;
        // Reference:  page 45

        dis.byte_length = 1;
        dis.instruction = "reti;";
        return dis;

        break;

      case 0xc8:
        // push @r;
        // Reference:  page 42

        dis.byte_length = 1;
        dis.instruction = "push r0;";
        return dis;

        break;

      case 0xc9:
        // push @r;
        // Reference:  page 42

        dis.byte_length = 1;
        dis.instruction = "push r1;";
        return dis;

        break;

      case 0xca:
        // push @r;
        // Reference:  page 42

        dis.byte_length = 1;
        dis.instruction = "push r2;";
        return dis;

        break;

      case 0xcb:
        // push @r;
        // Reference:  page 42

        dis.byte_length = 1;
        dis.instruction = "push r3;";
        return dis;

        break;

      case 0xcc:
        // push PS;
        // Reference:  page 42

        dis.byte_length = 1;
        dis.instruction = "push PS;";
        return dis;

        break;

      case 0xcd:
        // trap;
        // Reference:  page 56

        dis.byte_length = 1;
        dis.instruction = "trap;";
        return dis;

        break;

      case 0xce:
        // jsr (r0);
        // Reference:  page 25

        dis.byte_length = 1;
        dis.instruction = "jsr (r0);";
        return dis;

        break;

      case 0xcf:
        // jsr @n;
        // Reference:  page 26

        dis.byte_length = 3;
        dis.instruction = "jsr " + getAddressText16(read16(addr + 1)) + ";";
        return dis;

        // pushpop;
        // Reference:  page 39

        dis.byte_length = 1;
        dis.instruction = "pushpop;";
        return dis;

        break;

      case 0xd0:
        // ld.w @r,#@n;
        // Reference:  page 27

        dis.byte_length = 3;
        dis.instruction = "ld.w r0,#" + getAddressText16(read16(addr + 1)) + ";";
        return dis;

        break;

      case 0xd1:
        // ld.w @r,#@n;
        // Reference:  page 27

        dis.byte_length = 3;
        dis.instruction = "ld.w r1,#" + getAddressText16(read16(addr + 1)) + ";";
        return dis;

        break;

      case 0xd2:
        // ld.w @r,#@n;
        // Reference:  page 27

        dis.byte_length = 3;
        dis.instruction = "ld.w r2,#" + getAddressText16(read16(addr + 1)) + ";";
        return dis;

        break;

      case 0xd3:
        // ld.w @r,#@n;
        // Reference:  page 27

        dis.byte_length = 3;
        dis.instruction = "ld.w r3,#" + getAddressText16(read16(addr + 1)) + ";";
        return dis;

        break;

      case 0xd4:
        // ld.b @r, #@n;
        // Reference:  page 27

        dis.byte_length = 2;
        dis.instruction = "ld.b r0, #" + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H;";
        return dis;

        break;

      case 0xd5:
        // ld.b @r, #@n;
        // Reference:  page 27

        dis.byte_length = 2;
        dis.instruction = "ld.b r1, #" + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H;";
        return dis;

        break;

      case 0xd6:
        // ld.b @r, #@n;
        // Reference:  page 27

        dis.byte_length = 2;
        dis.instruction = "ld.b r2, #" + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H;";
        return dis;

        break;

      case 0xd7:
        // ld.b @r, #@n;
        // Reference:  page 27

        dis.byte_length = 2;
        dis.instruction = "ld.b r3, #" + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H;";
        return dis;

        break;

      case 0xd8:
        // LSL;
        // Reference:  page 32
        // Reference: This is all shifts, logical and arithmetic
        dis = lsl_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xd9:
        // LSL;
        // Reference:  page 32
        // Reference: This is all shifts, logical and arithmetic
        dis = lsl_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xda:
        // LSL;
        // Reference:  page 32
        // Reference: This is all shifts, logical and arithmetic
        dis = lsl_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xdb:
        // LSL;
        // Reference:  page 32
        // Reference: This is all shifts, logical and arithmetic
        dis = lsl_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xdc:
        // bchg;
        // Reference:  page 15
        dis = bits_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xdd:
        // bchg;
        // Reference:  page 15
        dis = bits_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xde:
        // bchg;
        // Reference:  page 15
        dis = bits_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xdf:
        // bchg;
        // Reference:  page 15
        dis = bits_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xe0:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xe0";
        return dis;
        break;

      case 0xe1:
        // buc @n;
        // Reference:  page 13

        dis.byte_length = 2;
        dis.instruction = "buc " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H;";
        return dis;

        // bus @n;
        // Reference:  page 13

        dis.byte_length = 2;
        dis.instruction = "bus " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H;";
        return dis;

        break;

      case 0xe2:
        // bhi @n;
        // Reference:  page 13

        dis.byte_length = 2;
        dis.instruction = "bhi " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H;";
        return dis;

        break;

      case 0xe3:
        // blo @n;
        // Reference:  page 13

        dis.byte_length = 2;
        dis.instruction = "blo " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H;";
        return dis;

        break;

      case 0xe4:
        // bcc @n;
        // Reference:  page 13

        dis.byte_length = 2;
        dis.instruction = "bcc " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H;";
        return dis;

        break;

      case 0xe5:
        // bcs @n;
        // Reference:  page 13

        dis.byte_length = 2;
        dis.instruction = "bcs " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H;";
        return dis;

        break;

      case 0xe6:
        // bne @n;
        // Reference:  page 13

        dis.byte_length = 2;
        dis.instruction = "bne " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H;";
        return dis;

        break;

      case 0xe7:
        // beq @n;
        // Reference:  page 13

        dis.byte_length = 2;
        dis.instruction = "beq " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H;";
        return dis;

        break;

      case 0xe8:
        // bvc @n;
        // Reference:  page 13

        dis.byte_length = 2;
        dis.instruction = "bvc " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H;";
        return dis;

        break;

      case 0xe9:
        // bvs @n;
        // Reference:  page 13

        dis.byte_length = 2;
        dis.instruction = "bvs " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H;";
        return dis;

        break;

      case 0xea:
        // bpl @n;
        // Reference:  page 13

        dis.byte_length = 2;
        dis.instruction = "bpl " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H;";
        return dis;

        break;

      case 0xeb:
        // bmi @n;
        // Reference:  page 13

        dis.byte_length = 2;
        dis.instruction = "bmi " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H;";
        return dis;

        break;

      case 0xec:
        // bge @n;
        // Reference:  page 13

        dis.byte_length = 2;
        dis.instruction = "bge " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H;";
        return dis;

        break;

      case 0xed:
        // blt @n;
        // Reference:  page 13

        dis.byte_length = 2;
        dis.instruction = "blt " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H;";
        return dis;

        break;

      case 0xee:
        // bgt @n;
        // Reference:  page 13

        dis.byte_length = 2;
        dis.instruction = "bgt " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H;";
        return dis;

        break;

      case 0xef:
        // ble @n;
        // Reference:  page 13

        dis.byte_length = 2;
        dis.instruction = "ble " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H;";
        return dis;

        break;

      case 0xf0:
        // move r0,sp;
        // Reference:  page 35

        dis.byte_length = 1;
        dis.instruction = "move r0,sp;";
        return dis;

        break;

      case 0xf1:
        // move sp,r0;
        // Reference:  page 35

        dis.byte_length = 1;
        dis.instruction = "move sp,r0;";
        return dis;

        break;

      case 0xf2:
        // JMP (r0);
        // Reference:  page 23

        dis.byte_length = 1;
        dis.instruction = "JMP (r0);";
        return dis;

        break;

      case 0xf3:
        // JMP @n;
        // Reference:  page 24

        dis.byte_length = 3;
        dis.instruction = "JMP " + getAddressText16(read16(addr + 1)) + ";";
        return dis;

        break;

      case 0xf4:
        // and PS,@n;
        // Reference:  page 9

        dis.byte_length = 2;
        dis.instruction = "and PS," + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H;";
        return dis;

        break;

      case 0xf5:
        // or PS,#n;
        // Reference:  page 41

        dis.byte_length = 1;
        dis.instruction = "or PS,#n;";
        return dis;

        break;

      case 0xf6:
        // add sp,#n;
        // Reference:  page 6

        dis.byte_length = 2;
        dis.instruction = "add sp,#n;";
        return dis;

        break;

      case 0xf7:
        // sqrt;
        // Reference:  page 50

        dis.byte_length = 1;
        dis.instruction = "sqrt;";
        return dis;

        break;

      case 0xf8:
        // mulu;
        // Reference:  page 35

        dis.byte_length = 1;
        dis.instruction = "mulu;";
        return dis;

        break;

      case 0xf9:
        // muls;
        // Reference:  page 35

        dis.byte_length = 1;
        dis.instruction = "muls;";
        return dis;

        break;

      case 0xfa:
        // div.u;
        // Reference:  page 20

        dis.byte_length = 1;
        dis.instruction = "div.u;";
        return dis;

        break;

      case 0xfb:
        // div.s;
        // Reference:  page 20

        dis.byte_length = 1;
        dis.instruction = "div.s;";
        return dis;

        break;

      case 0xfc:
        // addx r0,r1;
        // Reference:  page 8

        dis.byte_length = 1;
        dis.instruction = "addx r0,r1;";
        return dis;

        break;

      case 0xfd:
        // subx r0,r1;
        // Reference:  page 53

        dis.byte_length = 1;
        dis.instruction = "subx r0,r1;";
        return dis;

        break;

      case 0xfe:
        // negx r0;
        // Reference:  page 38

        dis.byte_length = 1;
        dis.instruction = "negx r0;";
        return dis;

        break;

      case 0xff:
        // NOP;
        // Reference:  page 39

        dis.byte_length = 1;
        dis.instruction = "NOP;";
        return dis;

        break;

    } // hctiws
    return dis;
  }

  function lsl_ext(bus, addr) {
    var dis = new Object();
    dis.instruction = "Unknown opcode";
    dis.byte_length = 1;
    var instr; /* of type uint */
    let pc = new emf.Number(16, 2, addr);
    let opcode = read8(addr);

    switch (opcode) {
      case 0x0:
        // lsl @r,#@n-16
        // Reference:  page 32

        dis.byte_length = 1;
        dis.instruction = "lsl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x1:
        // lsl @r,#@n-16
        // Reference:  page 32

        dis.byte_length = 1;
        dis.instruction = "lsl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x2:
        // lsl @r,#@n-16
        // Reference:  page 32

        dis.byte_length = 1;
        dis.instruction = "lsl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x3:
        // lsl @r,#@n-16
        // Reference:  page 32

        dis.byte_length = 1;
        dis.instruction = "lsl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x4:
        // lsl @r,#@n-16
        // Reference:  page 32

        dis.byte_length = 1;
        dis.instruction = "lsl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x5:
        // lsl @r,#@n-16
        // Reference:  page 32

        dis.byte_length = 1;
        dis.instruction = "lsl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x6:
        // lsl @r,#@n-16
        // Reference:  page 32

        dis.byte_length = 1;
        dis.instruction = "lsl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x7:
        // lsl @r,#@n-16
        // Reference:  page 32

        dis.byte_length = 1;
        dis.instruction = "lsl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x8:
        // lsl @r,#@n-16
        // Reference:  page 32

        dis.byte_length = 1;
        dis.instruction = "lsl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x9:
        // lsl @r,#@n-16
        // Reference:  page 32

        dis.byte_length = 1;
        dis.instruction = "lsl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0xa:
        // lsl @r,#@n-16
        // Reference:  page 32

        dis.byte_length = 1;
        dis.instruction = "lsl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0xb:
        // lsl @r,#@n-16
        // Reference:  page 32

        dis.byte_length = 1;
        dis.instruction = "lsl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0xc:
        // lsl @r,#@n-16
        // Reference:  page 32

        dis.byte_length = 1;
        dis.instruction = "lsl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0xd:
        // lsl @r,#@n-16
        // Reference:  page 32

        dis.byte_length = 1;
        dis.instruction = "lsl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0xe:
        // lsl @r,#@n-16
        // Reference:  page 32

        dis.byte_length = 1;
        dis.instruction = "lsl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0xf:
        // lsl @r,#@n-16
        // Reference:  page 32

        dis.byte_length = 1;
        dis.instruction = "lsl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x10:
        // lsl @r,#@n-16
        // Reference:  page 32

        dis.byte_length = 1;
        dis.instruction = "lsl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x11:
        // lsl @r,#@n-16
        // Reference:  page 32

        dis.byte_length = 1;
        dis.instruction = "lsl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x12:
        // lsl @r,#@n-16
        // Reference:  page 32

        dis.byte_length = 1;
        dis.instruction = "lsl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x13:
        // lsl @r,#@n-16
        // Reference:  page 32

        dis.byte_length = 1;
        dis.instruction = "lsl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x14:
        // lsl @r,#@n-16
        // Reference:  page 32

        dis.byte_length = 1;
        dis.instruction = "lsl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x15:
        // lsl @r,#@n-16
        // Reference:  page 32

        dis.byte_length = 1;
        dis.instruction = "lsl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x16:
        // lsl @r,#@n-16
        // Reference:  page 32

        dis.byte_length = 1;
        dis.instruction = "lsl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x17:
        // lsl @r,#@n-16
        // Reference:  page 32

        dis.byte_length = 1;
        dis.instruction = "lsl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x18:
        // lsl @r,#@n-16
        // Reference:  page 32

        dis.byte_length = 1;
        dis.instruction = "lsl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x19:
        // lsl @r,#@n-16
        // Reference:  page 32

        dis.byte_length = 1;
        dis.instruction = "lsl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x1a:
        // lsl @r,#@n-16
        // Reference:  page 32

        dis.byte_length = 1;
        dis.instruction = "lsl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x1b:
        // lsl @r,#@n-16
        // Reference:  page 32

        dis.byte_length = 1;
        dis.instruction = "lsl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x1c:
        // lsl @r,#@n-16
        // Reference:  page 32

        dis.byte_length = 1;
        dis.instruction = "lsl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x1d:
        // lsl @r,#@n-16
        // Reference:  page 32

        dis.byte_length = 1;
        dis.instruction = "lsl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x1e:
        // lsl @r,#@n-16
        // Reference:  page 32

        dis.byte_length = 1;
        dis.instruction = "lsl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x1f:
        // lsl @r,#@n-16
        // Reference:  page 32

        dis.byte_length = 1;
        dis.instruction = "lsl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x20:
        // lsl @r,@s
        // Reference:  page 32

        dis.byte_length = 1;
        dis.instruction = "lsl @r,r0";
        return dis;

        break;

      case 0x21:
        // lsl @r,@s
        // Reference:  page 32

        dis.byte_length = 1;
        dis.instruction = "lsl @r,r1";
        return dis;

        break;

      case 0x22:
        // lsl @r,@s
        // Reference:  page 32

        dis.byte_length = 1;
        dis.instruction = "lsl @r,r2";
        return dis;

        break;

      case 0x23:
        // lsl @r,@s
        // Reference:  page 32

        dis.byte_length = 1;
        dis.instruction = "lsl @r,r3";
        return dis;

        break;

      case 0x24:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x24";
        return dis;
        break;

      case 0x25:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x25";
        return dis;
        break;

      case 0x26:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x26";
        return dis;
        break;

      case 0x27:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x27";
        return dis;
        break;

      case 0x28:
        // lsl.wt @r,@s
        // Reference:  page 32
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        dis.byte_length = 1;
        dis.instruction = "lsl.wt @r,r0";
        return dis;

        break;

      case 0x29:
        // lsl.wt @r,@s
        // Reference:  page 32
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        dis.byte_length = 1;
        dis.instruction = "lsl.wt @r,r1";
        return dis;

        break;

      case 0x2a:
        // lsl.wt @r,@s
        // Reference:  page 32
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        dis.byte_length = 1;
        dis.instruction = "lsl.wt @r,r2";
        return dis;

        break;

      case 0x2b:
        // lsl.wt @r,@s
        // Reference:  page 32
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        dis.byte_length = 1;
        dis.instruction = "lsl.wt @r,r3";
        return dis;

        break;

      case 0x2c:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x2c";
        return dis;
        break;

      case 0x2d:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x2d";
        return dis;
        break;

      case 0x2e:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x2e";
        return dis;
        break;

      case 0x2f:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x2f";
        return dis;
        break;

      case 0x30:
        // lsr @r,@s
        // Reference:  page 32

        dis.byte_length = 1;
        dis.instruction = "lsr @r,r0";
        return dis;

        break;

      case 0x31:
        // lsr @r,@s
        // Reference:  page 32

        dis.byte_length = 1;
        dis.instruction = "lsr @r,r1";
        return dis;

        break;

      case 0x32:
        // lsr @r,@s
        // Reference:  page 32

        dis.byte_length = 1;
        dis.instruction = "lsr @r,r2";
        return dis;

        break;

      case 0x33:
        // lsr @r,@s
        // Reference:  page 32

        dis.byte_length = 1;
        dis.instruction = "lsr @r,r3";
        return dis;

        break;

      case 0x34:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x34";
        return dis;
        break;

      case 0x35:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x35";
        return dis;
        break;

      case 0x36:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x36";
        return dis;
        break;

      case 0x37:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x37";
        return dis;
        break;

      case 0x38:
        // lsr.wt @r,@s
        // Reference:  page 32
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        dis.byte_length = 1;
        dis.instruction = "lsr.wt @r,r0";
        return dis;

        break;

      case 0x39:
        // lsr.wt @r,@s
        // Reference:  page 32
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        dis.byte_length = 1;
        dis.instruction = "lsr.wt @r,r1";
        return dis;

        break;

      case 0x3a:
        // lsr.wt @r,@s
        // Reference:  page 32
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        dis.byte_length = 1;
        dis.instruction = "lsr.wt @r,r2";
        return dis;

        break;

      case 0x3b:
        // lsr.wt @r,@s
        // Reference:  page 32
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        dis.byte_length = 1;
        dis.instruction = "lsr.wt @r,r3";
        return dis;

        break;

      case 0x3c:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x3c";
        return dis;
        break;

      case 0x3d:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x3d";
        return dis;
        break;

      case 0x3e:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x3e";
        return dis;
        break;

      case 0x3f:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x3f";
        return dis;
        break;

      case 0x40:
        // asl @r,#@n-16
        // Reference:  page 11

        dis.byte_length = 1;
        dis.instruction = "asl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x41:
        // asl @r,#@n-16
        // Reference:  page 11

        dis.byte_length = 1;
        dis.instruction = "asl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x42:
        // asl @r,#@n-16
        // Reference:  page 11

        dis.byte_length = 1;
        dis.instruction = "asl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x43:
        // asl @r,#@n-16
        // Reference:  page 11

        dis.byte_length = 1;
        dis.instruction = "asl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x44:
        // asl @r,#@n-16
        // Reference:  page 11

        dis.byte_length = 1;
        dis.instruction = "asl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x45:
        // asl @r,#@n-16
        // Reference:  page 11

        dis.byte_length = 1;
        dis.instruction = "asl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x46:
        // asl @r,#@n-16
        // Reference:  page 11

        dis.byte_length = 1;
        dis.instruction = "asl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x47:
        // asl @r,#@n-16
        // Reference:  page 11

        dis.byte_length = 1;
        dis.instruction = "asl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x48:
        // asl @r,#@n-16
        // Reference:  page 11

        dis.byte_length = 1;
        dis.instruction = "asl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x49:
        // asl @r,#@n-16
        // Reference:  page 11

        dis.byte_length = 1;
        dis.instruction = "asl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x4a:
        // asl @r,#@n-16
        // Reference:  page 11

        dis.byte_length = 1;
        dis.instruction = "asl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x4b:
        // asl @r,#@n-16
        // Reference:  page 11

        dis.byte_length = 1;
        dis.instruction = "asl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x4c:
        // asl @r,#@n-16
        // Reference:  page 11

        dis.byte_length = 1;
        dis.instruction = "asl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x4d:
        // asl @r,#@n-16
        // Reference:  page 11

        dis.byte_length = 1;
        dis.instruction = "asl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x4e:
        // asl @r,#@n-16
        // Reference:  page 11

        dis.byte_length = 1;
        dis.instruction = "asl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x4f:
        // asl @r,#@n-16
        // Reference:  page 11

        dis.byte_length = 1;
        dis.instruction = "asl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x50:
        // asl @r,#@n-16
        // Reference:  page 11

        dis.byte_length = 1;
        dis.instruction = "asl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x51:
        // asl @r,#@n-16
        // Reference:  page 11

        dis.byte_length = 1;
        dis.instruction = "asl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x52:
        // asl @r,#@n-16
        // Reference:  page 11

        dis.byte_length = 1;
        dis.instruction = "asl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x53:
        // asl @r,#@n-16
        // Reference:  page 11

        dis.byte_length = 1;
        dis.instruction = "asl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x54:
        // asl @r,#@n-16
        // Reference:  page 11

        dis.byte_length = 1;
        dis.instruction = "asl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x55:
        // asl @r,#@n-16
        // Reference:  page 11

        dis.byte_length = 1;
        dis.instruction = "asl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x56:
        // asl @r,#@n-16
        // Reference:  page 11

        dis.byte_length = 1;
        dis.instruction = "asl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x57:
        // asl @r,#@n-16
        // Reference:  page 11

        dis.byte_length = 1;
        dis.instruction = "asl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x58:
        // asl @r,#@n-16
        // Reference:  page 11

        dis.byte_length = 1;
        dis.instruction = "asl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x59:
        // asl @r,#@n-16
        // Reference:  page 11

        dis.byte_length = 1;
        dis.instruction = "asl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x5a:
        // asl @r,#@n-16
        // Reference:  page 11

        dis.byte_length = 1;
        dis.instruction = "asl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x5b:
        // asl @r,#@n-16
        // Reference:  page 11

        dis.byte_length = 1;
        dis.instruction = "asl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x5c:
        // asl @r,#@n-16
        // Reference:  page 11

        dis.byte_length = 1;
        dis.instruction = "asl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x5d:
        // asl @r,#@n-16
        // Reference:  page 11

        dis.byte_length = 1;
        dis.instruction = "asl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x5e:
        // asl @r,#@n-16
        // Reference:  page 11

        dis.byte_length = 1;
        dis.instruction = "asl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x5f:
        // asl @r,#@n-16
        // Reference:  page 11

        dis.byte_length = 1;
        dis.instruction = "asl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x60:
        // asl @r,@s
        // Reference:  page 11

        dis.byte_length = 1;
        dis.instruction = "asl @r,r0";
        return dis;

        break;

      case 0x61:
        // asl @r,@s
        // Reference:  page 11

        dis.byte_length = 1;
        dis.instruction = "asl @r,r1";
        return dis;

        break;

      case 0x62:
        // asl @r,@s
        // Reference:  page 11

        dis.byte_length = 1;
        dis.instruction = "asl @r,r2";
        return dis;

        break;

      case 0x63:
        // asl @r,@s
        // Reference:  page 11

        dis.byte_length = 1;
        dis.instruction = "asl @r,r3";
        return dis;

        break;

      case 0x64:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x64";
        return dis;
        break;

      case 0x65:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x65";
        return dis;
        break;

      case 0x66:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x66";
        return dis;
        break;

      case 0x67:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x67";
        return dis;
        break;

      case 0x68:
        // asl.wt @r,@s
        // Reference:  page 11
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        dis.byte_length = 1;
        dis.instruction = "asl.wt @r,r0";
        return dis;

        break;

      case 0x69:
        // asl.wt @r,@s
        // Reference:  page 11
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        dis.byte_length = 1;
        dis.instruction = "asl.wt @r,r1";
        return dis;

        break;

      case 0x6a:
        // asl.wt @r,@s
        // Reference:  page 11
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        dis.byte_length = 1;
        dis.instruction = "asl.wt @r,r2";
        return dis;

        break;

      case 0x6b:
        // asl.wt @r,@s
        // Reference:  page 11
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        dis.byte_length = 1;
        dis.instruction = "asl.wt @r,r3";
        return dis;

        break;

      case 0x6c:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x6c";
        return dis;
        break;

      case 0x6d:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x6d";
        return dis;
        break;

      case 0x6e:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x6e";
        return dis;
        break;

      case 0x6f:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x6f";
        return dis;
        break;

      case 0x70:
        // asr @r,@s
        // Reference:  page 11

        dis.byte_length = 1;
        dis.instruction = "asr @r,r0";
        return dis;

        break;

      case 0x71:
        // asr @r,@s
        // Reference:  page 11

        dis.byte_length = 1;
        dis.instruction = "asr @r,r1";
        return dis;

        break;

      case 0x72:
        // asr @r,@s
        // Reference:  page 11

        dis.byte_length = 1;
        dis.instruction = "asr @r,r2";
        return dis;

        break;

      case 0x73:
        // asr @r,@s
        // Reference:  page 11

        dis.byte_length = 1;
        dis.instruction = "asr @r,r3";
        return dis;

        break;

      case 0x74:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x74";
        return dis;
        break;

      case 0x75:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x75";
        return dis;
        break;

      case 0x76:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x76";
        return dis;
        break;

      case 0x77:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x77";
        return dis;
        break;

      case 0x78:
        // asr.wt @r,@s
        // Reference:  page 1
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        dis.byte_length = 1;
        dis.instruction = "asr.wt @r,r0";
        return dis;

        break;

      case 0x79:
        // asr.wt @r,@s
        // Reference:  page 1
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        dis.byte_length = 1;
        dis.instruction = "asr.wt @r,r1";
        return dis;

        break;

      case 0x7a:
        // asr.wt @r,@s
        // Reference:  page 1
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        dis.byte_length = 1;
        dis.instruction = "asr.wt @r,r2";
        return dis;

        break;

      case 0x7b:
        // asr.wt @r,@s
        // Reference:  page 1
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        dis.byte_length = 1;
        dis.instruction = "asr.wt @r,r3";
        return dis;

        break;

      case 0x7c:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x7c";
        return dis;
        break;

      case 0x7d:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x7d";
        return dis;
        break;

      case 0x7e:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x7e";
        return dis;
        break;

      case 0x7f:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x7f";
        return dis;
        break;

      case 0x80:
        // rol @r,#@n-16
        // Reference:  page 46

        dis.byte_length = 1;
        dis.instruction = "rol @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x81:
        // rol @r,#@n-16
        // Reference:  page 46

        dis.byte_length = 1;
        dis.instruction = "rol @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x82:
        // rol @r,#@n-16
        // Reference:  page 46

        dis.byte_length = 1;
        dis.instruction = "rol @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x83:
        // rol @r,#@n-16
        // Reference:  page 46

        dis.byte_length = 1;
        dis.instruction = "rol @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x84:
        // rol @r,#@n-16
        // Reference:  page 46

        dis.byte_length = 1;
        dis.instruction = "rol @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x85:
        // rol @r,#@n-16
        // Reference:  page 46

        dis.byte_length = 1;
        dis.instruction = "rol @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x86:
        // rol @r,#@n-16
        // Reference:  page 46

        dis.byte_length = 1;
        dis.instruction = "rol @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x87:
        // rol @r,#@n-16
        // Reference:  page 46

        dis.byte_length = 1;
        dis.instruction = "rol @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x88:
        // rol @r,#@n-16
        // Reference:  page 46

        dis.byte_length = 1;
        dis.instruction = "rol @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x89:
        // rol @r,#@n-16
        // Reference:  page 46

        dis.byte_length = 1;
        dis.instruction = "rol @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x8a:
        // rol @r,#@n-16
        // Reference:  page 46

        dis.byte_length = 1;
        dis.instruction = "rol @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x8b:
        // rol @r,#@n-16
        // Reference:  page 46

        dis.byte_length = 1;
        dis.instruction = "rol @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x8c:
        // rol @r,#@n-16
        // Reference:  page 46

        dis.byte_length = 1;
        dis.instruction = "rol @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x8d:
        // rol @r,#@n-16
        // Reference:  page 46

        dis.byte_length = 1;
        dis.instruction = "rol @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x8e:
        // rol @r,#@n-16
        // Reference:  page 46

        dis.byte_length = 1;
        dis.instruction = "rol @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x8f:
        // rol @r,#@n-16
        // Reference:  page 46

        dis.byte_length = 1;
        dis.instruction = "rol @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x90:
        // rol @r,#@n-16
        // Reference:  page 46

        dis.byte_length = 1;
        dis.instruction = "rol @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x91:
        // rol @r,#@n-16
        // Reference:  page 46

        dis.byte_length = 1;
        dis.instruction = "rol @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x92:
        // rol @r,#@n-16
        // Reference:  page 46

        dis.byte_length = 1;
        dis.instruction = "rol @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x93:
        // rol @r,#@n-16
        // Reference:  page 46

        dis.byte_length = 1;
        dis.instruction = "rol @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x94:
        // rol @r,#@n-16
        // Reference:  page 46

        dis.byte_length = 1;
        dis.instruction = "rol @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x95:
        // rol @r,#@n-16
        // Reference:  page 46

        dis.byte_length = 1;
        dis.instruction = "rol @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x96:
        // rol @r,#@n-16
        // Reference:  page 46

        dis.byte_length = 1;
        dis.instruction = "rol @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x97:
        // rol @r,#@n-16
        // Reference:  page 46

        dis.byte_length = 1;
        dis.instruction = "rol @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x98:
        // rol @r,#@n-16
        // Reference:  page 46

        dis.byte_length = 1;
        dis.instruction = "rol @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x99:
        // rol @r,#@n-16
        // Reference:  page 46

        dis.byte_length = 1;
        dis.instruction = "rol @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x9a:
        // rol @r,#@n-16
        // Reference:  page 46

        dis.byte_length = 1;
        dis.instruction = "rol @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x9b:
        // rol @r,#@n-16
        // Reference:  page 46

        dis.byte_length = 1;
        dis.instruction = "rol @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x9c:
        // rol @r,#@n-16
        // Reference:  page 46

        dis.byte_length = 1;
        dis.instruction = "rol @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x9d:
        // rol @r,#@n-16
        // Reference:  page 46

        dis.byte_length = 1;
        dis.instruction = "rol @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x9e:
        // rol @r,#@n-16
        // Reference:  page 46

        dis.byte_length = 1;
        dis.instruction = "rol @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0x9f:
        // rol @r,#@n-16
        // Reference:  page 46

        dis.byte_length = 1;
        dis.instruction = "rol @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0xa0:
        // rol @r,@s
        // Reference:  page 46

        dis.byte_length = 1;
        dis.instruction = "rol @r,r0";
        return dis;

        break;

      case 0xa1:
        // rol @r,@s
        // Reference:  page 46

        dis.byte_length = 1;
        dis.instruction = "rol @r,r1";
        return dis;

        break;

      case 0xa2:
        // rol @r,@s
        // Reference:  page 46

        dis.byte_length = 1;
        dis.instruction = "rol @r,r2";
        return dis;

        break;

      case 0xa3:
        // rol @r,@s
        // Reference:  page 46

        dis.byte_length = 1;
        dis.instruction = "rol @r,r3";
        return dis;

        break;

      case 0xa4:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xa4";
        return dis;
        break;

      case 0xa5:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xa5";
        return dis;
        break;

      case 0xa6:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xa6";
        return dis;
        break;

      case 0xa7:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xa7";
        return dis;
        break;

      case 0xa8:
        // rol.wt @r,@s
        // Reference:  page 46
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        dis.byte_length = 1;
        dis.instruction = "rol.wt @r,r0";
        return dis;

        break;

      case 0xa9:
        // rol.wt @r,@s
        // Reference:  page 46
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        dis.byte_length = 1;
        dis.instruction = "rol.wt @r,r1";
        return dis;

        break;

      case 0xaa:
        // rol.wt @r,@s
        // Reference:  page 46
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        dis.byte_length = 1;
        dis.instruction = "rol.wt @r,r2";
        return dis;

        break;

      case 0xab:
        // rol.wt @r,@s
        // Reference:  page 46
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        dis.byte_length = 1;
        dis.instruction = "rol.wt @r,r3";
        return dis;

        break;

      case 0xac:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xac";
        return dis;
        break;

      case 0xad:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xad";
        return dis;
        break;

      case 0xae:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xae";
        return dis;
        break;

      case 0xaf:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xaf";
        return dis;
        break;

      case 0xb0:
        // ror @r,@s
        // Reference:  page 46

        dis.byte_length = 1;
        dis.instruction = "ror @r,r0";
        return dis;

        break;

      case 0xb1:
        // ror @r,@s
        // Reference:  page 46

        dis.byte_length = 1;
        dis.instruction = "ror @r,r1";
        return dis;

        break;

      case 0xb2:
        // ror @r,@s
        // Reference:  page 46

        dis.byte_length = 1;
        dis.instruction = "ror @r,r2";
        return dis;

        break;

      case 0xb3:
        // ror @r,@s
        // Reference:  page 46

        dis.byte_length = 1;
        dis.instruction = "ror @r,r3";
        return dis;

        break;

      case 0xb4:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xb4";
        return dis;
        break;

      case 0xb5:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xb5";
        return dis;
        break;

      case 0xb6:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xb6";
        return dis;
        break;

      case 0xb7:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xb7";
        return dis;
        break;

      case 0xb8:
        // ror.wt @r,@s
        // Reference:  page 46
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        dis.byte_length = 1;
        dis.instruction = "ror.wt @r,r0";
        return dis;

        break;

      case 0xb9:
        // ror.wt @r,@s
        // Reference:  page 46
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        dis.byte_length = 1;
        dis.instruction = "ror.wt @r,r1";
        return dis;

        break;

      case 0xba:
        // ror.wt @r,@s
        // Reference:  page 46
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        dis.byte_length = 1;
        dis.instruction = "ror.wt @r,r2";
        return dis;

        break;

      case 0xbb:
        // ror.wt @r,@s
        // Reference:  page 46
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        dis.byte_length = 1;
        dis.instruction = "ror.wt @r,r3";
        return dis;

        break;

      case 0xbc:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xbc";
        return dis;
        break;

      case 0xbd:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xbd";
        return dis;
        break;

      case 0xbe:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xbe";
        return dis;
        break;

      case 0xbf:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xbf";
        return dis;
        break;

      case 0xc0:
        // roxl @r,#@n-16
        // Reference:  page 48

        dis.byte_length = 1;
        dis.instruction = "roxl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0xc1:
        // roxl @r,#@n-16
        // Reference:  page 48

        dis.byte_length = 1;
        dis.instruction = "roxl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0xc2:
        // roxl @r,#@n-16
        // Reference:  page 48

        dis.byte_length = 1;
        dis.instruction = "roxl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0xc3:
        // roxl @r,#@n-16
        // Reference:  page 48

        dis.byte_length = 1;
        dis.instruction = "roxl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0xc4:
        // roxl @r,#@n-16
        // Reference:  page 48

        dis.byte_length = 1;
        dis.instruction = "roxl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0xc5:
        // roxl @r,#@n-16
        // Reference:  page 48

        dis.byte_length = 1;
        dis.instruction = "roxl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0xc6:
        // roxl @r,#@n-16
        // Reference:  page 48

        dis.byte_length = 1;
        dis.instruction = "roxl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0xc7:
        // roxl @r,#@n-16
        // Reference:  page 48

        dis.byte_length = 1;
        dis.instruction = "roxl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0xc8:
        // roxl @r,#@n-16
        // Reference:  page 48

        dis.byte_length = 1;
        dis.instruction = "roxl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0xc9:
        // roxl @r,#@n-16
        // Reference:  page 48

        dis.byte_length = 1;
        dis.instruction = "roxl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0xca:
        // roxl @r,#@n-16
        // Reference:  page 48

        dis.byte_length = 1;
        dis.instruction = "roxl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0xcb:
        // roxl @r,#@n-16
        // Reference:  page 48

        dis.byte_length = 1;
        dis.instruction = "roxl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0xcc:
        // roxl @r,#@n-16
        // Reference:  page 48

        dis.byte_length = 1;
        dis.instruction = "roxl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0xcd:
        // roxl @r,#@n-16
        // Reference:  page 48

        dis.byte_length = 1;
        dis.instruction = "roxl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0xce:
        // roxl @r,#@n-16
        // Reference:  page 48

        dis.byte_length = 1;
        dis.instruction = "roxl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0xcf:
        // roxl @r,#@n-16
        // Reference:  page 48

        dis.byte_length = 1;
        dis.instruction = "roxl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0xd0:
        // roxl @r,#@n-16
        // Reference:  page 48

        dis.byte_length = 1;
        dis.instruction = "roxl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0xd1:
        // roxl @r,#@n-16
        // Reference:  page 48

        dis.byte_length = 1;
        dis.instruction = "roxl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0xd2:
        // roxl @r,#@n-16
        // Reference:  page 48

        dis.byte_length = 1;
        dis.instruction = "roxl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0xd3:
        // roxl @r,#@n-16
        // Reference:  page 48

        dis.byte_length = 1;
        dis.instruction = "roxl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0xd4:
        // roxl @r,#@n-16
        // Reference:  page 48

        dis.byte_length = 1;
        dis.instruction = "roxl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0xd5:
        // roxl @r,#@n-16
        // Reference:  page 48

        dis.byte_length = 1;
        dis.instruction = "roxl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0xd6:
        // roxl @r,#@n-16
        // Reference:  page 48

        dis.byte_length = 1;
        dis.instruction = "roxl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0xd7:
        // roxl @r,#@n-16
        // Reference:  page 48

        dis.byte_length = 1;
        dis.instruction = "roxl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0xd8:
        // roxl @r,#@n-16
        // Reference:  page 48

        dis.byte_length = 1;
        dis.instruction = "roxl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0xd9:
        // roxl @r,#@n-16
        // Reference:  page 48

        dis.byte_length = 1;
        dis.instruction = "roxl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0xda:
        // roxl @r,#@n-16
        // Reference:  page 48

        dis.byte_length = 1;
        dis.instruction = "roxl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0xdb:
        // roxl @r,#@n-16
        // Reference:  page 48

        dis.byte_length = 1;
        dis.instruction = "roxl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0xdc:
        // roxl @r,#@n-16
        // Reference:  page 48

        dis.byte_length = 1;
        dis.instruction = "roxl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0xdd:
        // roxl @r,#@n-16
        // Reference:  page 48

        dis.byte_length = 1;
        dis.instruction = "roxl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0xde:
        // roxl @r,#@n-16
        // Reference:  page 48

        dis.byte_length = 1;
        dis.instruction = "roxl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0xdf:
        // roxl @r,#@n-16
        // Reference:  page 48

        dis.byte_length = 1;
        dis.instruction = "roxl @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H-16";
        return dis;

        break;

      case 0xe0:
        // roxl @r,@s
        // Reference:  page 48

        dis.byte_length = 1;
        dis.instruction = "roxl @r,r0";
        return dis;

        break;

      case 0xe1:
        // roxl @r,@s
        // Reference:  page 48

        dis.byte_length = 1;
        dis.instruction = "roxl @r,r1";
        return dis;

        break;

      case 0xe2:
        // roxl @r,@s
        // Reference:  page 48

        dis.byte_length = 1;
        dis.instruction = "roxl @r,r2";
        return dis;

        break;

      case 0xe3:
        // roxl @r,@s
        // Reference:  page 48

        dis.byte_length = 1;
        dis.instruction = "roxl @r,r3";
        return dis;

        break;

      case 0xe4:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xe4";
        return dis;
        break;

      case 0xe5:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xe5";
        return dis;
        break;

      case 0xe6:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xe6";
        return dis;
        break;

      case 0xe7:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xe7";
        return dis;
        break;

      case 0xe8:
        // roxl.wt @r,@s
        // Reference:  page 48
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        dis.byte_length = 1;
        dis.instruction = "roxl.wt @r,r0";
        return dis;

        break;

      case 0xe9:
        // roxl.wt @r,@s
        // Reference:  page 48
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        dis.byte_length = 1;
        dis.instruction = "roxl.wt @r,r1";
        return dis;

        break;

      case 0xea:
        // roxl.wt @r,@s
        // Reference:  page 48
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        dis.byte_length = 1;
        dis.instruction = "roxl.wt @r,r2";
        return dis;

        break;

      case 0xeb:
        // roxl.wt @r,@s
        // Reference:  page 48
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        dis.byte_length = 1;
        dis.instruction = "roxl.wt @r,r3";
        return dis;

        break;

      case 0xec:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xec";
        return dis;
        break;

      case 0xed:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xed";
        return dis;
        break;

      case 0xee:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xee";
        return dis;
        break;

      case 0xef:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xef";
        return dis;
        break;

      case 0xf0:
        // roxr @r,@s
        // Reference:  page 48

        dis.byte_length = 1;
        dis.instruction = "roxr @r,r0";
        return dis;

        break;

      case 0xf1:
        // roxr @r,@s
        // Reference:  page 48

        dis.byte_length = 1;
        dis.instruction = "roxr @r,r1";
        return dis;

        break;

      case 0xf2:
        // roxr @r,@s
        // Reference:  page 48

        dis.byte_length = 1;
        dis.instruction = "roxr @r,r2";
        return dis;

        break;

      case 0xf3:
        // roxr @r,@s
        // Reference:  page 48

        dis.byte_length = 1;
        dis.instruction = "roxr @r,r3";
        return dis;

        break;

      case 0xf4:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xf4";
        return dis;
        break;

      case 0xf5:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xf5";
        return dis;
        break;

      case 0xf6:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xf6";
        return dis;
        break;

      case 0xf7:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xf7";
        return dis;
        break;

      case 0xf8:
        // roxr.wt @r,@s
        // Reference:  page 48
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        dis.byte_length = 1;
        dis.instruction = "roxr.wt @r,r0";
        return dis;

        break;

      case 0xf9:
        // roxr.wt @r,@s
        // Reference:  page 48
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        dis.byte_length = 1;
        dis.instruction = "roxr.wt @r,r1";
        return dis;

        break;

      case 0xfa:
        // roxr.wt @r,@s
        // Reference:  page 48
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        dis.byte_length = 1;
        dis.instruction = "roxr.wt @r,r2";
        return dis;

        break;

      case 0xfb:
        // roxr.wt @r,@s
        // Reference:  page 48
        // Reference: Weighted stores the number of 1 bits shifted out into RA

        dis.byte_length = 1;
        dis.instruction = "roxr.wt @r,r3";
        return dis;

        break;

      case 0xfc:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xfc";
        return dis;
        break;

      case 0xfd:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xfd";
        return dis;
        break;

      case 0xfe:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xfe";
        return dis;
        break;

      case 0xff:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xff";
        return dis;
        break;

    } // hctiws
    return dis;
  }

  function bits_ext(bus, addr) {
    var dis = new Object();
    dis.instruction = "Unknown opcode";
    dis.byte_length = 1;
    var instr; /* of type uint */
    let pc = new emf.Number(16, 2, addr);
    let opcode = read8(addr);

    switch (opcode) {
      case 0x0:
        // btst @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "btst @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x1:
        // btst @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "btst @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x2:
        // btst @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "btst @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x3:
        // btst @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "btst @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x4:
        // btst @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "btst @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x5:
        // btst @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "btst @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x6:
        // btst @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "btst @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x7:
        // btst @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "btst @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x8:
        // btst @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "btst @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x9:
        // btst @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "btst @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xa:
        // btst @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "btst @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xb:
        // btst @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "btst @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xc:
        // btst @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "btst @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xd:
        // btst @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "btst @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xe:
        // btst @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "btst @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xf:
        // btst @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "btst @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x10:
        // btst @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "btst @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x11:
        // btst @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "btst @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x12:
        // btst @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "btst @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x13:
        // btst @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "btst @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x14:
        // btst @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "btst @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x15:
        // btst @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "btst @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x16:
        // btst @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "btst @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x17:
        // btst @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "btst @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x18:
        // btst @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "btst @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x19:
        // btst @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "btst @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x1a:
        // btst @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "btst @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x1b:
        // btst @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "btst @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x1c:
        // btst @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "btst @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x1d:
        // btst @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "btst @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x1e:
        // btst @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "btst @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x1f:
        // btst @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "btst @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x20:
        // btst @r,@s
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "btst @r,r0";
        return dis;

        break;

      case 0x21:
        // btst @r,@s
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "btst @r,r1";
        return dis;

        break;

      case 0x22:
        // btst @r,@s
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "btst @r,r2";
        return dis;

        break;

      case 0x23:
        // btst @r,@s
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "btst @r,r3";
        return dis;

        break;

      case 0x24:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x24";
        return dis;
        break;

      case 0x25:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x25";
        return dis;
        break;

      case 0x26:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x26";
        return dis;
        break;

      case 0x27:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x27";
        return dis;
        break;

      case 0x28:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x28";
        return dis;
        break;

      case 0x29:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x29";
        return dis;
        break;

      case 0x2a:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x2a";
        return dis;
        break;

      case 0x2b:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x2b";
        return dis;
        break;

      case 0x2c:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x2c";
        return dis;
        break;

      case 0x2d:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x2d";
        return dis;
        break;

      case 0x2e:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x2e";
        return dis;
        break;

      case 0x2f:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x2f";
        return dis;
        break;

      case 0x30:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x30";
        return dis;
        break;

      case 0x31:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x31";
        return dis;
        break;

      case 0x32:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x32";
        return dis;
        break;

      case 0x33:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x33";
        return dis;
        break;

      case 0x34:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x34";
        return dis;
        break;

      case 0x35:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x35";
        return dis;
        break;

      case 0x36:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x36";
        return dis;
        break;

      case 0x37:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x37";
        return dis;
        break;

      case 0x38:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x38";
        return dis;
        break;

      case 0x39:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x39";
        return dis;
        break;

      case 0x3a:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x3a";
        return dis;
        break;

      case 0x3b:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x3b";
        return dis;
        break;

      case 0x3c:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x3c";
        return dis;
        break;

      case 0x3d:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x3d";
        return dis;
        break;

      case 0x3e:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x3e";
        return dis;
        break;

      case 0x3f:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x3f";
        return dis;
        break;

      case 0x40:
        // bchg @r,#@n
        // Reference:  page 15

        dis.byte_length = 1;
        dis.instruction = "bchg @r,#" + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x41:
        // bchg @r,#@n
        // Reference:  page 15

        dis.byte_length = 1;
        dis.instruction = "bchg @r,#" + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x42:
        // bchg @r,#@n
        // Reference:  page 15

        dis.byte_length = 1;
        dis.instruction = "bchg @r,#" + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x43:
        // bchg @r,#@n
        // Reference:  page 15

        dis.byte_length = 1;
        dis.instruction = "bchg @r,#" + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x44:
        // bchg @r,#@n
        // Reference:  page 15

        dis.byte_length = 1;
        dis.instruction = "bchg @r,#" + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x45:
        // bchg @r,#@n
        // Reference:  page 15

        dis.byte_length = 1;
        dis.instruction = "bchg @r,#" + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x46:
        // bchg @r,#@n
        // Reference:  page 15

        dis.byte_length = 1;
        dis.instruction = "bchg @r,#" + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x47:
        // bchg @r,#@n
        // Reference:  page 15

        dis.byte_length = 1;
        dis.instruction = "bchg @r,#" + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x48:
        // bchg @r,#@n
        // Reference:  page 15

        dis.byte_length = 1;
        dis.instruction = "bchg @r,#" + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x49:
        // bchg @r,#@n
        // Reference:  page 15

        dis.byte_length = 1;
        dis.instruction = "bchg @r,#" + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x4a:
        // bchg @r,#@n
        // Reference:  page 15

        dis.byte_length = 1;
        dis.instruction = "bchg @r,#" + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x4b:
        // bchg @r,#@n
        // Reference:  page 15

        dis.byte_length = 1;
        dis.instruction = "bchg @r,#" + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x4c:
        // bchg @r,#@n
        // Reference:  page 15

        dis.byte_length = 1;
        dis.instruction = "bchg @r,#" + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x4d:
        // bchg @r,#@n
        // Reference:  page 15

        dis.byte_length = 1;
        dis.instruction = "bchg @r,#" + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x4e:
        // bchg @r,#@n
        // Reference:  page 15

        dis.byte_length = 1;
        dis.instruction = "bchg @r,#" + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x4f:
        // bchg @r,#@n
        // Reference:  page 15

        dis.byte_length = 1;
        dis.instruction = "bchg @r,#" + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x50:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x50";
        return dis;
        break;

      case 0x51:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x51";
        return dis;
        break;

      case 0x52:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x52";
        return dis;
        break;

      case 0x53:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x53";
        return dis;
        break;

      case 0x54:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x54";
        return dis;
        break;

      case 0x55:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x55";
        return dis;
        break;

      case 0x56:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x56";
        return dis;
        break;

      case 0x57:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x57";
        return dis;
        break;

      case 0x58:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x58";
        return dis;
        break;

      case 0x59:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x59";
        return dis;
        break;

      case 0x5a:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x5a";
        return dis;
        break;

      case 0x5b:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x5b";
        return dis;
        break;

      case 0x5c:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x5c";
        return dis;
        break;

      case 0x5d:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x5d";
        return dis;
        break;

      case 0x5e:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x5e";
        return dis;
        break;

      case 0x5f:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x5f";
        return dis;
        break;

      case 0x60:
        // bchg @r,@s
        // Reference:  page 15

        dis.byte_length = 1;
        dis.instruction = "bchg @r,r0";
        return dis;

        break;

      case 0x61:
        // bchg @r,@s
        // Reference:  page 15

        dis.byte_length = 1;
        dis.instruction = "bchg @r,r1";
        return dis;

        break;

      case 0x62:
        // bchg @r,@s
        // Reference:  page 15

        dis.byte_length = 1;
        dis.instruction = "bchg @r,r2";
        return dis;

        break;

      case 0x63:
        // bchg @r,@s
        // Reference:  page 15

        dis.byte_length = 1;
        dis.instruction = "bchg @r,r3";
        return dis;

        break;

      case 0x64:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x64";
        return dis;
        break;

      case 0x65:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x65";
        return dis;
        break;

      case 0x66:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x66";
        return dis;
        break;

      case 0x67:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x67";
        return dis;
        break;

      case 0x68:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x68";
        return dis;
        break;

      case 0x69:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x69";
        return dis;
        break;

      case 0x6a:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x6a";
        return dis;
        break;

      case 0x6b:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x6b";
        return dis;
        break;

      case 0x6c:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x6c";
        return dis;
        break;

      case 0x6d:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x6d";
        return dis;
        break;

      case 0x6e:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x6e";
        return dis;
        break;

      case 0x6f:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x6f";
        return dis;
        break;

      case 0x70:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x70";
        return dis;
        break;

      case 0x71:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x71";
        return dis;
        break;

      case 0x72:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x72";
        return dis;
        break;

      case 0x73:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x73";
        return dis;
        break;

      case 0x74:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x74";
        return dis;
        break;

      case 0x75:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x75";
        return dis;
        break;

      case 0x76:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x76";
        return dis;
        break;

      case 0x77:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x77";
        return dis;
        break;

      case 0x78:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x78";
        return dis;
        break;

      case 0x79:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x79";
        return dis;
        break;

      case 0x7a:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x7a";
        return dis;
        break;

      case 0x7b:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x7b";
        return dis;
        break;

      case 0x7c:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x7c";
        return dis;
        break;

      case 0x7d:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x7d";
        return dis;
        break;

      case 0x7e:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x7e";
        return dis;
        break;

      case 0x7f:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x7f";
        return dis;
        break;

      case 0x80:
        // bclr @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bclr @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x81:
        // bclr @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bclr @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x82:
        // bclr @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bclr @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x83:
        // bclr @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bclr @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x84:
        // bclr @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bclr @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x85:
        // bclr @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bclr @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x86:
        // bclr @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bclr @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x87:
        // bclr @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bclr @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x88:
        // bclr @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bclr @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x89:
        // bclr @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bclr @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x8a:
        // bclr @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bclr @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x8b:
        // bclr @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bclr @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x8c:
        // bclr @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bclr @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x8d:
        // bclr @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bclr @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x8e:
        // bclr @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bclr @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x8f:
        // bclr @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bclr @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x90:
        // bclr @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bclr @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x91:
        // bclr @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bclr @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x92:
        // bclr @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bclr @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x93:
        // bclr @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bclr @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x94:
        // bclr @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bclr @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x95:
        // bclr @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bclr @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x96:
        // bclr @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bclr @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x97:
        // bclr @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bclr @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x98:
        // bclr @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bclr @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x99:
        // bclr @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bclr @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x9a:
        // bclr @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bclr @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x9b:
        // bclr @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bclr @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x9c:
        // bclr @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bclr @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x9d:
        // bclr @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bclr @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x9e:
        // bclr @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bclr @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x9f:
        // bclr @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bclr @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xa0:
        // bclr @r,@s
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bclr @r,r0";
        return dis;

        break;

      case 0xa1:
        // bclr @r,@s
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bclr @r,r1";
        return dis;

        break;

      case 0xa2:
        // bclr @r,@s
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bclr @r,r2";
        return dis;

        break;

      case 0xa3:
        // bclr @r,@s
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bclr @r,r3";
        return dis;

        break;

      case 0xa4:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xa4";
        return dis;
        break;

      case 0xa5:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xa5";
        return dis;
        break;

      case 0xa6:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xa6";
        return dis;
        break;

      case 0xa7:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xa7";
        return dis;
        break;

      case 0xa8:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xa8";
        return dis;
        break;

      case 0xa9:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xa9";
        return dis;
        break;

      case 0xaa:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xaa";
        return dis;
        break;

      case 0xab:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xab";
        return dis;
        break;

      case 0xac:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xac";
        return dis;
        break;

      case 0xad:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xad";
        return dis;
        break;

      case 0xae:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xae";
        return dis;
        break;

      case 0xaf:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xaf";
        return dis;
        break;

      case 0xb0:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xb0";
        return dis;
        break;

      case 0xb1:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xb1";
        return dis;
        break;

      case 0xb2:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xb2";
        return dis;
        break;

      case 0xb3:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xb3";
        return dis;
        break;

      case 0xb4:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xb4";
        return dis;
        break;

      case 0xb5:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xb5";
        return dis;
        break;

      case 0xb6:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xb6";
        return dis;
        break;

      case 0xb7:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xb7";
        return dis;
        break;

      case 0xb8:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xb8";
        return dis;
        break;

      case 0xb9:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xb9";
        return dis;
        break;

      case 0xba:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xba";
        return dis;
        break;

      case 0xbb:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xbb";
        return dis;
        break;

      case 0xbc:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xbc";
        return dis;
        break;

      case 0xbd:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xbd";
        return dis;
        break;

      case 0xbe:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xbe";
        return dis;
        break;

      case 0xbf:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xbf";
        return dis;
        break;

      case 0xc0:
        // bset @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bset @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xc1:
        // bset @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bset @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xc2:
        // bset @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bset @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xc3:
        // bset @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bset @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xc4:
        // bset @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bset @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xc5:
        // bset @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bset @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xc6:
        // bset @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bset @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xc7:
        // bset @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bset @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xc8:
        // bset @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bset @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xc9:
        // bset @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bset @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xca:
        // bset @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bset @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xcb:
        // bset @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bset @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xcc:
        // bset @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bset @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xcd:
        // bset @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bset @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xce:
        // bset @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bset @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xcf:
        // bset @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bset @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xd0:
        // bset @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bset @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xd1:
        // bset @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bset @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xd2:
        // bset @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bset @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xd3:
        // bset @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bset @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xd4:
        // bset @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bset @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xd5:
        // bset @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bset @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xd6:
        // bset @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bset @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xd7:
        // bset @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bset @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xd8:
        // bset @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bset @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xd9:
        // bset @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bset @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xda:
        // bset @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bset @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xdb:
        // bset @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bset @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xdc:
        // bset @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bset @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xdd:
        // bset @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bset @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xde:
        // bset @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bset @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xdf:
        // bset @r,#@n
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bset @r,#" + (("0000" + read5(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xe0:
        // bset @r,@s
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bset @r,r0";
        return dis;

        break;

      case 0xe1:
        // bset @r,@s
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bset @r,r1";
        return dis;

        break;

      case 0xe2:
        // bset @r,@s
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bset @r,r2";
        return dis;

        break;

      case 0xe3:
        // bset @r,@s
        // Reference:  page 16

        dis.byte_length = 1;
        dis.instruction = "bset @r,r3";
        return dis;

        break;

      case 0xe4:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xe4";
        return dis;
        break;

      case 0xe5:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xe5";
        return dis;
        break;

      case 0xe6:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xe6";
        return dis;
        break;

      case 0xe7:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xe7";
        return dis;
        break;

      case 0xe8:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xe8";
        return dis;
        break;

      case 0xe9:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xe9";
        return dis;
        break;

      case 0xea:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xea";
        return dis;
        break;

      case 0xeb:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xeb";
        return dis;
        break;

      case 0xec:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xec";
        return dis;
        break;

      case 0xed:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xed";
        return dis;
        break;

      case 0xee:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xee";
        return dis;
        break;

      case 0xef:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xef";
        return dis;
        break;

      case 0xf0:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xf0";
        return dis;
        break;

      case 0xf1:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xf1";
        return dis;
        break;

      case 0xf2:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xf2";
        return dis;
        break;

      case 0xf3:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xf3";
        return dis;
        break;

      case 0xf4:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xf4";
        return dis;
        break;

      case 0xf5:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xf5";
        return dis;
        break;

      case 0xf6:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xf6";
        return dis;
        break;

      case 0xf7:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xf7";
        return dis;
        break;

      case 0xf8:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xf8";
        return dis;
        break;

      case 0xf9:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xf9";
        return dis;
        break;

      case 0xfa:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xfa";
        return dis;
        break;

      case 0xfb:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xfb";
        return dis;
        break;

      case 0xfc:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xfc";
        return dis;
        break;

      case 0xfd:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xfd";
        return dis;
        break;

      case 0xfe:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xfe";
        return dis;
        break;

      case 0xff:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0xff";
        return dis;
        break;

    } // hctiws
    return dis;
  }
  return {
    start,
    disassemble
  }
});