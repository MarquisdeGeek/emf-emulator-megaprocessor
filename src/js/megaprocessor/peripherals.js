let megaprocessor_peripherals = (function(bus, options) {
  const GEN_IO_INPUT = 0x00008032;

  const TIME_BLK_COUNTER = 0x00008000;
  const TIME_BLK_TIMER = 0x00008002;
  const TIME_BLK_TIMER_CTRL = 0x00008004;
  const TIME_BLK_TIMER_CTRL_EN_TIMER = 0x01;
  const TIME_BLK_TIMER_CTRL_CLR_COUNT = 0x02;
  const TIME_BLK_TIMER_CTRL_CLR_TIMER = 0x04;

  const keyCodes = {
    38: 0x0001, // IO_SWITCH_FLAG_UP
    40: 0x0002, // IO_SWITCH_FLAG_DOWN
    37: 0x0004, // IO_SWITCH_FLAG_LEFT
    39: 0x0008, // IO_SWITCH_FLAG_RIGHT
    65: 0x0010, // IO_SWITCH_FLAG_SQUARE (A)
    87: 0x0020, // IO_SWITCH_FLAG_TRIANGLE (W)
    83: 0x0040, // IO_SWITCH_FLAG_CIRCLE (S)
    90: 0x0080, // IO_SWITCH_FLAG_CROSS (Z)
    69: 0x0100, // IO_SWITCH_FLAG_L1 (E)
    68: 0x0200, // IO_SWITCH_FLAG_L2 (D)
    82: 0x0400, // IO_SWITCH_FLAG_R1 (R)
    70: 0x0800, // IO_SWITCH_FLAG_R2 (F)
  };
  let ioInputData;
  let ioCounter;
  let ioTimer;
  let ioTimerControl;
  let hook = {
    onWrite8: function(addr, data) {
      switch (addr) {
        case TIME_BLK_TIMER_CTRL:
          ioTimerControl = data;
          break;
      }
    },
    onRead8: function(addr, data) {
      switch (addr) {
        case TIME_BLK_TIMER:
          return ioTimer;

        case GEN_IO_INPUT:
          return ioInputData;

        case TIME_BLK_COUNTER:
          return ioCounter;
      }

      return typeof data === typeof undefined ? 0 : data;
    },
  };

  (function ctor() {
    reset();
  })();

  function reset() {
    ioInputData = 0xffff;
    ioCounter = 0;
    ioTimer = 0xffff;
    ioTimerControl = 0;
  }

  function start() {
    reset();

    setInterval(() => {
      if (++ioCounter == 0x10000) {
        ioCounter = 0;
        bus.pulseLow('counter');
      }

      if (ioTimerControl & TIME_BLK_TIMER_CTRL_EN_TIMER) {
        if (ioTimer) {
          --ioTimer;
        } else {
          ioTimer = 0xffff;
          bus.pulseLow('timer');
        }
      }

    }, 1000 / 50);

    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);
  }

  function keyDown(evt) {
    let keyCode = keyCodes[evt.keyCode];
    if (keyCode) {
      ioInputData &= ~keyCode;
    }
    evt.preventDefault();
  }

  function keyUp(evt) {
    let keyCode = keyCodes[evt.keyCode];
    if (keyCode) {
      ioInputData |= keyCode;
    }
    evt.preventDefault();
  }

  return {
    start,
    hook,
  }
});