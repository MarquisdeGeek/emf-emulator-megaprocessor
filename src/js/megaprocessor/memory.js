// Memory controller : 
// std.memory
const megaprocessor_memory = (function(bus, options) {
  let enabledBlockList = {};
  enableBlock('ram');
  enableBlock('screen_ram');
  enableBlock('peripheral_ram');
  let ram = new Array(32768).fill(0);
  let screen_ram = new Array(256).fill(0);
  let peripheral_ram = new Array(256).fill(0);

  /*
   **
   ** Basic methods
   **
   */
  function enableBlock(name) {
    enabledBlockList[name] = true;
  }

  function disableBlock(name) {
    enabledBlockList[name] = false;
  }

  function isValidAddress(addr) {
    addr = addr.getUnsigned ? addr.getUnsigned() : addr;
    addr &= 0xffff;
    if (addr >= 0 && addr < 32768 && enabledBlockList['ram']) {
      return true;
    }
    if (addr >= 40960 && addr < 41216 && enabledBlockList['screen_ram']) {
      return true;
    }
    if (addr >= 32768 && addr < 33024 && enabledBlockList['peripheral_ram']) {
      return true;
    }
    return false;
  } // isValidAddress

  function getAddressRanges() {
    let ranges = [];
    ranges.push({
      name: 'ram',
      start: 0,
      size: 32768,
      read: true,
      write: true,
      shadow: false,
      enabled: enabledBlockList['ram']
    });
    ranges.push({
      name: 'screen_ram',
      start: 40960,
      size: 256,
      read: true,
      write: true,
      shadow: false,
      enabled: enabledBlockList['screen_ram']
    });
    ranges.push({
      name: 'peripheral_ram',
      start: 32768,
      size: 256,
      read: true,
      write: true,
      shadow: false,
      enabled: enabledBlockList['peripheral_ram']
    });
    return ranges;
  }

  function getLabel(addr) {
    addr = addr.getUnsigned ? addr.getUnsigned() : addr;
    addr &= 0xffff;
    return '';
  } // getLabel

  function read8(addr, forceRead) {
    addr = addr.getUnsigned ? addr.getUnsigned() : addr;
    addr &= 0xffff;
    if (addr >= 0 && addr < 32768 && enabledBlockList['ram']) {
      let data;
      data = ram[addr - 0];
      return data;
    } //fi 
    if (addr >= 40960 && addr < 41216 && enabledBlockList['screen_ram']) {
      let data;
      data = screen_ram[addr - 40960];
      data = bus.display.hook.onRead8(addr, data);
      return data;
    } //fi 
    if (addr >= 32768 && addr < 33024 && enabledBlockList['peripheral_ram']) {
      let data;
      data = peripheral_ram[addr - 32768];
      data = bus.peripherals.hook.onRead8(addr, data);
      return data;
    } //fi 
    return 0; // a bad default
  } // read8

  function write8(addr, data, forceWrite) {
    addr = addr.getUnsigned ? addr.getUnsigned() : addr;
    addr &= 0xffff;
    data = data.getUnsigned ? data.getUnsigned() : data;
    data &= 0xff;
    if (addr >= 0 && addr < 32768 && enabledBlockList['ram']) {
      ram[addr - 0] = data;
      return;
    } //fi 
    if (addr >= 40960 && addr < 41216 && enabledBlockList['screen_ram']) {
      bus.display.hook.onWrite8(addr, data);
      screen_ram[addr - 40960] = data;
      return;
    } //fi 
    if (addr >= 32768 && addr < 33024 && enabledBlockList['peripheral_ram']) {
      bus.peripherals.hook.onWrite8(addr, data);
      peripheral_ram[addr - 32768] = data;
      return;
    } //fi 
  } // write8


  /*
   **
   ** Helpers methods
   **
   */
  function read16(addr) {
    addr = addr.getUnsigned ? addr.getUnsigned() : addr;
    return read8(addr + 1) * 256 + read8(addr);
  }

  function write16(addr, data) {
    addr = addr.getUnsigned ? addr.getUnsigned() : addr;
    data = data.getUnsigned ? data.getUnsigned() : data;
    write8(addr + 1, data >> 8);
    write8(addr + 0, data & 255);
  }

  /*
   **
   ** State methods
   **
   */


  function getState() {
    let state = [];
    getAddressRanges().forEach((blk) => {
      if (!blk.shadow) {
        let memdata = [];
        for (let i = 0; i < blk.size; ++i) {
          memdata.push(read8(blk.start + i, true));
        }

        state.push({
          start: blk.start,
          data: memdata
        });
      }
    });

    return state;
  }

  function setState(json) {
    json.forEach((blk) => {
      let address = blk.start;
      for (let i = 0; i < blk.data.length; ++i, ++address) {
        write8(address, blk.data[i], true);
      }
    });
  }

  /*
   **
   ** Public interface
   **
   */
  return {
    isValidAddress,
    getAddressRanges,
    getLabel,
    read8,
    read16,
    write8,
    write16,
    enableBlock,
    disableBlock,
    getState,
    setState,
  };
});