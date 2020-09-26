/*
 **
 ** EMF Machine : auto-gen : megaprocessor
 **
 */
function emfmegaprocessor(options) {
  options = options || {};
  options.cpu = options.cpu || {};
  options.cpu.directMemory = typeof options.cpu.directMemory === typeof undefined ? true : options.cpu.directMemory
  options.cpu.directFetch = typeof options.cpu.directFetch === typeof undefined ? true : options.cpu.directFetch
  options.memory = options.memory || {};
  // 

  /*
   **
   ** Create the machine
   **
   */
  let m = {};
  m.name = "megaprocessor";
  m.description = "Megaprocessor";

  /*
   **
   ** Create the bus
   **
   */
  m.bus = new emf.bus({
    reset: function() {
      m.bus.setHigh('int');
    }
  });

  /*
   **
   ** Add everything in the device object
   **
   */
  m.device = {};
  m.device.cpu = {};
  m.device.cpu.name = "cpu";
  m.device.cpu.getState = function() {
    let state = m.device.cpu.emulate.getState();
    Object.keys(state.registers).map((r) => state.registers[r] = state.registers[r].getUnsigned());
    return state;
  }
  m.device.cpu.setState = function(json) {
    return m.device.cpu.emulate.setState(json);
  }
  m.device.cpu.emulate = new megaprocessor_cpu_emulator(m.bus, options.cpu);
  m.device.cpu.disassemble = new megaprocessor_cpu_disassemble(m.bus, options.cpu);
  m.device.cpu.assemble = new megaprocessor_cpu_assemble(m.bus, options.cpu);
  m.device.memory = new megaprocessor_memory(m.bus, options.memory);
  m.device.display = new megaprocessor_display(m.bus, options.display);
  m.device.peripherals = new megaprocessor_peripherals(m.bus, options.peripherals);
  m.device.iorq = new megaprocessor_iorq(m.bus, options.iorq);

  /*
   **
   ** Attach devices to the bus
   **
   */
  m.bus.cpu = m.device.cpu;
  m.bus.memory = m.device.memory;
  m.bus.display = m.device.display;
  m.bus.peripherals = m.device.peripherals;
  m.bus.iorq = m.device.iorq;

  /*
   **
   ** State
   **
   */
  m.state = {};
  m.state.cpu = {};
  m.state.display = {};
  m.state.peripherals = {};
  m.state.iorq = {};

  /*
   **
   ** Clocks
   **
   */
  m.bus.clock = {};
  m.clock = {};
  m.clock.cpu = new megaprocessor_clock_cpu(m, options);
  m.bus.clock.cpu = m.clock.cpu;

  /*
   **
   ** Construction complete - initialisation methods
   **
   */
  m.start = function() {
    let processed = {};
    m.bus.reset();
    if (m.bus.cpu.emulate.start) processed.cpu = m.bus.cpu.emulate.start(m.bus.cpu, arguments);
    if (m.bus.cpu.disassemble.start) processed.cpu = m.bus.cpu.disassemble.start(m.bus.cpu, arguments);
    if (m.bus.cpu.assemble.start) processed.cpu = m.bus.cpu.assemble.start(m.bus.cpu, arguments);
    if (m.bus.memory.start) processed.memory = m.bus.memory.start(m.bus.memory, arguments);
    if (m.bus.display.start) processed.display = m.bus.display.start(m.bus.display, arguments);
    if (m.bus.peripherals.start) processed.peripherals = m.bus.peripherals.start(m.bus.peripherals, arguments);
    if (m.bus.iorq.start) processed.iorq = m.bus.iorq.start(m.bus.iorq, arguments);
    if (m.clock.cpu.start) m.clock.cpu.start(m.clock.cpu, arguments);
    return processed;
  };
  m.reset = function() {
    let processed = {};
    m.bus.reset();
    if (m.bus.cpu.emulate.reset) processed.cpu = m.bus.cpu.emulate.reset(m.bus.cpu, arguments);
    if (m.bus.cpu.disassemble.reset) processed.cpu = m.bus.cpu.disassemble.reset(m.bus.cpu, arguments);
    if (m.bus.cpu.assemble.reset) processed.cpu = m.bus.cpu.assemble.reset(m.bus.cpu, arguments);
    if (m.bus.memory.reset) processed.memory = m.bus.memory.reset(m.bus.memory, arguments);
    if (m.bus.display.reset) processed.display = m.bus.display.reset(m.bus.display, arguments);
    if (m.bus.peripherals.reset) processed.peripherals = m.bus.peripherals.reset(m.bus.peripherals, arguments);
    if (m.bus.iorq.reset) processed.iorq = m.bus.iorq.reset(m.bus.iorq, arguments);
    if (m.clock.cpu.reset) m.clock.cpu.reset(m.clock.cpu, arguments);
    return processed;
  };
  m.getState = function() {
    let processed = {};
    if (m.bus.cpu.emulate.getState) processed.cpu = m.bus.cpu.emulate.getState(m.bus.cpu, arguments);
    if (m.bus.cpu.disassemble.getState) processed.cpu = m.bus.cpu.disassemble.getState(m.bus.cpu, arguments);
    if (m.bus.cpu.assemble.getState) processed.cpu = m.bus.cpu.assemble.getState(m.bus.cpu, arguments);
    if (m.bus.memory.getState) processed.memory = m.bus.memory.getState(m.bus.memory, arguments);
    if (m.bus.display.getState) processed.display = m.bus.display.getState(m.bus.display, arguments);
    if (m.bus.peripherals.getState) processed.peripherals = m.bus.peripherals.getState(m.bus.peripherals, arguments);
    if (m.bus.iorq.getState) processed.iorq = m.bus.iorq.getState(m.bus.iorq, arguments);
    if (m.clock.cpu.getState) m.clock.cpu.getState(m.clock.cpu, arguments);
    return processed;
  };
  m.setState = function() {
    let processed = {};
    if (m.bus.cpu.emulate.setState) processed.cpu = m.bus.cpu.emulate.setState(m.bus.cpu, arguments);
    if (m.bus.cpu.disassemble.setState) processed.cpu = m.bus.cpu.disassemble.setState(m.bus.cpu, arguments);
    if (m.bus.cpu.assemble.setState) processed.cpu = m.bus.cpu.assemble.setState(m.bus.cpu, arguments);
    if (m.bus.memory.setState) processed.memory = m.bus.memory.setState(m.bus.memory, arguments);
    if (m.bus.display.setState) processed.display = m.bus.display.setState(m.bus.display, arguments);
    if (m.bus.peripherals.setState) processed.peripherals = m.bus.peripherals.setState(m.bus.peripherals, arguments);
    if (m.bus.iorq.setState) processed.iorq = m.bus.iorq.setState(m.bus.iorq, arguments);
    if (m.clock.cpu.setState) m.clock.cpu.setState(m.clock.cpu, arguments);
    return processed;
  };
  m.update = function(how) {
    let processed = {};
    processed.cpu = m.device.cpu.emulate.update(how);
    return processed;
  };


  /*
   **
   ** Device-specific options - essentially globals
   **
   */
  m.options = {};
  m.options.disassemble = {};
  m.options.disassemble.widthColumnHex = 12;
  m.options.disassemble.widthColumnInstruction = 14;

  return m;
}