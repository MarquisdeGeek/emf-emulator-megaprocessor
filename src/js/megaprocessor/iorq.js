let megaprocessor_iorq = (function(bus, options) {

  function readPort(addr) {
    return 0;
  }

  function writePort(addr, val) {}

  return {
    readPort,
    writePort,
  }
});