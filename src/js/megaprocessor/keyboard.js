let megaprocessor_keyboard = (function(bus, options) {
  const keyStates = [];
  const keyCodes = {
    49: {
      row: 3,
      mask: 0x01
    },
    /* 1 */
    50: {
      row: 3,
      mask: 0x02
    },
    /* 2 */
    51: {
      row: 3,
      mask: 0x04
    },
    /* 3 */
    52: {
      row: 3,
      mask: 0x08
    },
    /* 4 */
    53: {
      row: 3,
      mask: 0x10
    },
    /* 5 */
    54: {
      row: 4,
      mask: 0x10
    },
    /* 6 */
    55: {
      row: 4,
      mask: 0x08
    },
    /* 7 */
    56: {
      row: 4,
      mask: 0x04
    },
    /* 8 */
    57: {
      row: 4,
      mask: 0x02
    },
    /* 9 */
    48: {
      row: 4,
      mask: 0x01
    },
    /* 0 */

    81: {
      row: 2,
      mask: 0x01
    },
    /* Q */
    87: {
      row: 2,
      mask: 0x02
    },
    /* W */
    69: {
      row: 2,
      mask: 0x04
    },
    /* E */
    82: {
      row: 2,
      mask: 0x08
    },
    /* R */
    84: {
      row: 2,
      mask: 0x10
    },
    /* T */
    89: {
      row: 5,
      mask: 0x10
    },
    /* Y */
    85: {
      row: 5,
      mask: 0x08
    },
    /* U */
    73: {
      row: 5,
      mask: 0x04
    },
    /* I */
    79: {
      row: 5,
      mask: 0x02
    },
    /* O */
    80: {
      row: 5,
      mask: 0x01
    },
    /* P */

    65: {
      row: 1,
      mask: 0x01
    },
    /* A */
    83: {
      row: 1,
      mask: 0x02
    },
    /* S */
    68: {
      row: 1,
      mask: 0x04
    },
    /* D */
    70: {
      row: 1,
      mask: 0x08
    },
    /* F */
    71: {
      row: 1,
      mask: 0x10
    },
    /* G */
    72: {
      row: 6,
      mask: 0x10
    },
    /* H */
    74: {
      row: 6,
      mask: 0x08
    },
    /* J */
    75: {
      row: 6,
      mask: 0x04
    },
    /* K */
    76: {
      row: 6,
      mask: 0x02
    },
    /* L */
    13: {
      row: 6,
      mask: 0x01
    },
    /* enter */

    16: {
      row: 0,
      mask: 0x01
    },
    /* shift/caps */
    17: {
      row: 0,
      mask: 0x02
    },
    /* alt as symbol shift */
    18: {
      row: 0,
      mask: 0x02
    },
    /* alt as symbol shift */
    90: {
      row: 0,
      mask: 0x04
    },
    /* Z */
    88: {
      row: 0,
      mask: 0x08
    },
    /* X */
    67: {
      row: 0,
      mask: 0x10
    },
    /* C */
    86: {
      row: 7,
      mask: 0x10
    },
    /* V */
    66: {
      row: 7,
      mask: 0x08
    },
    /* B */
    78: {
      row: 7,
      mask: 0x04
    },
    /* N */
    77: {
      row: 7,
      mask: 0x02
    },
    /* M */

    32: {
      row: 7,
      mask: 0x01
    },
    /* space */


    223: {
      symshift: true,
      key: SGX_KEY_7
    }, //` backtick
    45: {
      symshift: true,
      key: SGX_KEY_0
    }, // SGX_KEY_MINUS
    189: {
      symshift: true,
      key: SGX_KEY_J
    }, // SGX_KEY_MINUS
    187: {
      symshift: true,
      key: SGX_KEY_L
    }, // SGX_KEY_EQUALS
    8: {
      shift: true,
      key: SGX_KEY_0
    },
    /* rubout - backspace */
    46: {
      shift: true,
      key: SGX_KEY_0
    },
    /* rubout - delete*/

    219: {
      symshift: true,
      key: SGX_KEY_Y
    }, // [
    221: {
      symshift: true,
      key: SGX_KEY_U
    }, // ]

    186: {
      symshift: true,
      key: SGX_KEY_Z
    },
    /* ; */
    192: {
      symshift: true,
      key: SGX_KEY_7
    }, // single quote produces backtick
    222: {
      symshift: true,
      key: SGX_KEY_3
    }, //#

    188: {
      symshift: true,
      key: SGX_KEY_N
    }, // SGX_KEY_COMMA
    190: {
      symshift: true,
      key: SGX_KEY_M
    }, // .
    191: {
      symshift: true,
      key: SGX_KEY_V
    }, // /

    37: {
      shift: true,
      key: SGX_KEY_5
    }, // SGX_KEY_LEFT
    39: {
      shift: true,
      key: SGX_KEY_8
    }, // SGX_KEY_RIGHT
    38: {
      shift: true,
      key: SGX_KEY_6
    }, // SGX_KEY_UP
    40: {
      shift: true,
      key: SGX_KEY_7
    }, // SGX_KEY_DOWN

  };


  (function ctor() {
    for (let row = 0; row < 9; row++) {
      keyStates[row] = 0xff;
    }

    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);
  })();

  function getState(row) {
    return keyStates[row];
  }

  function keyDown(evt) {
    let keyCode = keyCodes[evt.keyCode];
    if (keyCode == null) {
      return;
    }

    if (keyCode.symshift) {
      keyStates[0] &= ~0x02;
      keyCode = keyCodes[keyCode.key];
      keyStates[keyCode.row] &= ~(keyCode.mask);
    } else if (keyCode.shift) {
      keyStates[0] &= ~0x01;
      keyCode = keyCodes[keyCode.key];
      keyStates[keyCode.row] &= ~(keyCode.mask);
    } else {
      keyStates[keyCode.row] &= ~(keyCode.mask);
    }
  }

  function keyUp(evt) {
    let keyCode = keyCodes[evt.keyCode];
    if (keyCode == null) {
      return;
    }

    if (keyCode.symshift) {
      keyStates[0] |= 0x02;
      keyCode = keyCodes[keyCode.key];
      keyStates[keyCode.row] |= keyCode.mask;
    } else if (keyCode.shift) {
      keyStates[0] |= 0x01;
      keyCode = keyCodes[keyCode.key];
      keyStates[keyCode.row] |= keyCode.mask;
    } else {
      keyStates[keyCode.row] |= keyCode.mask;
    }
  }

  return {
    getState,
  }
})();