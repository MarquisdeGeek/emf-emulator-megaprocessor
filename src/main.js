let gStateVars = {
  // Settings
  autoUpdate: true,

  // Emulation
  machine: undefined,
  controller: undefined,
  framework: undefined,
  importer: undefined,

  // State
  previousCPUState: undefined,
};

$(window).load(function() {
  SGXPrepare_OS();
});

function menuAbout() {
  $('#menuAboutModal').modal('show');
}

function SGXPrepare_OS() {
  let options = {};
  let params = (new URL(document.location)).searchParams;

  // INCLUDE:OPTIONS

  gStateVars.machine = new emfmegaprocessor(options)
  gStateVars.controller = new emf.controller(gStateVars.machine, {
    onStart: function() {
      $('#emu_state').html("Running");
    },
    onStop: function() {
      $('#emu_state').html("Stopped");
      uiRefresh(gStateVars.machine);
    },
    onUpdate: function() {
      if (gStateVars.autoUpdate && gStateVars.controller.isRunning()) {
        uiRefresh(gStateVars.machine);
      }
    },
  });
  gStateVars.framework = new emf.framework(gStateVars.machine);
  gStateVars.importer = new emf.importer();
  gStateVars.framework.createMemoryDisplay({
    divTab: '#myTab',
    divContentsTab: '#myTabContent'
  });
  gStateVars.framework.populateMemoryDisplay(true);
}

// INCLUDE:HELPERS

function SGXinit() {
  // NOP
}

function SGXstart() {
  gStateVars.machine.start();

  uiConfigure(gStateVars.machine);

  startRunning();
}

function SGXdraw() {
  // NOP
}

function SGXupdate(telaps) {
  Main.pause();
}


function startRunning() {
  gStateVars.controller.startRunning();
  uiRefresh(gStateVars.machine);
}

function stopRunning() {
  gStateVars.controller.stopRunning();
  uiRefresh(gStateVars.machine);
}

function uiConfigure(m) {

  if (gStateVars.machine.description) {
    $('#emf_title').html(gStateVars.machine.description);
  }

  $('#emf_step').click(function(ev) {
    gStateVars.controller.step();
    uiRefresh(m);
  });

  $('#emf_stop').click(function(ev) {
    stopRunning();
  });

  $('#emf_run').click(function(ev) {
    startRunning();
  });

  $('#emf_reset').click(function(ev) {
    m.reset();
    if (typeof uiReflect2Emulator !== typeof undefined) {
      uiReflect2Emulator();
    }
    uiRefresh(m);
  });

  $('#emf_export').click(function(ev) {
    let exporter = new emf.exporter();
    let state = exporter.emfMachine(gStateVars.machine);
    let saveas = new emf.saveAs();
    saveas.saveAs(`emf_${gStateVars.machine.name}_state.emf`, state);
  });

  $('#opt_auto_update').click(function(ev) {
    gStateVars.autoUpdate = $("#opt_auto_update").is(":checked");
  });

  // The default UI
  $(document).ready(() => {
    $('#emf_mp_5000').click();
    loadResource("snail.hex", '#emf_info_snail');
  })

  $('#emf_mp_1000').click(function(ev) {
    m.clock.cpu.setRate(1000);
  });

  $('#emf_mp_5000').click(function(ev) {
    m.clock.cpu.setRate(5000);
  });

  $('#emf_mp_40000').click(function(ev) {
    m.clock.cpu.setRate(40000);
  });


  function loadResource(filename, div) {
    $('.emf_info').hide();

    gStateVars.importer.byURL(`res/sw/${filename}`)
      .then(function(data) {
        $(div).show();
        gStateVars.controller.coldLoadData(filename, data);
      })
  }

  $('#emf_load_snail').click(function(ev) {
    loadResource("snail.hex", '#emf_info_snail');
  });

  $('#emf_load_tetris').click(function(ev) {
    loadResource("tetris.hex", '#emf_info_tetris');
  });

  $('#emf_load_oxo').click(function(ev) {
    loadResource("tic_tac_toe_2.hex", '#emf_info_oxo');
  });

  $('#emf_load_life').click(function(ev) {
    loadResource("life.hex", '#emf_info_life');
  });

  $('#emf_load_font').click(function(ev) {
    loadResource("fontest.hex", '#emf_info_font');
  });

  $('#emf_load_monalisa').click(function(ev) {
    loadResource("monalisa.hex", '#emf_info_mona');
  });
  new emf.dragDrop('SGXCanvas', m, function(filename, data) {
    importMachineData(gStateVars.machine, filename, data);
    uiRefresh(m);
  });

  $('#emu_state').html("Loaded...");
}

function importMachineData(machine, filename, data) {
  gStateVars.controller.coldLoadData(filename, data);
}

function uiRefresh(m) {
  let memoryRanges = m.bus.memory.getAddressRanges();
  let pc = m.bus.cpu.emulate.getRegisterValuePC();
  let addrFrom = pc;
  let lines = $('#SGXCanvas').height() / 14; // rule of thumb/guestimate

  gStateVars.framework.disassembleRows('#emf_disassembly_solo', m.bus.cpu, addrFrom, lines, pc);
  gStateVars.framework.registers('#emf_registers', m.bus.cpu, gStateVars.previousCPUState);
  gStateVars.framework.populateMemoryDisplay();
  //
  gStateVars.previousCPUState = m.bus.cpu.emulate.getState();
}