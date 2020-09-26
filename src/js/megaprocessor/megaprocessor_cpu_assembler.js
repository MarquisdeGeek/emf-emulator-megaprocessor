// megaprocessor_cpu_assemble
let megaprocessor_cpu_assemble = (function(bus, options) {
  let equateMap = {};
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
   ** Equates table
   **
   */
  function clearEquateMap() {
    equateMap = {};
  }

  function setEquateValue(name, value) {
    name = name.toLowerCase();
    equateMap[name] = value;
  }

  function getEquateValue(name) {
    name = name.toLowerCase();
    return equateMap[name];
  }

  function getEquateMap(n) {
    return equateMap;
  }


  /*
   **
   ** The real work...
   **
   */
  function start() {
    read8 = bus.memory.read8;
    read16 = bus.memory.read16;
  }

  function assemble(str) {
    let pattern = null;
    let matched;
    let pc = new emf.Number(16); // TODO: Remove the need for this
    // move @r,@s;
    // Reference:  page 34

    if ((matched = str.match(/move\s+r0\s*,\s*r0;/i)) != null) {
      let rt = {
        pattern: "00000000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // sxt @r;
    // Reference:  page 53

    if ((matched = str.match(/sxt\s+r0;/i)) != null) {
      let rt = {
        pattern: "00000000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // move @r,@s;
    // Reference:  page 34

    if ((matched = str.match(/move\s+r1\s*,\s*r0;/i)) != null) {
      let rt = {
        pattern: "00000001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // sxt @r;
    // Reference:  page 53
    // move @r,@s;
    // Reference:  page 34

    if ((matched = str.match(/move\s+r2\s*,\s*r0;/i)) != null) {
      let rt = {
        pattern: "00000010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // sxt @r;
    // Reference:  page 53
    // move @r,@s;
    // Reference:  page 34

    if ((matched = str.match(/move\s+r3\s*,\s*r0;/i)) != null) {
      let rt = {
        pattern: "00000011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // sxt @r;
    // Reference:  page 53
    // move @r,@s;
    // Reference:  page 34

    if ((matched = str.match(/move\s+r0\s*,\s*r1;/i)) != null) {
      let rt = {
        pattern: "00000100",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // sxt @r;
    // Reference:  page 53
    // move @r,@s;
    // Reference:  page 34

    if ((matched = str.match(/move\s+r1\s*,\s*r1;/i)) != null) {
      let rt = {
        pattern: "00000101",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // sxt @r;
    // Reference:  page 53

    if ((matched = str.match(/sxt\s+r1;/i)) != null) {
      let rt = {
        pattern: "00000101",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // move @r,@s;
    // Reference:  page 34

    if ((matched = str.match(/move\s+r2\s*,\s*r1;/i)) != null) {
      let rt = {
        pattern: "00000110",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // sxt @r;
    // Reference:  page 53
    // move @r,@s;
    // Reference:  page 34

    if ((matched = str.match(/move\s+r3\s*,\s*r1;/i)) != null) {
      let rt = {
        pattern: "00000111",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // sxt @r;
    // Reference:  page 53
    // move @r,@s;
    // Reference:  page 34

    if ((matched = str.match(/move\s+r0\s*,\s*r2;/i)) != null) {
      let rt = {
        pattern: "00001000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // sxt @r;
    // Reference:  page 53
    // move @r,@s;
    // Reference:  page 34

    if ((matched = str.match(/move\s+r1\s*,\s*r2;/i)) != null) {
      let rt = {
        pattern: "00001001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // sxt @r;
    // Reference:  page 53
    // move @r,@s;
    // Reference:  page 34

    if ((matched = str.match(/move\s+r2\s*,\s*r2;/i)) != null) {
      let rt = {
        pattern: "00001010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // sxt @r;
    // Reference:  page 53

    if ((matched = str.match(/sxt\s+r2;/i)) != null) {
      let rt = {
        pattern: "00001010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // move @r,@s;
    // Reference:  page 34

    if ((matched = str.match(/move\s+r3\s*,\s*r2;/i)) != null) {
      let rt = {
        pattern: "00001011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // sxt @r;
    // Reference:  page 53
    // move @r,@s;
    // Reference:  page 34

    if ((matched = str.match(/move\s+r0\s*,\s*r3;/i)) != null) {
      let rt = {
        pattern: "00001100",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // sxt @r;
    // Reference:  page 53
    // move @r,@s;
    // Reference:  page 34

    if ((matched = str.match(/move\s+r1\s*,\s*r3;/i)) != null) {
      let rt = {
        pattern: "00001101",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // sxt @r;
    // Reference:  page 53
    // move @r,@s;
    // Reference:  page 34

    if ((matched = str.match(/move\s+r2\s*,\s*r3;/i)) != null) {
      let rt = {
        pattern: "00001110",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // sxt @r;
    // Reference:  page 53
    // move @r,@s;
    // Reference:  page 34

    if ((matched = str.match(/move\s+r3\s*,\s*r3;/i)) != null) {
      let rt = {
        pattern: "00001111",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // sxt @r;
    // Reference:  page 53

    if ((matched = str.match(/sxt\s+r3;/i)) != null) {
      let rt = {
        pattern: "00001111",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // and @r,@s;
    // Reference:  page 9

    if ((matched = str.match(/and\s+r0\s*,\s*r0;/i)) != null) {
      let rt = {
        pattern: "00010000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // test @r;
    // Reference:  page 55

    if ((matched = str.match(/test\s+r0;/i)) != null) {
      let rt = {
        pattern: "00010000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // and @r,@s;
    // Reference:  page 9

    if ((matched = str.match(/and\s+r1\s*,\s*r0;/i)) != null) {
      let rt = {
        pattern: "00010001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // test @r;
    // Reference:  page 55
    // and @r,@s;
    // Reference:  page 9

    if ((matched = str.match(/and\s+r2\s*,\s*r0;/i)) != null) {
      let rt = {
        pattern: "00010010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // test @r;
    // Reference:  page 55
    // and @r,@s;
    // Reference:  page 9

    if ((matched = str.match(/and\s+r3\s*,\s*r0;/i)) != null) {
      let rt = {
        pattern: "00010011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // test @r;
    // Reference:  page 55
    // and @r,@s;
    // Reference:  page 9

    if ((matched = str.match(/and\s+r0\s*,\s*r1;/i)) != null) {
      let rt = {
        pattern: "00010100",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // test @r;
    // Reference:  page 55
    // and @r,@s;
    // Reference:  page 9

    if ((matched = str.match(/and\s+r1\s*,\s*r1;/i)) != null) {
      let rt = {
        pattern: "00010101",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // test @r;
    // Reference:  page 55

    if ((matched = str.match(/test\s+r1;/i)) != null) {
      let rt = {
        pattern: "00010101",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // and @r,@s;
    // Reference:  page 9

    if ((matched = str.match(/and\s+r2\s*,\s*r1;/i)) != null) {
      let rt = {
        pattern: "00010110",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // test @r;
    // Reference:  page 55
    // and @r,@s;
    // Reference:  page 9

    if ((matched = str.match(/and\s+r3\s*,\s*r1;/i)) != null) {
      let rt = {
        pattern: "00010111",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // test @r;
    // Reference:  page 55
    // and @r,@s;
    // Reference:  page 9

    if ((matched = str.match(/and\s+r0\s*,\s*r2;/i)) != null) {
      let rt = {
        pattern: "00011000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // test @r;
    // Reference:  page 55
    // and @r,@s;
    // Reference:  page 9

    if ((matched = str.match(/and\s+r1\s*,\s*r2;/i)) != null) {
      let rt = {
        pattern: "00011001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // test @r;
    // Reference:  page 55
    // and @r,@s;
    // Reference:  page 9

    if ((matched = str.match(/and\s+r2\s*,\s*r2;/i)) != null) {
      let rt = {
        pattern: "00011010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // test @r;
    // Reference:  page 55

    if ((matched = str.match(/test\s+r2;/i)) != null) {
      let rt = {
        pattern: "00011010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // and @r,@s;
    // Reference:  page 9

    if ((matched = str.match(/and\s+r3\s*,\s*r2;/i)) != null) {
      let rt = {
        pattern: "00011011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // test @r;
    // Reference:  page 55
    // and @r,@s;
    // Reference:  page 9

    if ((matched = str.match(/and\s+r0\s*,\s*r3;/i)) != null) {
      let rt = {
        pattern: "00011100",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // test @r;
    // Reference:  page 55
    // and @r,@s;
    // Reference:  page 9

    if ((matched = str.match(/and\s+r1\s*,\s*r3;/i)) != null) {
      let rt = {
        pattern: "00011101",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // test @r;
    // Reference:  page 55
    // and @r,@s;
    // Reference:  page 9

    if ((matched = str.match(/and\s+r2\s*,\s*r3;/i)) != null) {
      let rt = {
        pattern: "00011110",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // test @r;
    // Reference:  page 55
    // and @r,@s;
    // Reference:  page 9

    if ((matched = str.match(/and\s+r3\s*,\s*r3;/i)) != null) {
      let rt = {
        pattern: "00011111",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // test @r;
    // Reference:  page 55

    if ((matched = str.match(/test\s+r3;/i)) != null) {
      let rt = {
        pattern: "00011111",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // xor @r,@s;
    // Reference:  page 57

    if ((matched = str.match(/xor\s+r0\s*,\s*r0;/i)) != null) {
      let rt = {
        pattern: "00100000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // xor @r,@s;
    // Reference:  page 57

    if ((matched = str.match(/xor\s+r1\s*,\s*r0;/i)) != null) {
      let rt = {
        pattern: "00100001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // xor @r,@s;
    // Reference:  page 57

    if ((matched = str.match(/xor\s+r2\s*,\s*r0;/i)) != null) {
      let rt = {
        pattern: "00100010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // xor @r,@s;
    // Reference:  page 57

    if ((matched = str.match(/xor\s+r3\s*,\s*r0;/i)) != null) {
      let rt = {
        pattern: "00100011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // xor @r,@s;
    // Reference:  page 57

    if ((matched = str.match(/xor\s+r0\s*,\s*r1;/i)) != null) {
      let rt = {
        pattern: "00100100",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // xor @r,@s;
    // Reference:  page 57

    if ((matched = str.match(/xor\s+r1\s*,\s*r1;/i)) != null) {
      let rt = {
        pattern: "00100101",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // xor @r,@s;
    // Reference:  page 57

    if ((matched = str.match(/xor\s+r2\s*,\s*r1;/i)) != null) {
      let rt = {
        pattern: "00100110",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // xor @r,@s;
    // Reference:  page 57

    if ((matched = str.match(/xor\s+r3\s*,\s*r1;/i)) != null) {
      let rt = {
        pattern: "00100111",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // xor @r,@s;
    // Reference:  page 57

    if ((matched = str.match(/xor\s+r0\s*,\s*r2;/i)) != null) {
      let rt = {
        pattern: "00101000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // xor @r,@s;
    // Reference:  page 57

    if ((matched = str.match(/xor\s+r1\s*,\s*r2;/i)) != null) {
      let rt = {
        pattern: "00101001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // xor @r,@s;
    // Reference:  page 57

    if ((matched = str.match(/xor\s+r2\s*,\s*r2;/i)) != null) {
      let rt = {
        pattern: "00101010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // xor @r,@s;
    // Reference:  page 57

    if ((matched = str.match(/xor\s+r3\s*,\s*r2;/i)) != null) {
      let rt = {
        pattern: "00101011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // xor @r,@s;
    // Reference:  page 57

    if ((matched = str.match(/xor\s+r0\s*,\s*r3;/i)) != null) {
      let rt = {
        pattern: "00101100",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // xor @r,@s;
    // Reference:  page 57

    if ((matched = str.match(/xor\s+r1\s*,\s*r3;/i)) != null) {
      let rt = {
        pattern: "00101101",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // xor @r,@s;
    // Reference:  page 57

    if ((matched = str.match(/xor\s+r2\s*,\s*r3;/i)) != null) {
      let rt = {
        pattern: "00101110",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // xor @r,@s;
    // Reference:  page 57

    if ((matched = str.match(/xor\s+r3\s*,\s*r3;/i)) != null) {
      let rt = {
        pattern: "00101111",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // inv @r;
    // Reference:  page 22

    if ((matched = str.match(/inv\s+r0;/i)) != null) {
      let rt = {
        pattern: "00110000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // or @r,@s;
    // Reference:  page 40

    if ((matched = str.match(/or\s+r0\s*,\s*r0;/i)) != null) {
      let rt = {
        pattern: "00110000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // inv @r;
    // Reference:  page 22
    // or @r,@s;
    // Reference:  page 40

    if ((matched = str.match(/or\s+r1\s*,\s*r0;/i)) != null) {
      let rt = {
        pattern: "00110001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // inv @r;
    // Reference:  page 22
    // or @r,@s;
    // Reference:  page 40

    if ((matched = str.match(/or\s+r2\s*,\s*r0;/i)) != null) {
      let rt = {
        pattern: "00110010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // inv @r;
    // Reference:  page 22
    // or @r,@s;
    // Reference:  page 40

    if ((matched = str.match(/or\s+r3\s*,\s*r0;/i)) != null) {
      let rt = {
        pattern: "00110011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // inv @r;
    // Reference:  page 22
    // or @r,@s;
    // Reference:  page 40

    if ((matched = str.match(/or\s+r0\s*,\s*r1;/i)) != null) {
      let rt = {
        pattern: "00110100",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // inv @r;
    // Reference:  page 22

    if ((matched = str.match(/inv\s+r1;/i)) != null) {
      let rt = {
        pattern: "00110101",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // or @r,@s;
    // Reference:  page 40

    if ((matched = str.match(/or\s+r1\s*,\s*r1;/i)) != null) {
      let rt = {
        pattern: "00110101",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // inv @r;
    // Reference:  page 22
    // or @r,@s;
    // Reference:  page 40

    if ((matched = str.match(/or\s+r2\s*,\s*r1;/i)) != null) {
      let rt = {
        pattern: "00110110",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // inv @r;
    // Reference:  page 22
    // or @r,@s;
    // Reference:  page 40

    if ((matched = str.match(/or\s+r3\s*,\s*r1;/i)) != null) {
      let rt = {
        pattern: "00110111",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // inv @r;
    // Reference:  page 22
    // or @r,@s;
    // Reference:  page 40

    if ((matched = str.match(/or\s+r0\s*,\s*r2;/i)) != null) {
      let rt = {
        pattern: "00111000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // inv @r;
    // Reference:  page 22
    // or @r,@s;
    // Reference:  page 40

    if ((matched = str.match(/or\s+r1\s*,\s*r2;/i)) != null) {
      let rt = {
        pattern: "00111001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // inv @r;
    // Reference:  page 22

    if ((matched = str.match(/inv\s+r2;/i)) != null) {
      let rt = {
        pattern: "00111010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // or @r,@s;
    // Reference:  page 40

    if ((matched = str.match(/or\s+r2\s*,\s*r2;/i)) != null) {
      let rt = {
        pattern: "00111010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // inv @r;
    // Reference:  page 22
    // or @r,@s;
    // Reference:  page 40

    if ((matched = str.match(/or\s+r3\s*,\s*r2;/i)) != null) {
      let rt = {
        pattern: "00111011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // inv @r;
    // Reference:  page 22
    // or @r,@s;
    // Reference:  page 40

    if ((matched = str.match(/or\s+r0\s*,\s*r3;/i)) != null) {
      let rt = {
        pattern: "00111100",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // inv @r;
    // Reference:  page 22
    // or @r,@s;
    // Reference:  page 40

    if ((matched = str.match(/or\s+r1\s*,\s*r3;/i)) != null) {
      let rt = {
        pattern: "00111101",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // inv @r;
    // Reference:  page 22
    // or @r,@s;
    // Reference:  page 40

    if ((matched = str.match(/or\s+r2\s*,\s*r3;/i)) != null) {
      let rt = {
        pattern: "00111110",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // inv @r;
    // Reference:  page 22

    if ((matched = str.match(/inv\s+r3;/i)) != null) {
      let rt = {
        pattern: "00111111",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // or @r,@s;
    // Reference:  page 40

    if ((matched = str.match(/or\s+r3\s*,\s*r3;/i)) != null) {
      let rt = {
        pattern: "00111111",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // add @r,@s;
    // Reference:  page 5

    if ((matched = str.match(/add\s+r0\s*,\s*r0;/i)) != null) {
      let rt = {
        pattern: "01000000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // add @r,@s;
    // Reference:  page 5

    if ((matched = str.match(/add\s+r1\s*,\s*r0;/i)) != null) {
      let rt = {
        pattern: "01000001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // add @r,@s;
    // Reference:  page 5

    if ((matched = str.match(/add\s+r2\s*,\s*r0;/i)) != null) {
      let rt = {
        pattern: "01000010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // add @r,@s;
    // Reference:  page 5

    if ((matched = str.match(/add\s+r3\s*,\s*r0;/i)) != null) {
      let rt = {
        pattern: "01000011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // add @r,@s;
    // Reference:  page 5

    if ((matched = str.match(/add\s+r0\s*,\s*r1;/i)) != null) {
      let rt = {
        pattern: "01000100",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // add @r,@s;
    // Reference:  page 5

    if ((matched = str.match(/add\s+r1\s*,\s*r1;/i)) != null) {
      let rt = {
        pattern: "01000101",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // add @r,@s;
    // Reference:  page 5

    if ((matched = str.match(/add\s+r2\s*,\s*r1;/i)) != null) {
      let rt = {
        pattern: "01000110",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // add @r,@s;
    // Reference:  page 5

    if ((matched = str.match(/add\s+r3\s*,\s*r1;/i)) != null) {
      let rt = {
        pattern: "01000111",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // add @r,@s;
    // Reference:  page 5

    if ((matched = str.match(/add\s+r0\s*,\s*r2;/i)) != null) {
      let rt = {
        pattern: "01001000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // add @r,@s;
    // Reference:  page 5

    if ((matched = str.match(/add\s+r1\s*,\s*r2;/i)) != null) {
      let rt = {
        pattern: "01001001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // add @r,@s;
    // Reference:  page 5

    if ((matched = str.match(/add\s+r2\s*,\s*r2;/i)) != null) {
      let rt = {
        pattern: "01001010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // add @r,@s;
    // Reference:  page 5

    if ((matched = str.match(/add\s+r3\s*,\s*r2;/i)) != null) {
      let rt = {
        pattern: "01001011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // add @r,@s;
    // Reference:  page 5

    if ((matched = str.match(/add\s+r0\s*,\s*r3;/i)) != null) {
      let rt = {
        pattern: "01001100",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // add @r,@s;
    // Reference:  page 5

    if ((matched = str.match(/add\s+r1\s*,\s*r3;/i)) != null) {
      let rt = {
        pattern: "01001101",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // add @r,@s;
    // Reference:  page 5

    if ((matched = str.match(/add\s+r2\s*,\s*r3;/i)) != null) {
      let rt = {
        pattern: "01001110",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // add @r,@s;
    // Reference:  page 5

    if ((matched = str.match(/add\s+r3\s*,\s*r3;/i)) != null) {
      let rt = {
        pattern: "01001111",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // addq @r,#@q;
    // Reference:  page 7

    if ((matched = str.match(/addq\s+r0\s*,\s*#2;/i)) != null) {
      let rt = {
        pattern: "01010000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // addq @r,#@q;
    // Reference:  page 7

    if ((matched = str.match(/addq\s+r1\s*,\s*#2;/i)) != null) {
      let rt = {
        pattern: "01010001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // addq @r,#@q;
    // Reference:  page 7

    if ((matched = str.match(/addq\s+r2\s*,\s*#2;/i)) != null) {
      let rt = {
        pattern: "01010010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // addq @r,#@q;
    // Reference:  page 7

    if ((matched = str.match(/addq\s+r3\s*,\s*#2;/i)) != null) {
      let rt = {
        pattern: "01010011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // addq @r,#@q;
    // Reference:  page 7

    if ((matched = str.match(/addq\s+r0\s*,\s*#1;/i)) != null) {
      let rt = {
        pattern: "01010100",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // addq @r,#@q;
    // Reference:  page 7

    if ((matched = str.match(/addq\s+r1\s*,\s*#1;/i)) != null) {
      let rt = {
        pattern: "01010101",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // addq @r,#@q;
    // Reference:  page 7

    if ((matched = str.match(/addq\s+r2\s*,\s*#1;/i)) != null) {
      let rt = {
        pattern: "01010110",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // addq @r,#@q;
    // Reference:  page 7

    if ((matched = str.match(/addq\s+r3\s*,\s*#1;/i)) != null) {
      let rt = {
        pattern: "01010111",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // addq @r,#@q;
    // Reference:  page 7

    if ((matched = str.match(/addq\s+r0\s*,\s*#-2;/i)) != null) {
      let rt = {
        pattern: "01011000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // addq @r,#@q;
    // Reference:  page 7

    if ((matched = str.match(/addq\s+r1\s*,\s*#-2;/i)) != null) {
      let rt = {
        pattern: "01011001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // addq @r,#@q;
    // Reference:  page 7

    if ((matched = str.match(/addq\s+r2\s*,\s*#-2;/i)) != null) {
      let rt = {
        pattern: "01011010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // addq @r,#@q;
    // Reference:  page 7

    if ((matched = str.match(/addq\s+r3\s*,\s*#-2;/i)) != null) {
      let rt = {
        pattern: "01011011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // addq @r,#@q;
    // Reference:  page 7

    if ((matched = str.match(/addq\s+r0\s*,\s*#-1;/i)) != null) {
      let rt = {
        pattern: "01011100",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // addq @r,#@q;
    // Reference:  page 7

    if ((matched = str.match(/addq\s+r1\s*,\s*#-1;/i)) != null) {
      let rt = {
        pattern: "01011101",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // addq @r,#@q;
    // Reference:  page 7

    if ((matched = str.match(/addq\s+r2\s*,\s*#-1;/i)) != null) {
      let rt = {
        pattern: "01011110",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // addq @r,#@q;
    // Reference:  page 7

    if ((matched = str.match(/addq\s+r3\s*,\s*#-1;/i)) != null) {
      let rt = {
        pattern: "01011111",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // neg @r;
    // Reference:  page 37

    if ((matched = str.match(/neg\s+r0;/i)) != null) {
      let rt = {
        pattern: "01100000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // sub @r,@s;
    // Reference:  page 52

    if ((matched = str.match(/sub\s+r0\s*,\s*r0;/i)) != null) {
      let rt = {
        pattern: "01100000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // neg @r;
    // Reference:  page 37
    // sub @r,@s;
    // Reference:  page 52

    if ((matched = str.match(/sub\s+r1\s*,\s*r0;/i)) != null) {
      let rt = {
        pattern: "01100001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // neg @r;
    // Reference:  page 37
    // sub @r,@s;
    // Reference:  page 52

    if ((matched = str.match(/sub\s+r2\s*,\s*r0;/i)) != null) {
      let rt = {
        pattern: "01100010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // neg @r;
    // Reference:  page 37
    // sub @r,@s;
    // Reference:  page 52

    if ((matched = str.match(/sub\s+r3\s*,\s*r0;/i)) != null) {
      let rt = {
        pattern: "01100011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // neg @r;
    // Reference:  page 37
    // sub @r,@s;
    // Reference:  page 52

    if ((matched = str.match(/sub\s+r0\s*,\s*r1;/i)) != null) {
      let rt = {
        pattern: "01100100",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // neg @r;
    // Reference:  page 37

    if ((matched = str.match(/neg\s+r1;/i)) != null) {
      let rt = {
        pattern: "01100101",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // sub @r,@s;
    // Reference:  page 52

    if ((matched = str.match(/sub\s+r1\s*,\s*r1;/i)) != null) {
      let rt = {
        pattern: "01100101",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // neg @r;
    // Reference:  page 37
    // sub @r,@s;
    // Reference:  page 52

    if ((matched = str.match(/sub\s+r2\s*,\s*r1;/i)) != null) {
      let rt = {
        pattern: "01100110",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // neg @r;
    // Reference:  page 37
    // sub @r,@s;
    // Reference:  page 52

    if ((matched = str.match(/sub\s+r3\s*,\s*r1;/i)) != null) {
      let rt = {
        pattern: "01100111",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // neg @r;
    // Reference:  page 37
    // sub @r,@s;
    // Reference:  page 52

    if ((matched = str.match(/sub\s+r0\s*,\s*r2;/i)) != null) {
      let rt = {
        pattern: "01101000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // neg @r;
    // Reference:  page 37
    // sub @r,@s;
    // Reference:  page 52

    if ((matched = str.match(/sub\s+r1\s*,\s*r2;/i)) != null) {
      let rt = {
        pattern: "01101001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // neg @r;
    // Reference:  page 37

    if ((matched = str.match(/neg\s+r2;/i)) != null) {
      let rt = {
        pattern: "01101010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // sub @r,@s;
    // Reference:  page 52

    if ((matched = str.match(/sub\s+r2\s*,\s*r2;/i)) != null) {
      let rt = {
        pattern: "01101010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // neg @r;
    // Reference:  page 37
    // sub @r,@s;
    // Reference:  page 52

    if ((matched = str.match(/sub\s+r3\s*,\s*r2;/i)) != null) {
      let rt = {
        pattern: "01101011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // neg @r;
    // Reference:  page 37
    // sub @r,@s;
    // Reference:  page 52

    if ((matched = str.match(/sub\s+r0\s*,\s*r3;/i)) != null) {
      let rt = {
        pattern: "01101100",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // neg @r;
    // Reference:  page 37
    // sub @r,@s;
    // Reference:  page 52

    if ((matched = str.match(/sub\s+r1\s*,\s*r3;/i)) != null) {
      let rt = {
        pattern: "01101101",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // neg @r;
    // Reference:  page 37
    // sub @r,@s;
    // Reference:  page 52

    if ((matched = str.match(/sub\s+r2\s*,\s*r3;/i)) != null) {
      let rt = {
        pattern: "01101110",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // neg @r;
    // Reference:  page 37

    if ((matched = str.match(/neg\s+r3;/i)) != null) {
      let rt = {
        pattern: "01101111",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // sub @r,@s;
    // Reference:  page 52

    if ((matched = str.match(/sub\s+r3\s*,\s*r3;/i)) != null) {
      let rt = {
        pattern: "01101111",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // abs @r;
    // Reference:  page 4

    if ((matched = str.match(/abs\s+r0;/i)) != null) {
      let rt = {
        pattern: "01110000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // cmp @r,@s;
    // Reference:  page 19

    if ((matched = str.match(/cmp\s+r0\s*,\s*r0;/i)) != null) {
      let rt = {
        pattern: "01110000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // abs @r;
    // Reference:  page 4
    // cmp @r,@s;
    // Reference:  page 19

    if ((matched = str.match(/cmp\s+r1\s*,\s*r0;/i)) != null) {
      let rt = {
        pattern: "01110001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // abs @r;
    // Reference:  page 4
    // cmp @r,@s;
    // Reference:  page 19

    if ((matched = str.match(/cmp\s+r2\s*,\s*r0;/i)) != null) {
      let rt = {
        pattern: "01110010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // abs @r;
    // Reference:  page 4
    // cmp @r,@s;
    // Reference:  page 19

    if ((matched = str.match(/cmp\s+r3\s*,\s*r0;/i)) != null) {
      let rt = {
        pattern: "01110011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // abs @r;
    // Reference:  page 4
    // cmp @r,@s;
    // Reference:  page 19

    if ((matched = str.match(/cmp\s+r0\s*,\s*r1;/i)) != null) {
      let rt = {
        pattern: "01110100",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // abs @r;
    // Reference:  page 4

    if ((matched = str.match(/abs\s+r1;/i)) != null) {
      let rt = {
        pattern: "01110101",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // cmp @r,@s;
    // Reference:  page 19

    if ((matched = str.match(/cmp\s+r1\s*,\s*r1;/i)) != null) {
      let rt = {
        pattern: "01110101",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // abs @r;
    // Reference:  page 4
    // cmp @r,@s;
    // Reference:  page 19

    if ((matched = str.match(/cmp\s+r2\s*,\s*r1;/i)) != null) {
      let rt = {
        pattern: "01110110",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // abs @r;
    // Reference:  page 4
    // cmp @r,@s;
    // Reference:  page 19

    if ((matched = str.match(/cmp\s+r3\s*,\s*r1;/i)) != null) {
      let rt = {
        pattern: "01110111",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // abs @r;
    // Reference:  page 4
    // cmp @r,@s;
    // Reference:  page 19

    if ((matched = str.match(/cmp\s+r0\s*,\s*r2;/i)) != null) {
      let rt = {
        pattern: "01111000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // abs @r;
    // Reference:  page 4
    // cmp @r,@s;
    // Reference:  page 19

    if ((matched = str.match(/cmp\s+r1\s*,\s*r2;/i)) != null) {
      let rt = {
        pattern: "01111001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // abs @r;
    // Reference:  page 4

    if ((matched = str.match(/abs\s+r2;/i)) != null) {
      let rt = {
        pattern: "01111010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // cmp @r,@s;
    // Reference:  page 19

    if ((matched = str.match(/cmp\s+r2\s*,\s*r2;/i)) != null) {
      let rt = {
        pattern: "01111010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // abs @r;
    // Reference:  page 4
    // cmp @r,@s;
    // Reference:  page 19

    if ((matched = str.match(/cmp\s+r3\s*,\s*r2;/i)) != null) {
      let rt = {
        pattern: "01111011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // abs @r;
    // Reference:  page 4
    // cmp @r,@s;
    // Reference:  page 19

    if ((matched = str.match(/cmp\s+r0\s*,\s*r3;/i)) != null) {
      let rt = {
        pattern: "01111100",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // abs @r;
    // Reference:  page 4
    // cmp @r,@s;
    // Reference:  page 19

    if ((matched = str.match(/cmp\s+r1\s*,\s*r3;/i)) != null) {
      let rt = {
        pattern: "01111101",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // abs @r;
    // Reference:  page 4
    // cmp @r,@s;
    // Reference:  page 19

    if ((matched = str.match(/cmp\s+r2\s*,\s*r3;/i)) != null) {
      let rt = {
        pattern: "01111110",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // abs @r;
    // Reference:  page 4

    if ((matched = str.match(/abs\s+r3;/i)) != null) {
      let rt = {
        pattern: "01111111",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // cmp @r,@s;
    // Reference:  page 19

    if ((matched = str.match(/cmp\s+r3\s*,\s*r3;/i)) != null) {
      let rt = {
        pattern: "01111111",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // ld.w @r,(@s);
    // Reference:  page 28

    if ((matched = str.match(/ld.w\s\s*\+\s*r0\s*\s*,\s*\s*\s*\\s*\(\s*\s*r2\s*\\s*\)\s*\s*;/i)) != null) {
      let rt = {
        pattern: "10000000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // ld.w @r,(@s);
    // Reference:  page 28

    if ((matched = str.match(/ld.w\s\s*\+\s*r1\s*\s*,\s*\s*\s*\\s*\(\s*\s*r2\s*\\s*\)\s*\s*;/i)) != null) {
      let rt = {
        pattern: "10000001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // ld.w @r,(@s);
    // Reference:  page 28

    if ((matched = str.match(/ld.w\s\s*\+\s*r0\s*\s*,\s*\s*\s*\\s*\(\s*\s*r3\s*\\s*\)\s*\s*;/i)) != null) {
      let rt = {
        pattern: "10000010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // ld.w @r,(@s);
    // Reference:  page 28

    if ((matched = str.match(/ld.w\s\s*\+\s*r1\s*\s*,\s*\s*\s*\\s*\(\s*\s*r3\s*\\s*\)\s*\s*;/i)) != null) {
      let rt = {
        pattern: "10000011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // ld.b @r,(@s);
    // Reference:  page 28

    if ((matched = str.match(/ld.b\s\s*\+\s*r0\s*\s*,\s*\s*\s*\\s*\(\s*\s*r2\s*\\s*\)\s*\s*;/i)) != null) {
      let rt = {
        pattern: "10000100",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // ld.b @r,(@s);
    // Reference:  page 28

    if ((matched = str.match(/ld.b\s\s*\+\s*r1\s*\s*,\s*\s*\s*\\s*\(\s*\s*r2\s*\\s*\)\s*\s*;/i)) != null) {
      let rt = {
        pattern: "10000101",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // ld.b @r,(@s);
    // Reference:  page 28

    if ((matched = str.match(/ld.b\s\s*\+\s*r0\s*\s*,\s*\s*\s*\\s*\(\s*\s*r3\s*\\s*\)\s*\s*;/i)) != null) {
      let rt = {
        pattern: "10000110",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // ld.b @r,(@s);
    // Reference:  page 28

    if ((matched = str.match(/ld.b\s\s*\+\s*r1\s*\s*,\s*\s*\s*\\s*\(\s*\s*r3\s*\\s*\)\s*\s*;/i)) != null) {
      let rt = {
        pattern: "10000111",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // st.w (@s),@r;
    // Reference:  page 28

    if ((matched = str.match(/st.w\s\s*\+\s*\s*\\s*\(\s*\s*r2\s*\\s*\)\s*\s*\s*\s*,\s*\s*r0;/i)) != null) {
      let rt = {
        pattern: "10001000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // st.w (@s),@r;
    // Reference:  page 28

    if ((matched = str.match(/st.w\s\s*\+\s*\s*\\s*\(\s*\s*r2\s*\\s*\)\s*\s*\s*\s*,\s*\s*r1;/i)) != null) {
      let rt = {
        pattern: "10001001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // st.w (@s),@r;
    // Reference:  page 28

    if ((matched = str.match(/st.w\s\s*\+\s*\s*\\s*\(\s*\s*r3\s*\\s*\)\s*\s*\s*\s*,\s*\s*r0;/i)) != null) {
      let rt = {
        pattern: "10001010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // st.w (@s),@r;
    // Reference:  page 28

    if ((matched = str.match(/st.w\s\s*\+\s*\s*\\s*\(\s*\s*r3\s*\\s*\)\s*\s*\s*\s*,\s*\s*r1;/i)) != null) {
      let rt = {
        pattern: "10001011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // st.b (@s),@r;
    // Reference:  page 28

    if ((matched = str.match(/st.b\s\s*\+\s*\s*\\s*\(\s*\s*r2\s*\\s*\)\s*\s*\s*\s*,\s*\s*r0;/i)) != null) {
      let rt = {
        pattern: "10001100",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // st.b (@s),@r;
    // Reference:  page 28

    if ((matched = str.match(/st.b\s\s*\+\s*\s*\\s*\(\s*\s*r2\s*\\s*\)\s*\s*\s*\s*,\s*\s*r1;/i)) != null) {
      let rt = {
        pattern: "10001101",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // st.b (@s),@r;
    // Reference:  page 28

    if ((matched = str.match(/st.b\s\s*\+\s*\s*\\s*\(\s*\s*r3\s*\\s*\)\s*\s*\s*\s*,\s*\s*r0;/i)) != null) {
      let rt = {
        pattern: "10001110",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // st.b (@s),@r;
    // Reference:  page 28

    if ((matched = str.match(/st.b\s\s*\+\s*\s*\\s*\(\s*\s*r3\s*\\s*\)\s*\s*\s*\s*,\s*\s*r1;/i)) != null) {
      let rt = {
        pattern: "10001111",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // ld.w @s,(@r++);
    // Reference:  page 29

    if ((matched = str.match(/ld.w\s\s*\\s*\+\s*\s*r0\s*\s*\s*,\s*\s*\s*\s*\\s*\\s*\(\s*\s*\s*r2\s*\\s*\\s*\+\s*\s*\s*\s*\\s*\\s*\+\s*\s*\s*\s*\\s*\\s*\)\s*\s*\s*;/i)) != null) {
      let rt = {
        pattern: "10010000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // ld.w @s,(@r++);
    // Reference:  page 29

    if ((matched = str.match(/ld.w\s\s*\\s*\+\s*\s*r1\s*\s*\s*,\s*\s*\s*\s*\\s*\\s*\(\s*\s*\s*r2\s*\\s*\\s*\+\s*\s*\s*\s*\\s*\\s*\+\s*\s*\s*\s*\\s*\\s*\)\s*\s*\s*;/i)) != null) {
      let rt = {
        pattern: "10010001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // ld.w @s,(@r++);
    // Reference:  page 29

    if ((matched = str.match(/ld.w\s\s*\\s*\+\s*\s*r0\s*\s*\s*,\s*\s*\s*\s*\\s*\\s*\(\s*\s*\s*r3\s*\\s*\\s*\+\s*\s*\s*\s*\\s*\\s*\+\s*\s*\s*\s*\\s*\\s*\)\s*\s*\s*;/i)) != null) {
      let rt = {
        pattern: "10010010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // ld.w @s,(@r++);
    // Reference:  page 29

    if ((matched = str.match(/ld.w\s\s*\\s*\+\s*\s*r1\s*\s*\s*,\s*\s*\s*\s*\\s*\\s*\(\s*\s*\s*r3\s*\\s*\\s*\+\s*\s*\s*\s*\\s*\\s*\+\s*\s*\s*\s*\\s*\\s*\)\s*\s*\s*;/i)) != null) {
      let rt = {
        pattern: "10010011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // ld.b @s,(@r++);
    // Reference:  page 29

    if ((matched = str.match(/ld.b\s\s*\\s*\+\s*\s*r0\s*\s*\s*,\s*\s*\s*\s*\\s*\\s*\(\s*\s*\s*r2\s*\\s*\\s*\+\s*\s*\s*\s*\\s*\\s*\+\s*\s*\s*\s*\\s*\\s*\)\s*\s*\s*;/i)) != null) {
      let rt = {
        pattern: "10010100",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // ld.b @s,(@r++);
    // Reference:  page 29

    if ((matched = str.match(/ld.b\s\s*\\s*\+\s*\s*r1\s*\s*\s*,\s*\s*\s*\s*\\s*\\s*\(\s*\s*\s*r2\s*\\s*\\s*\+\s*\s*\s*\s*\\s*\\s*\+\s*\s*\s*\s*\\s*\\s*\)\s*\s*\s*;/i)) != null) {
      let rt = {
        pattern: "10010101",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // ld.b @s,(@r++);
    // Reference:  page 29

    if ((matched = str.match(/ld.b\s\s*\\s*\+\s*\s*r0\s*\s*\s*,\s*\s*\s*\s*\\s*\\s*\(\s*\s*\s*r3\s*\\s*\\s*\+\s*\s*\s*\s*\\s*\\s*\+\s*\s*\s*\s*\\s*\\s*\)\s*\s*\s*;/i)) != null) {
      let rt = {
        pattern: "10010110",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // ld.b @s,(@r++);
    // Reference:  page 29

    if ((matched = str.match(/ld.b\s\s*\\s*\+\s*\s*r1\s*\s*\s*,\s*\s*\s*\s*\\s*\\s*\(\s*\s*\s*r3\s*\\s*\\s*\+\s*\s*\s*\s*\\s*\\s*\+\s*\s*\s*\s*\\s*\\s*\)\s*\s*\s*;/i)) != null) {
      let rt = {
        pattern: "10010111",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // st.w (@r++),@s;
    // Reference:  page 29

    if ((matched = str.match(/st.w\s\s*\\s*\+\s*\s*\s*\\s*\\s*\(\s*\s*\s*r2\s*\\s*\\s*\+\s*\s*\s*\s*\\s*\\s*\+\s*\s*\s*\s*\\s*\\s*\)\s*\s*\s*\s*\s*\s*,\s*\s*\s*r0;/i)) != null) {
      let rt = {
        pattern: "10011000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // st.w (@r++),@s;
    // Reference:  page 29

    if ((matched = str.match(/st.w\s\s*\\s*\+\s*\s*\s*\\s*\\s*\(\s*\s*\s*r2\s*\\s*\\s*\+\s*\s*\s*\s*\\s*\\s*\+\s*\s*\s*\s*\\s*\\s*\)\s*\s*\s*\s*\s*\s*,\s*\s*\s*r1;/i)) != null) {
      let rt = {
        pattern: "10011001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // st.w (@r++),@s;
    // Reference:  page 29

    if ((matched = str.match(/st.w\s\s*\\s*\+\s*\s*\s*\\s*\\s*\(\s*\s*\s*r3\s*\\s*\\s*\+\s*\s*\s*\s*\\s*\\s*\+\s*\s*\s*\s*\\s*\\s*\)\s*\s*\s*\s*\s*\s*,\s*\s*\s*r0;/i)) != null) {
      let rt = {
        pattern: "10011010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // st.w (@r++),@s;
    // Reference:  page 29

    if ((matched = str.match(/st.w\s\s*\\s*\+\s*\s*\s*\\s*\\s*\(\s*\s*\s*r3\s*\\s*\\s*\+\s*\s*\s*\s*\\s*\\s*\+\s*\s*\s*\s*\\s*\\s*\)\s*\s*\s*\s*\s*\s*,\s*\s*\s*r1;/i)) != null) {
      let rt = {
        pattern: "10011011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // st.b (@r++),@s;
    // Reference:  page 29

    if ((matched = str.match(/st.b\s\s*\\s*\+\s*\s*\s*\\s*\\s*\(\s*\s*\s*r2\s*\\s*\\s*\+\s*\s*\s*\s*\\s*\\s*\+\s*\s*\s*\s*\\s*\\s*\)\s*\s*\s*\s*\s*\s*,\s*\s*\s*r0;/i)) != null) {
      let rt = {
        pattern: "10011100",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // st.b (@r++),@s;
    // Reference:  page 29

    if ((matched = str.match(/st.b\s\s*\\s*\+\s*\s*\s*\\s*\\s*\(\s*\s*\s*r2\s*\\s*\\s*\+\s*\s*\s*\s*\\s*\\s*\+\s*\s*\s*\s*\\s*\\s*\)\s*\s*\s*\s*\s*\s*,\s*\s*\s*r1;/i)) != null) {
      let rt = {
        pattern: "10011101",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // st.b (@r++),@s;
    // Reference:  page 29

    if ((matched = str.match(/st.b\s\s*\\s*\+\s*\s*\s*\\s*\\s*\(\s*\s*\s*r3\s*\\s*\\s*\+\s*\s*\s*\s*\\s*\\s*\+\s*\s*\s*\s*\\s*\\s*\)\s*\s*\s*\s*\s*\s*,\s*\s*\s*r0;/i)) != null) {
      let rt = {
        pattern: "10011110",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // st.b (@r++),@s;
    // Reference:  page 29

    if ((matched = str.match(/st.b\s\s*\\s*\+\s*\s*\s*\\s*\\s*\(\s*\s*\s*r3\s*\\s*\\s*\+\s*\s*\s*\s*\\s*\\s*\+\s*\s*\s*\s*\\s*\\s*\)\s*\s*\s*\s*\s*\s*,\s*\s*\s*r1;/i)) != null) {
      let rt = {
        pattern: "10011111",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // ld.w @r, (SP,@n);
    // Reference:  page 30

    if ((matched = str.match(/ld.w\s\s*\\s*\+\s*\s*r0\s*\s*\s*,\s*\s*\s*\s\s*\\s*\+\s*\s*\s*\\s*\\s*\(\s*\s*\s*SP\s*\s*\s*,\s*\s*\s*\s*\\s*\(\s*\s*\w\s*\\s*\+\s*\s*\s*\\s*\)\s*\s*\s*\\s*\\s*\)\s*\s*\s*;/i)) != null) {
      let rt = {
        pattern: "10100000nnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin8(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
      ]
      return rt;
    }

    // ld.w @r, (SP,@n);
    // Reference:  page 30

    if ((matched = str.match(/ld.w\s\s*\\s*\+\s*\s*r1\s*\s*\s*,\s*\s*\s*\s\s*\\s*\+\s*\s*\s*\\s*\\s*\(\s*\s*\s*SP\s*\s*\s*,\s*\s*\s*\s*\\s*\(\s*\s*\w\s*\\s*\+\s*\s*\s*\\s*\)\s*\s*\s*\\s*\\s*\)\s*\s*\s*;/i)) != null) {
      let rt = {
        pattern: "10100001nnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin8(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
      ]
      return rt;
    }

    // ld.w @r, (SP,@n);
    // Reference:  page 30

    if ((matched = str.match(/ld.w\s\s*\\s*\+\s*\s*r2\s*\s*\s*,\s*\s*\s*\s\s*\\s*\+\s*\s*\s*\\s*\\s*\(\s*\s*\s*SP\s*\s*\s*,\s*\s*\s*\s*\\s*\(\s*\s*\w\s*\\s*\+\s*\s*\s*\\s*\)\s*\s*\s*\\s*\\s*\)\s*\s*\s*;/i)) != null) {
      let rt = {
        pattern: "10100010nnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin8(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
      ]
      return rt;
    }

    // ld.w @r, (SP,@n);
    // Reference:  page 30

    if ((matched = str.match(/ld.w\s\s*\\s*\+\s*\s*r3\s*\s*\s*,\s*\s*\s*\s\s*\\s*\+\s*\s*\s*\\s*\\s*\(\s*\s*\s*SP\s*\s*\s*,\s*\s*\s*\s*\\s*\(\s*\s*\w\s*\\s*\+\s*\s*\s*\\s*\)\s*\s*\s*\\s*\\s*\)\s*\s*\s*;/i)) != null) {
      let rt = {
        pattern: "10100011nnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin8(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
      ]
      return rt;
    }

    // ld.b @r, (SP,@n);
    // Reference:  page 30

    if ((matched = str.match(/ld.b\s\s*\\s*\+\s*\s*r0\s*\s*\s*,\s*\s*\s*\s\s*\\s*\+\s*\s*\s*\\s*\\s*\(\s*\s*\s*SP\s*\s*\s*,\s*\s*\s*\s*\\s*\(\s*\s*\w\s*\\s*\+\s*\s*\s*\\s*\)\s*\s*\s*\\s*\\s*\)\s*\s*\s*;/i)) != null) {
      let rt = {
        pattern: "10100100nnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin8(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
      ]
      return rt;
    }

    // ld.b @r, (SP,@n);
    // Reference:  page 30

    if ((matched = str.match(/ld.b\s\s*\\s*\+\s*\s*r1\s*\s*\s*,\s*\s*\s*\s\s*\\s*\+\s*\s*\s*\\s*\\s*\(\s*\s*\s*SP\s*\s*\s*,\s*\s*\s*\s*\\s*\(\s*\s*\w\s*\\s*\+\s*\s*\s*\\s*\)\s*\s*\s*\\s*\\s*\)\s*\s*\s*;/i)) != null) {
      let rt = {
        pattern: "10100101nnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin8(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
      ]
      return rt;
    }

    // ld.b @r, (SP,@n);
    // Reference:  page 30

    if ((matched = str.match(/ld.b\s\s*\\s*\+\s*\s*r2\s*\s*\s*,\s*\s*\s*\s\s*\\s*\+\s*\s*\s*\\s*\\s*\(\s*\s*\s*SP\s*\s*\s*,\s*\s*\s*\s*\\s*\(\s*\s*\w\s*\\s*\+\s*\s*\s*\\s*\)\s*\s*\s*\\s*\\s*\)\s*\s*\s*;/i)) != null) {
      let rt = {
        pattern: "10100110nnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin8(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
      ]
      return rt;
    }

    // ld.b @r, (SP,@n);
    // Reference:  page 30

    if ((matched = str.match(/ld.b\s\s*\\s*\+\s*\s*r3\s*\s*\s*,\s*\s*\s*\s\s*\\s*\+\s*\s*\s*\\s*\\s*\(\s*\s*\s*SP\s*\s*\s*,\s*\s*\s*\s*\\s*\(\s*\s*\w\s*\\s*\+\s*\s*\s*\\s*\)\s*\s*\s*\\s*\\s*\)\s*\s*\s*;/i)) != null) {
      let rt = {
        pattern: "10100111nnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin8(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
      ]
      return rt;
    }

    // st.w (SP,@n), @r;
    // Reference:  page 30

    if ((matched = str.match(/st.w\s\s*\\s*\+\s*\s*\s*\\s*\\s*\(\s*\s*\s*SP\s*\s*\s*,\s*\s*\s*\s*\\s*\(\s*\s*\w\s*\\s*\+\s*\s*\s*\\s*\)\s*\s*\s*\\s*\\s*\)\s*\s*\s*\s*\s*\s*,\s*\s*\s*\s\s*\\s*\+\s*\s*r0;/i)) != null) {
      let rt = {
        pattern: "10101000nnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin8(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
      ]
      return rt;
    }

    // st.w (SP,@n), @r;
    // Reference:  page 30

    if ((matched = str.match(/st.w\s\s*\\s*\+\s*\s*\s*\\s*\\s*\(\s*\s*\s*SP\s*\s*\s*,\s*\s*\s*\s*\\s*\(\s*\s*\w\s*\\s*\+\s*\s*\s*\\s*\)\s*\s*\s*\\s*\\s*\)\s*\s*\s*\s*\s*\s*,\s*\s*\s*\s\s*\\s*\+\s*\s*r1;/i)) != null) {
      let rt = {
        pattern: "10101001nnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin8(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
      ]
      return rt;
    }

    // st.w (SP,@n), @r;
    // Reference:  page 30

    if ((matched = str.match(/st.w\s\s*\\s*\+\s*\s*\s*\\s*\\s*\(\s*\s*\s*SP\s*\s*\s*,\s*\s*\s*\s*\\s*\(\s*\s*\w\s*\\s*\+\s*\s*\s*\\s*\)\s*\s*\s*\\s*\\s*\)\s*\s*\s*\s*\s*\s*,\s*\s*\s*\s\s*\\s*\+\s*\s*r2;/i)) != null) {
      let rt = {
        pattern: "10101010nnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin8(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
      ]
      return rt;
    }

    // st.w (SP,@n), @r;
    // Reference:  page 30

    if ((matched = str.match(/st.w\s\s*\\s*\+\s*\s*\s*\\s*\\s*\(\s*\s*\s*SP\s*\s*\s*,\s*\s*\s*\s*\\s*\(\s*\s*\w\s*\\s*\+\s*\s*\s*\\s*\)\s*\s*\s*\\s*\\s*\)\s*\s*\s*\s*\s*\s*,\s*\s*\s*\s\s*\\s*\+\s*\s*r3;/i)) != null) {
      let rt = {
        pattern: "10101011nnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin8(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
      ]
      return rt;
    }

    // st.b (SP,@n), @r;
    // Reference:  page 30

    if ((matched = str.match(/st.b\s\s*\\s*\+\s*\s*\s*\\s*\\s*\(\s*\s*\s*SP\s*\s*\s*,\s*\s*\s*\s*\\s*\(\s*\s*\w\s*\\s*\+\s*\s*\s*\\s*\)\s*\s*\s*\\s*\\s*\)\s*\s*\s*\s*\s*\s*,\s*\s*\s*\s\s*\\s*\+\s*\s*r0;/i)) != null) {
      let rt = {
        pattern: "10101100nnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin8(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
      ]
      return rt;
    }

    // st.b (SP,@n), @r;
    // Reference:  page 30

    if ((matched = str.match(/st.b\s\s*\\s*\+\s*\s*\s*\\s*\\s*\(\s*\s*\s*SP\s*\s*\s*,\s*\s*\s*\s*\\s*\(\s*\s*\w\s*\\s*\+\s*\s*\s*\\s*\)\s*\s*\s*\\s*\\s*\)\s*\s*\s*\s*\s*\s*,\s*\s*\s*\s\s*\\s*\+\s*\s*r1;/i)) != null) {
      let rt = {
        pattern: "10101101nnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin8(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
      ]
      return rt;
    }

    // st.b (SP,@n), @r;
    // Reference:  page 30

    if ((matched = str.match(/st.b\s\s*\\s*\+\s*\s*\s*\\s*\\s*\(\s*\s*\s*SP\s*\s*\s*,\s*\s*\s*\s*\\s*\(\s*\s*\w\s*\\s*\+\s*\s*\s*\\s*\)\s*\s*\s*\\s*\\s*\)\s*\s*\s*\s*\s*\s*,\s*\s*\s*\s\s*\\s*\+\s*\s*r2;/i)) != null) {
      let rt = {
        pattern: "10101110nnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin8(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
      ]
      return rt;
    }

    // st.b (SP,@n), @r;
    // Reference:  page 30

    if ((matched = str.match(/st.b\s\s*\\s*\+\s*\s*\s*\\s*\\s*\(\s*\s*\s*SP\s*\s*\s*,\s*\s*\s*\s*\\s*\(\s*\s*\w\s*\\s*\+\s*\s*\s*\\s*\)\s*\s*\s*\\s*\\s*\)\s*\s*\s*\s*\s*\s*,\s*\s*\s*\s\s*\\s*\+\s*\s*r3;/i)) != null) {
      let rt = {
        pattern: "10101111nnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin8(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
      ]
      return rt;
    }

    // ld.w @r,@n;
    // Reference:  page 31

    if ((matched = str.match(/ld.w\s\s*\+\s*r0\s*\s*,\s*\s*\s*\(\s*\w\s*\+\s*\s*\)\s*;/i)) != null) {
      let rt = {
        pattern: "10110000nnnnnnnnnnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin16(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
        parseInt(rt.pattern.substr(16, 8), 2),
      ]
      return rt;
    }

    // ld.w @r,@n;
    // Reference:  page 31

    if ((matched = str.match(/ld.w\s\s*\+\s*r1\s*\s*,\s*\s*\s*\(\s*\w\s*\+\s*\s*\)\s*;/i)) != null) {
      let rt = {
        pattern: "10110001nnnnnnnnnnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin16(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
        parseInt(rt.pattern.substr(16, 8), 2),
      ]
      return rt;
    }

    // ld.w @r,@n;
    // Reference:  page 31

    if ((matched = str.match(/ld.w\s\s*\+\s*r2\s*\s*,\s*\s*\s*\(\s*\w\s*\+\s*\s*\)\s*;/i)) != null) {
      let rt = {
        pattern: "10110010nnnnnnnnnnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin16(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
        parseInt(rt.pattern.substr(16, 8), 2),
      ]
      return rt;
    }

    // ld.w @r,@n;
    // Reference:  page 31

    if ((matched = str.match(/ld.w\s\s*\+\s*r3\s*\s*,\s*\s*\s*\(\s*\w\s*\+\s*\s*\)\s*;/i)) != null) {
      let rt = {
        pattern: "10110011nnnnnnnnnnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin16(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
        parseInt(rt.pattern.substr(16, 8), 2),
      ]
      return rt;
    }

    // ld.b @r,@n;
    // Reference:  page 31

    if ((matched = str.match(/ld.b\s\s*\+\s*r0\s*\s*,\s*\s*\s*\(\s*\w\s*\+\s*\s*\)\s*;/i)) != null) {
      let rt = {
        pattern: "10110100nnnnnnnnnnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin16(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
        parseInt(rt.pattern.substr(16, 8), 2),
      ]
      return rt;
    }

    // ld.b @r,@n;
    // Reference:  page 31

    if ((matched = str.match(/ld.b\s\s*\+\s*r1\s*\s*,\s*\s*\s*\(\s*\w\s*\+\s*\s*\)\s*;/i)) != null) {
      let rt = {
        pattern: "10110101nnnnnnnnnnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin16(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
        parseInt(rt.pattern.substr(16, 8), 2),
      ]
      return rt;
    }

    // ld.b @r,@n;
    // Reference:  page 31

    if ((matched = str.match(/ld.b\s\s*\+\s*r2\s*\s*,\s*\s*\s*\(\s*\w\s*\+\s*\s*\)\s*;/i)) != null) {
      let rt = {
        pattern: "10110110nnnnnnnnnnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin16(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
        parseInt(rt.pattern.substr(16, 8), 2),
      ]
      return rt;
    }

    // ld.b @r,@n;
    // Reference:  page 31

    if ((matched = str.match(/ld.b\s\s*\+\s*r3\s*\s*,\s*\s*\s*\(\s*\w\s*\+\s*\s*\)\s*;/i)) != null) {
      let rt = {
        pattern: "10110111nnnnnnnnnnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin16(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
        parseInt(rt.pattern.substr(16, 8), 2),
      ]
      return rt;
    }

    // st.w @n, @r;
    // Reference:  page 31

    if ((matched = str.match(/st.w\s\s*\+\s*\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*,\s*\s*\s\s*\+\s*r0;/i)) != null) {
      let rt = {
        pattern: "10111000nnnnnnnnnnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin16(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
        parseInt(rt.pattern.substr(16, 8), 2),
      ]
      return rt;
    }

    // st.w @n, @r;
    // Reference:  page 31

    if ((matched = str.match(/st.w\s\s*\+\s*\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*,\s*\s*\s\s*\+\s*r1;/i)) != null) {
      let rt = {
        pattern: "10111001nnnnnnnnnnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin16(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
        parseInt(rt.pattern.substr(16, 8), 2),
      ]
      return rt;
    }

    // st.w @n, @r;
    // Reference:  page 31

    if ((matched = str.match(/st.w\s\s*\+\s*\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*,\s*\s*\s\s*\+\s*r2;/i)) != null) {
      let rt = {
        pattern: "10111010nnnnnnnnnnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin16(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
        parseInt(rt.pattern.substr(16, 8), 2),
      ]
      return rt;
    }

    // st.w @n, @r;
    // Reference:  page 31

    if ((matched = str.match(/st.w\s\s*\+\s*\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*,\s*\s*\s\s*\+\s*r3;/i)) != null) {
      let rt = {
        pattern: "10111011nnnnnnnnnnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin16(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
        parseInt(rt.pattern.substr(16, 8), 2),
      ]
      return rt;
    }

    // st.b @n,@r;
    // Reference:  page 31

    if ((matched = str.match(/st.b\s\s*\+\s*\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*,\s*\s*r0;/i)) != null) {
      let rt = {
        pattern: "10111100nnnnnnnnnnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin16(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
        parseInt(rt.pattern.substr(16, 8), 2),
      ]
      return rt;
    }

    // st.b @n,@r;
    // Reference:  page 31

    if ((matched = str.match(/st.b\s\s*\+\s*\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*,\s*\s*r1;/i)) != null) {
      let rt = {
        pattern: "10111101nnnnnnnnnnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin16(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
        parseInt(rt.pattern.substr(16, 8), 2),
      ]
      return rt;
    }

    // st.b @n,@r;
    // Reference:  page 31

    if ((matched = str.match(/st.b\s\s*\+\s*\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*,\s*\s*r2;/i)) != null) {
      let rt = {
        pattern: "10111110nnnnnnnnnnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin16(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
        parseInt(rt.pattern.substr(16, 8), 2),
      ]
      return rt;
    }

    // st.b @n,@r;
    // Reference:  page 31

    if ((matched = str.match(/st.b\s\s*\+\s*\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*,\s*\s*r3;/i)) != null) {
      let rt = {
        pattern: "10111111nnnnnnnnnnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin16(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
        parseInt(rt.pattern.substr(16, 8), 2),
      ]
      return rt;
    }

    // pop @r;
    // Reference:  page 42

    if ((matched = str.match(/pop\s\s*\+\s*r0;/i)) != null) {
      let rt = {
        pattern: "11000000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // pop @r;
    // Reference:  page 42

    if ((matched = str.match(/pop\s\s*\+\s*r1;/i)) != null) {
      let rt = {
        pattern: "11000001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // pop @r;
    // Reference:  page 42

    if ((matched = str.match(/pop\s\s*\+\s*r2;/i)) != null) {
      let rt = {
        pattern: "11000010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // pop @r;
    // Reference:  page 42

    if ((matched = str.match(/pop\s\s*\+\s*r3;/i)) != null) {
      let rt = {
        pattern: "11000011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // pop PS;
    // Reference:  page 42

    if ((matched = str.match(/pop\s\s*\+\s*PS;/i)) != null) {
      let rt = {
        pattern: "11000100",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // ret;
    // Reference:  page 44

    if ((matched = str.match(/ret;/i)) != null) {
      let rt = {
        pattern: "11000110",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // reti;
    // Reference:  page 45

    if ((matched = str.match(/reti;/i)) != null) {
      let rt = {
        pattern: "11000111",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // push @r;
    // Reference:  page 42

    if ((matched = str.match(/push\s\s*\+\s*r0;/i)) != null) {
      let rt = {
        pattern: "11001000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // push @r;
    // Reference:  page 42

    if ((matched = str.match(/push\s\s*\+\s*r1;/i)) != null) {
      let rt = {
        pattern: "11001001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // push @r;
    // Reference:  page 42

    if ((matched = str.match(/push\s\s*\+\s*r2;/i)) != null) {
      let rt = {
        pattern: "11001010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // push @r;
    // Reference:  page 42

    if ((matched = str.match(/push\s\s*\+\s*r3;/i)) != null) {
      let rt = {
        pattern: "11001011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // push PS;
    // Reference:  page 42

    if ((matched = str.match(/push\s\s*\+\s*PS;/i)) != null) {
      let rt = {
        pattern: "11001100",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // trap;
    // Reference:  page 56

    if ((matched = str.match(/trap;/i)) != null) {
      let rt = {
        pattern: "11001101",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // jsr (r0);
    // Reference:  page 25

    if ((matched = str.match(/jsr\s\s*\\s*\+\s*\s*\s*\\s*\\s*\(\s*\s*\s*r0\s*\\s*\\s*\)\s*\s*\s*;/i)) != null) {
      let rt = {
        pattern: "11001110",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // jsr @n;
    // Reference:  page 26

    if ((matched = str.match(/jsr\s\s*\\s*\+\s*\s*\s*\\s*\(\s*\s*\w\s*\\s*\+\s*\s*\s*\\s*\)\s*\s*;/i)) != null) {
      let rt = {
        pattern: "11001111nnnnnnnnnnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin16(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
        parseInt(rt.pattern.substr(16, 8), 2),
      ]
      return rt;
    }

    // pushpop;
    // Reference:  page 39

    if ((matched = str.match(/pushpop;/i)) != null) {
      let rt = {
        pattern: "11001111",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // ld.w @r,#@n;
    // Reference:  page 27

    if ((matched = str.match(/ld.w\s\s*\+\s*r0\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*;/i)) != null) {
      let rt = {
        pattern: "11010000nnnnnnnnnnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin16(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
        parseInt(rt.pattern.substr(16, 8), 2),
      ]
      return rt;
    }

    // ld.w @r,#@n;
    // Reference:  page 27

    if ((matched = str.match(/ld.w\s\s*\+\s*r1\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*;/i)) != null) {
      let rt = {
        pattern: "11010001nnnnnnnnnnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin16(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
        parseInt(rt.pattern.substr(16, 8), 2),
      ]
      return rt;
    }

    // ld.w @r,#@n;
    // Reference:  page 27

    if ((matched = str.match(/ld.w\s\s*\+\s*r2\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*;/i)) != null) {
      let rt = {
        pattern: "11010010nnnnnnnnnnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin16(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
        parseInt(rt.pattern.substr(16, 8), 2),
      ]
      return rt;
    }

    // ld.w @r,#@n;
    // Reference:  page 27

    if ((matched = str.match(/ld.w\s\s*\+\s*r3\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*;/i)) != null) {
      let rt = {
        pattern: "11010011nnnnnnnnnnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin16(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
        parseInt(rt.pattern.substr(16, 8), 2),
      ]
      return rt;
    }

    // ld.b @r, #@n;
    // Reference:  page 27

    if ((matched = str.match(/ld.b\s\s*\+\s*r0\s*\s*,\s*\s*\s\s*\+\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*;/i)) != null) {
      let rt = {
        pattern: "11010100nnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin8(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
      ]
      return rt;
    }

    // ld.b @r, #@n;
    // Reference:  page 27

    if ((matched = str.match(/ld.b\s\s*\+\s*r1\s*\s*,\s*\s*\s\s*\+\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*;/i)) != null) {
      let rt = {
        pattern: "11010101nnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin8(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
      ]
      return rt;
    }

    // ld.b @r, #@n;
    // Reference:  page 27

    if ((matched = str.match(/ld.b\s\s*\+\s*r2\s*\s*,\s*\s*\s\s*\+\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*;/i)) != null) {
      let rt = {
        pattern: "11010110nnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin8(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
      ]
      return rt;
    }

    // ld.b @r, #@n;
    // Reference:  page 27

    if ((matched = str.match(/ld.b\s\s*\+\s*r3\s*\s*,\s*\s*\s\s*\+\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*;/i)) != null) {
      let rt = {
        pattern: "11010111nnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin8(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
      ]
      return rt;
    }

    // LSL;
    // Reference:  page 32
    // Reference: This is all shifts, logical and arithmetic

    if ((matched = str.match(/LSL;/i)) != null) {
      let rt = {
        pattern: "11011000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // LSL;
    // Reference:  page 32
    // Reference: This is all shifts, logical and arithmetic

    if ((matched = str.match(/LSL;/i)) != null) {
      let rt = {
        pattern: "11011001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // LSL;
    // Reference:  page 32
    // Reference: This is all shifts, logical and arithmetic

    if ((matched = str.match(/LSL;/i)) != null) {
      let rt = {
        pattern: "11011010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // LSL;
    // Reference:  page 32
    // Reference: This is all shifts, logical and arithmetic

    if ((matched = str.match(/LSL;/i)) != null) {
      let rt = {
        pattern: "11011011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bchg;
    // Reference:  page 15

    if ((matched = str.match(/bchg;/i)) != null) {
      let rt = {
        pattern: "11011100",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bchg;
    // Reference:  page 15

    if ((matched = str.match(/bchg;/i)) != null) {
      let rt = {
        pattern: "11011101",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bchg;
    // Reference:  page 15

    if ((matched = str.match(/bchg;/i)) != null) {
      let rt = {
        pattern: "11011110",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bchg;
    // Reference:  page 15

    if ((matched = str.match(/bchg;/i)) != null) {
      let rt = {
        pattern: "11011111",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // buc @n;
    // Reference:  page 13

    if ((matched = str.match(/buc\s+(\w+);/i)) != null) {
      let rt = {
        pattern: "11100001nnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin8(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
      ]
      return rt;
    }

    // bus @n;
    // Reference:  page 13

    if ((matched = str.match(/bus\s+(\w+);/i)) != null) {
      let rt = {
        pattern: "11100001nnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin8(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
      ]
      return rt;
    }

    // bhi @n;
    // Reference:  page 13

    if ((matched = str.match(/bhi\s+(\w+);/i)) != null) {
      let rt = {
        pattern: "11100010nnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin8(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
      ]
      return rt;
    }

    // blo @n;
    // Reference:  page 13

    if ((matched = str.match(/blo\s+(\w+);/i)) != null) {
      let rt = {
        pattern: "11100011nnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin8(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
      ]
      return rt;
    }

    // bcc @n;
    // Reference:  page 13

    if ((matched = str.match(/bcc\s+(\w+);/i)) != null) {
      let rt = {
        pattern: "11100100nnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin8(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
      ]
      return rt;
    }

    // bcs @n;
    // Reference:  page 13

    if ((matched = str.match(/bcs\s+(\w+);/i)) != null) {
      let rt = {
        pattern: "11100101nnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin8(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
      ]
      return rt;
    }

    // bne @n;
    // Reference:  page 13

    if ((matched = str.match(/bne\s+(\w+);/i)) != null) {
      let rt = {
        pattern: "11100110nnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin8(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
      ]
      return rt;
    }

    // beq @n;
    // Reference:  page 13

    if ((matched = str.match(/beq\s+(\w+);/i)) != null) {
      let rt = {
        pattern: "11100111nnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin8(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
      ]
      return rt;
    }

    // bvc @n;
    // Reference:  page 13

    if ((matched = str.match(/bvc\s+(\w+);/i)) != null) {
      let rt = {
        pattern: "11101000nnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin8(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
      ]
      return rt;
    }

    // bvs @n;
    // Reference:  page 13

    if ((matched = str.match(/bvs\s+(\w+);/i)) != null) {
      let rt = {
        pattern: "11101001nnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin8(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
      ]
      return rt;
    }

    // bpl @n;
    // Reference:  page 13

    if ((matched = str.match(/bpl\s+(\w+);/i)) != null) {
      let rt = {
        pattern: "11101010nnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin8(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
      ]
      return rt;
    }

    // bmi @n;
    // Reference:  page 13

    if ((matched = str.match(/bmi\s+(\w+);/i)) != null) {
      let rt = {
        pattern: "11101011nnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin8(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
      ]
      return rt;
    }

    // bge @n;
    // Reference:  page 13

    if ((matched = str.match(/bge\s+(\w+);/i)) != null) {
      let rt = {
        pattern: "11101100nnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin8(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
      ]
      return rt;
    }

    // blt @n;
    // Reference:  page 13

    if ((matched = str.match(/blt\s+(\w+);/i)) != null) {
      let rt = {
        pattern: "11101101nnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin8(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
      ]
      return rt;
    }

    // bgt @n;
    // Reference:  page 13

    if ((matched = str.match(/bgt\s+(\w+);/i)) != null) {
      let rt = {
        pattern: "11101110nnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin8(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
      ]
      return rt;
    }

    // ble @n;
    // Reference:  page 13

    if ((matched = str.match(/ble\s+(\w+);/i)) != null) {
      let rt = {
        pattern: "11101111nnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin8(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
      ]
      return rt;
    }

    // move r0,sp;
    // Reference:  page 35

    if ((matched = str.match(/move\s+r0\s*,\s*sp;/i)) != null) {
      let rt = {
        pattern: "11110000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // move sp,r0;
    // Reference:  page 35

    if ((matched = str.match(/move\s+sp\s*,\s*r0;/i)) != null) {
      let rt = {
        pattern: "11110001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // JMP (r0);
    // Reference:  page 23

    if ((matched = str.match(/JMP\s+\s*\(\s*r0\s*\)\s*;/i)) != null) {
      let rt = {
        pattern: "11110010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // JMP @n;
    // Reference:  page 24

    if ((matched = str.match(/JMP\s+(\w+);/i)) != null) {
      let rt = {
        pattern: "11110011nnnnnnnnnnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin16(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
        parseInt(rt.pattern.substr(16, 8), 2),
      ]
      return rt;
    }

    // and PS,@n;
    // Reference:  page 9

    if ((matched = str.match(/and\s+PS\s*,\s*(\w+);/i)) != null) {
      let rt = {
        pattern: "11110100nnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin8(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
      ]
      return rt;
    }

    // or PS,#n;
    // Reference:  page 41

    if ((matched = str.match(/or\s+PS\s*,\s*#n;/i)) != null) {
      let rt = {
        pattern: "11110101nnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin7(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // add sp,#n;
    // Reference:  page 6

    if ((matched = str.match(/add\s+sp\s*,\s*#n;/i)) != null) {
      let rt = {
        pattern: "11110110nnnnnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin8(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
        parseInt(rt.pattern.substr(8, 8), 2),
      ]
      return rt;
    }

    // sqrt;
    // Reference:  page 50

    if ((matched = str.match(/sqrt;/i)) != null) {
      let rt = {
        pattern: "11110111",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // mulu;
    // Reference:  page 35

    if ((matched = str.match(/mulu;/i)) != null) {
      let rt = {
        pattern: "11111000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // muls;
    // Reference:  page 35

    if ((matched = str.match(/muls;/i)) != null) {
      let rt = {
        pattern: "11111001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // div.u;
    // Reference:  page 20

    if ((matched = str.match(/div.u;/i)) != null) {
      let rt = {
        pattern: "11111010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // div.s;
    // Reference:  page 20

    if ((matched = str.match(/div.s;/i)) != null) {
      let rt = {
        pattern: "11111011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // addx r0,r1;
    // Reference:  page 8

    if ((matched = str.match(/addx\s+r0\s*,\s*r1;/i)) != null) {
      let rt = {
        pattern: "11111100",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // subx r0,r1;
    // Reference:  page 53

    if ((matched = str.match(/subx\s+r0\s*,\s*r1;/i)) != null) {
      let rt = {
        pattern: "11111101",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // negx r0;
    // Reference:  page 38

    if ((matched = str.match(/negx\s+r0;/i)) != null) {
      let rt = {
        pattern: "11111110",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // NOP;
    // Reference:  page 39

    if ((matched = str.match(/NOP;/i)) != null) {
      let rt = {
        pattern: "11111111",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsl @r,#@n-16
    // Reference:  page 32

    if ((matched = str.match(/lsl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsl @r,#@n-16
    // Reference:  page 32

    if ((matched = str.match(/lsl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsl @r,#@n-16
    // Reference:  page 32

    if ((matched = str.match(/lsl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsl @r,#@n-16
    // Reference:  page 32

    if ((matched = str.match(/lsl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsl @r,#@n-16
    // Reference:  page 32

    if ((matched = str.match(/lsl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsl @r,#@n-16
    // Reference:  page 32

    if ((matched = str.match(/lsl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsl @r,#@n-16
    // Reference:  page 32

    if ((matched = str.match(/lsl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsl @r,#@n-16
    // Reference:  page 32

    if ((matched = str.match(/lsl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsl @r,#@n-16
    // Reference:  page 32

    if ((matched = str.match(/lsl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsl @r,#@n-16
    // Reference:  page 32

    if ((matched = str.match(/lsl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsl @r,#@n-16
    // Reference:  page 32

    if ((matched = str.match(/lsl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsl @r,#@n-16
    // Reference:  page 32

    if ((matched = str.match(/lsl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsl @r,#@n-16
    // Reference:  page 32

    if ((matched = str.match(/lsl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsl @r,#@n-16
    // Reference:  page 32

    if ((matched = str.match(/lsl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsl @r,#@n-16
    // Reference:  page 32

    if ((matched = str.match(/lsl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsl @r,#@n-16
    // Reference:  page 32

    if ((matched = str.match(/lsl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsl @r,#@n-16
    // Reference:  page 32

    if ((matched = str.match(/lsl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsl @r,#@n-16
    // Reference:  page 32

    if ((matched = str.match(/lsl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsl @r,#@n-16
    // Reference:  page 32

    if ((matched = str.match(/lsl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsl @r,#@n-16
    // Reference:  page 32

    if ((matched = str.match(/lsl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsl @r,#@n-16
    // Reference:  page 32

    if ((matched = str.match(/lsl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsl @r,#@n-16
    // Reference:  page 32

    if ((matched = str.match(/lsl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsl @r,#@n-16
    // Reference:  page 32

    if ((matched = str.match(/lsl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsl @r,#@n-16
    // Reference:  page 32

    if ((matched = str.match(/lsl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsl @r,#@n-16
    // Reference:  page 32

    if ((matched = str.match(/lsl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsl @r,#@n-16
    // Reference:  page 32

    if ((matched = str.match(/lsl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsl @r,#@n-16
    // Reference:  page 32

    if ((matched = str.match(/lsl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsl @r,#@n-16
    // Reference:  page 32

    if ((matched = str.match(/lsl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsl @r,#@n-16
    // Reference:  page 32

    if ((matched = str.match(/lsl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsl @r,#@n-16
    // Reference:  page 32

    if ((matched = str.match(/lsl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsl @r,#@n-16
    // Reference:  page 32

    if ((matched = str.match(/lsl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsl @r,#@n-16
    // Reference:  page 32

    if ((matched = str.match(/lsl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsl @r,@s
    // Reference:  page 32

    if ((matched = str.match(/lsl\s\s*\+\s*@r\s*\s*,\s*\s*r0/i)) != null) {
      let rt = {
        pattern: "00100000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsl @r,@s
    // Reference:  page 32

    if ((matched = str.match(/lsl\s\s*\+\s*@r\s*\s*,\s*\s*r1/i)) != null) {
      let rt = {
        pattern: "00100001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsl @r,@s
    // Reference:  page 32

    if ((matched = str.match(/lsl\s\s*\+\s*@r\s*\s*,\s*\s*r2/i)) != null) {
      let rt = {
        pattern: "00100010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsl @r,@s
    // Reference:  page 32

    if ((matched = str.match(/lsl\s\s*\+\s*@r\s*\s*,\s*\s*r3/i)) != null) {
      let rt = {
        pattern: "00100011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsl.wt @r,@s
    // Reference:  page 32
    // Reference: Weighted stores the number of 1 bits shifted out into RA

    if ((matched = str.match(/lsl.wt\s\s*\+\s*@r\s*\s*,\s*\s*r0/i)) != null) {
      let rt = {
        pattern: "00101000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsl.wt @r,@s
    // Reference:  page 32
    // Reference: Weighted stores the number of 1 bits shifted out into RA

    if ((matched = str.match(/lsl.wt\s\s*\+\s*@r\s*\s*,\s*\s*r1/i)) != null) {
      let rt = {
        pattern: "00101001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsl.wt @r,@s
    // Reference:  page 32
    // Reference: Weighted stores the number of 1 bits shifted out into RA

    if ((matched = str.match(/lsl.wt\s\s*\+\s*@r\s*\s*,\s*\s*r2/i)) != null) {
      let rt = {
        pattern: "00101010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsl.wt @r,@s
    // Reference:  page 32
    // Reference: Weighted stores the number of 1 bits shifted out into RA

    if ((matched = str.match(/lsl.wt\s\s*\+\s*@r\s*\s*,\s*\s*r3/i)) != null) {
      let rt = {
        pattern: "00101011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsr @r,@s
    // Reference:  page 32

    if ((matched = str.match(/lsr\s\s*\+\s*@r\s*\s*,\s*\s*r0/i)) != null) {
      let rt = {
        pattern: "00110000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsr @r,@s
    // Reference:  page 32

    if ((matched = str.match(/lsr\s\s*\+\s*@r\s*\s*,\s*\s*r1/i)) != null) {
      let rt = {
        pattern: "00110001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsr @r,@s
    // Reference:  page 32

    if ((matched = str.match(/lsr\s\s*\+\s*@r\s*\s*,\s*\s*r2/i)) != null) {
      let rt = {
        pattern: "00110010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsr @r,@s
    // Reference:  page 32

    if ((matched = str.match(/lsr\s\s*\+\s*@r\s*\s*,\s*\s*r3/i)) != null) {
      let rt = {
        pattern: "00110011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsr.wt @r,@s
    // Reference:  page 32
    // Reference: Weighted stores the number of 1 bits shifted out into RA

    if ((matched = str.match(/lsr.wt\s\s*\+\s*@r\s*\s*,\s*\s*r0/i)) != null) {
      let rt = {
        pattern: "00111000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsr.wt @r,@s
    // Reference:  page 32
    // Reference: Weighted stores the number of 1 bits shifted out into RA

    if ((matched = str.match(/lsr.wt\s\s*\+\s*@r\s*\s*,\s*\s*r1/i)) != null) {
      let rt = {
        pattern: "00111001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsr.wt @r,@s
    // Reference:  page 32
    // Reference: Weighted stores the number of 1 bits shifted out into RA

    if ((matched = str.match(/lsr.wt\s\s*\+\s*@r\s*\s*,\s*\s*r2/i)) != null) {
      let rt = {
        pattern: "00111010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // lsr.wt @r,@s
    // Reference:  page 32
    // Reference: Weighted stores the number of 1 bits shifted out into RA

    if ((matched = str.match(/lsr.wt\s\s*\+\s*@r\s*\s*,\s*\s*r3/i)) != null) {
      let rt = {
        pattern: "00111011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asl @r,#@n-16
    // Reference:  page 11

    if ((matched = str.match(/asl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "010nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asl @r,#@n-16
    // Reference:  page 11

    if ((matched = str.match(/asl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "010nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asl @r,#@n-16
    // Reference:  page 11

    if ((matched = str.match(/asl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "010nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asl @r,#@n-16
    // Reference:  page 11

    if ((matched = str.match(/asl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "010nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asl @r,#@n-16
    // Reference:  page 11

    if ((matched = str.match(/asl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "010nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asl @r,#@n-16
    // Reference:  page 11

    if ((matched = str.match(/asl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "010nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asl @r,#@n-16
    // Reference:  page 11

    if ((matched = str.match(/asl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "010nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asl @r,#@n-16
    // Reference:  page 11

    if ((matched = str.match(/asl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "010nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asl @r,#@n-16
    // Reference:  page 11

    if ((matched = str.match(/asl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "010nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asl @r,#@n-16
    // Reference:  page 11

    if ((matched = str.match(/asl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "010nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asl @r,#@n-16
    // Reference:  page 11

    if ((matched = str.match(/asl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "010nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asl @r,#@n-16
    // Reference:  page 11

    if ((matched = str.match(/asl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "010nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asl @r,#@n-16
    // Reference:  page 11

    if ((matched = str.match(/asl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "010nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asl @r,#@n-16
    // Reference:  page 11

    if ((matched = str.match(/asl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "010nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asl @r,#@n-16
    // Reference:  page 11

    if ((matched = str.match(/asl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "010nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asl @r,#@n-16
    // Reference:  page 11

    if ((matched = str.match(/asl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "010nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asl @r,#@n-16
    // Reference:  page 11

    if ((matched = str.match(/asl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "010nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asl @r,#@n-16
    // Reference:  page 11

    if ((matched = str.match(/asl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "010nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asl @r,#@n-16
    // Reference:  page 11

    if ((matched = str.match(/asl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "010nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asl @r,#@n-16
    // Reference:  page 11

    if ((matched = str.match(/asl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "010nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asl @r,#@n-16
    // Reference:  page 11

    if ((matched = str.match(/asl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "010nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asl @r,#@n-16
    // Reference:  page 11

    if ((matched = str.match(/asl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "010nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asl @r,#@n-16
    // Reference:  page 11

    if ((matched = str.match(/asl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "010nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asl @r,#@n-16
    // Reference:  page 11

    if ((matched = str.match(/asl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "010nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asl @r,#@n-16
    // Reference:  page 11

    if ((matched = str.match(/asl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "010nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asl @r,#@n-16
    // Reference:  page 11

    if ((matched = str.match(/asl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "010nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asl @r,#@n-16
    // Reference:  page 11

    if ((matched = str.match(/asl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "010nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asl @r,#@n-16
    // Reference:  page 11

    if ((matched = str.match(/asl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "010nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asl @r,#@n-16
    // Reference:  page 11

    if ((matched = str.match(/asl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "010nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asl @r,#@n-16
    // Reference:  page 11

    if ((matched = str.match(/asl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "010nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asl @r,#@n-16
    // Reference:  page 11

    if ((matched = str.match(/asl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "010nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asl @r,#@n-16
    // Reference:  page 11

    if ((matched = str.match(/asl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "010nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asl @r,@s
    // Reference:  page 11

    if ((matched = str.match(/asl\s\s*\+\s*@r\s*\s*,\s*\s*r0/i)) != null) {
      let rt = {
        pattern: "01100000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asl @r,@s
    // Reference:  page 11

    if ((matched = str.match(/asl\s\s*\+\s*@r\s*\s*,\s*\s*r1/i)) != null) {
      let rt = {
        pattern: "01100001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asl @r,@s
    // Reference:  page 11

    if ((matched = str.match(/asl\s\s*\+\s*@r\s*\s*,\s*\s*r2/i)) != null) {
      let rt = {
        pattern: "01100010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asl @r,@s
    // Reference:  page 11

    if ((matched = str.match(/asl\s\s*\+\s*@r\s*\s*,\s*\s*r3/i)) != null) {
      let rt = {
        pattern: "01100011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asl.wt @r,@s
    // Reference:  page 11
    // Reference: Weighted stores the number of 1 bits shifted out into RA

    if ((matched = str.match(/asl.wt\s\s*\+\s*@r\s*\s*,\s*\s*r0/i)) != null) {
      let rt = {
        pattern: "01101000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asl.wt @r,@s
    // Reference:  page 11
    // Reference: Weighted stores the number of 1 bits shifted out into RA

    if ((matched = str.match(/asl.wt\s\s*\+\s*@r\s*\s*,\s*\s*r1/i)) != null) {
      let rt = {
        pattern: "01101001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asl.wt @r,@s
    // Reference:  page 11
    // Reference: Weighted stores the number of 1 bits shifted out into RA

    if ((matched = str.match(/asl.wt\s\s*\+\s*@r\s*\s*,\s*\s*r2/i)) != null) {
      let rt = {
        pattern: "01101010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asl.wt @r,@s
    // Reference:  page 11
    // Reference: Weighted stores the number of 1 bits shifted out into RA

    if ((matched = str.match(/asl.wt\s\s*\+\s*@r\s*\s*,\s*\s*r3/i)) != null) {
      let rt = {
        pattern: "01101011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asr @r,@s
    // Reference:  page 11

    if ((matched = str.match(/asr\s\s*\+\s*@r\s*\s*,\s*\s*r0/i)) != null) {
      let rt = {
        pattern: "01110000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asr @r,@s
    // Reference:  page 11

    if ((matched = str.match(/asr\s\s*\+\s*@r\s*\s*,\s*\s*r1/i)) != null) {
      let rt = {
        pattern: "01110001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asr @r,@s
    // Reference:  page 11

    if ((matched = str.match(/asr\s\s*\+\s*@r\s*\s*,\s*\s*r2/i)) != null) {
      let rt = {
        pattern: "01110010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asr @r,@s
    // Reference:  page 11

    if ((matched = str.match(/asr\s\s*\+\s*@r\s*\s*,\s*\s*r3/i)) != null) {
      let rt = {
        pattern: "01110011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asr.wt @r,@s
    // Reference:  page 1
    // Reference: Weighted stores the number of 1 bits shifted out into RA

    if ((matched = str.match(/asr.wt\s\s*\+\s*@r\s*\s*,\s*\s*r0/i)) != null) {
      let rt = {
        pattern: "01111000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asr.wt @r,@s
    // Reference:  page 1
    // Reference: Weighted stores the number of 1 bits shifted out into RA

    if ((matched = str.match(/asr.wt\s\s*\+\s*@r\s*\s*,\s*\s*r1/i)) != null) {
      let rt = {
        pattern: "01111001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asr.wt @r,@s
    // Reference:  page 1
    // Reference: Weighted stores the number of 1 bits shifted out into RA

    if ((matched = str.match(/asr.wt\s\s*\+\s*@r\s*\s*,\s*\s*r2/i)) != null) {
      let rt = {
        pattern: "01111010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // asr.wt @r,@s
    // Reference:  page 1
    // Reference: Weighted stores the number of 1 bits shifted out into RA

    if ((matched = str.match(/asr.wt\s\s*\+\s*@r\s*\s*,\s*\s*r3/i)) != null) {
      let rt = {
        pattern: "01111011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // rol @r,#@n-16
    // Reference:  page 46

    if ((matched = str.match(/rol\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // rol @r,#@n-16
    // Reference:  page 46

    if ((matched = str.match(/rol\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // rol @r,#@n-16
    // Reference:  page 46

    if ((matched = str.match(/rol\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // rol @r,#@n-16
    // Reference:  page 46

    if ((matched = str.match(/rol\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // rol @r,#@n-16
    // Reference:  page 46

    if ((matched = str.match(/rol\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // rol @r,#@n-16
    // Reference:  page 46

    if ((matched = str.match(/rol\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // rol @r,#@n-16
    // Reference:  page 46

    if ((matched = str.match(/rol\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // rol @r,#@n-16
    // Reference:  page 46

    if ((matched = str.match(/rol\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // rol @r,#@n-16
    // Reference:  page 46

    if ((matched = str.match(/rol\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // rol @r,#@n-16
    // Reference:  page 46

    if ((matched = str.match(/rol\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // rol @r,#@n-16
    // Reference:  page 46

    if ((matched = str.match(/rol\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // rol @r,#@n-16
    // Reference:  page 46

    if ((matched = str.match(/rol\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // rol @r,#@n-16
    // Reference:  page 46

    if ((matched = str.match(/rol\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // rol @r,#@n-16
    // Reference:  page 46

    if ((matched = str.match(/rol\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // rol @r,#@n-16
    // Reference:  page 46

    if ((matched = str.match(/rol\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // rol @r,#@n-16
    // Reference:  page 46

    if ((matched = str.match(/rol\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // rol @r,#@n-16
    // Reference:  page 46

    if ((matched = str.match(/rol\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // rol @r,#@n-16
    // Reference:  page 46

    if ((matched = str.match(/rol\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // rol @r,#@n-16
    // Reference:  page 46

    if ((matched = str.match(/rol\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // rol @r,#@n-16
    // Reference:  page 46

    if ((matched = str.match(/rol\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // rol @r,#@n-16
    // Reference:  page 46

    if ((matched = str.match(/rol\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // rol @r,#@n-16
    // Reference:  page 46

    if ((matched = str.match(/rol\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // rol @r,#@n-16
    // Reference:  page 46

    if ((matched = str.match(/rol\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // rol @r,#@n-16
    // Reference:  page 46

    if ((matched = str.match(/rol\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // rol @r,#@n-16
    // Reference:  page 46

    if ((matched = str.match(/rol\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // rol @r,#@n-16
    // Reference:  page 46

    if ((matched = str.match(/rol\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // rol @r,#@n-16
    // Reference:  page 46

    if ((matched = str.match(/rol\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // rol @r,#@n-16
    // Reference:  page 46

    if ((matched = str.match(/rol\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // rol @r,#@n-16
    // Reference:  page 46

    if ((matched = str.match(/rol\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // rol @r,#@n-16
    // Reference:  page 46

    if ((matched = str.match(/rol\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // rol @r,#@n-16
    // Reference:  page 46

    if ((matched = str.match(/rol\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // rol @r,#@n-16
    // Reference:  page 46

    if ((matched = str.match(/rol\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // rol @r,@s
    // Reference:  page 46

    if ((matched = str.match(/rol\s\s*\+\s*@r\s*\s*,\s*\s*r0/i)) != null) {
      let rt = {
        pattern: "10100000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // rol @r,@s
    // Reference:  page 46

    if ((matched = str.match(/rol\s\s*\+\s*@r\s*\s*,\s*\s*r1/i)) != null) {
      let rt = {
        pattern: "10100001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // rol @r,@s
    // Reference:  page 46

    if ((matched = str.match(/rol\s\s*\+\s*@r\s*\s*,\s*\s*r2/i)) != null) {
      let rt = {
        pattern: "10100010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // rol @r,@s
    // Reference:  page 46

    if ((matched = str.match(/rol\s\s*\+\s*@r\s*\s*,\s*\s*r3/i)) != null) {
      let rt = {
        pattern: "10100011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // rol.wt @r,@s
    // Reference:  page 46
    // Reference: Weighted stores the number of 1 bits shifted out into RA

    if ((matched = str.match(/rol.wt\s\s*\+\s*@r\s*\s*,\s*\s*r0/i)) != null) {
      let rt = {
        pattern: "10101000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // rol.wt @r,@s
    // Reference:  page 46
    // Reference: Weighted stores the number of 1 bits shifted out into RA

    if ((matched = str.match(/rol.wt\s\s*\+\s*@r\s*\s*,\s*\s*r1/i)) != null) {
      let rt = {
        pattern: "10101001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // rol.wt @r,@s
    // Reference:  page 46
    // Reference: Weighted stores the number of 1 bits shifted out into RA

    if ((matched = str.match(/rol.wt\s\s*\+\s*@r\s*\s*,\s*\s*r2/i)) != null) {
      let rt = {
        pattern: "10101010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // rol.wt @r,@s
    // Reference:  page 46
    // Reference: Weighted stores the number of 1 bits shifted out into RA

    if ((matched = str.match(/rol.wt\s\s*\+\s*@r\s*\s*,\s*\s*r3/i)) != null) {
      let rt = {
        pattern: "10101011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // ror @r,@s
    // Reference:  page 46

    if ((matched = str.match(/ror\s\s*\+\s*@r\s*\s*,\s*\s*r0/i)) != null) {
      let rt = {
        pattern: "10110000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // ror @r,@s
    // Reference:  page 46

    if ((matched = str.match(/ror\s\s*\+\s*@r\s*\s*,\s*\s*r1/i)) != null) {
      let rt = {
        pattern: "10110001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // ror @r,@s
    // Reference:  page 46

    if ((matched = str.match(/ror\s\s*\+\s*@r\s*\s*,\s*\s*r2/i)) != null) {
      let rt = {
        pattern: "10110010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // ror @r,@s
    // Reference:  page 46

    if ((matched = str.match(/ror\s\s*\+\s*@r\s*\s*,\s*\s*r3/i)) != null) {
      let rt = {
        pattern: "10110011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // ror.wt @r,@s
    // Reference:  page 46
    // Reference: Weighted stores the number of 1 bits shifted out into RA

    if ((matched = str.match(/ror.wt\s\s*\+\s*@r\s*\s*,\s*\s*r0/i)) != null) {
      let rt = {
        pattern: "10111000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // ror.wt @r,@s
    // Reference:  page 46
    // Reference: Weighted stores the number of 1 bits shifted out into RA

    if ((matched = str.match(/ror.wt\s\s*\+\s*@r\s*\s*,\s*\s*r1/i)) != null) {
      let rt = {
        pattern: "10111001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // ror.wt @r,@s
    // Reference:  page 46
    // Reference: Weighted stores the number of 1 bits shifted out into RA

    if ((matched = str.match(/ror.wt\s\s*\+\s*@r\s*\s*,\s*\s*r2/i)) != null) {
      let rt = {
        pattern: "10111010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // ror.wt @r,@s
    // Reference:  page 46
    // Reference: Weighted stores the number of 1 bits shifted out into RA

    if ((matched = str.match(/ror.wt\s\s*\+\s*@r\s*\s*,\s*\s*r3/i)) != null) {
      let rt = {
        pattern: "10111011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxl @r,#@n-16
    // Reference:  page 48

    if ((matched = str.match(/roxl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxl @r,#@n-16
    // Reference:  page 48

    if ((matched = str.match(/roxl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxl @r,#@n-16
    // Reference:  page 48

    if ((matched = str.match(/roxl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxl @r,#@n-16
    // Reference:  page 48

    if ((matched = str.match(/roxl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxl @r,#@n-16
    // Reference:  page 48

    if ((matched = str.match(/roxl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxl @r,#@n-16
    // Reference:  page 48

    if ((matched = str.match(/roxl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxl @r,#@n-16
    // Reference:  page 48

    if ((matched = str.match(/roxl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxl @r,#@n-16
    // Reference:  page 48

    if ((matched = str.match(/roxl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxl @r,#@n-16
    // Reference:  page 48

    if ((matched = str.match(/roxl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxl @r,#@n-16
    // Reference:  page 48

    if ((matched = str.match(/roxl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxl @r,#@n-16
    // Reference:  page 48

    if ((matched = str.match(/roxl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxl @r,#@n-16
    // Reference:  page 48

    if ((matched = str.match(/roxl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxl @r,#@n-16
    // Reference:  page 48

    if ((matched = str.match(/roxl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxl @r,#@n-16
    // Reference:  page 48

    if ((matched = str.match(/roxl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxl @r,#@n-16
    // Reference:  page 48

    if ((matched = str.match(/roxl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxl @r,#@n-16
    // Reference:  page 48

    if ((matched = str.match(/roxl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxl @r,#@n-16
    // Reference:  page 48

    if ((matched = str.match(/roxl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxl @r,#@n-16
    // Reference:  page 48

    if ((matched = str.match(/roxl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxl @r,#@n-16
    // Reference:  page 48

    if ((matched = str.match(/roxl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxl @r,#@n-16
    // Reference:  page 48

    if ((matched = str.match(/roxl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxl @r,#@n-16
    // Reference:  page 48

    if ((matched = str.match(/roxl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxl @r,#@n-16
    // Reference:  page 48

    if ((matched = str.match(/roxl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxl @r,#@n-16
    // Reference:  page 48

    if ((matched = str.match(/roxl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxl @r,#@n-16
    // Reference:  page 48

    if ((matched = str.match(/roxl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxl @r,#@n-16
    // Reference:  page 48

    if ((matched = str.match(/roxl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxl @r,#@n-16
    // Reference:  page 48

    if ((matched = str.match(/roxl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxl @r,#@n-16
    // Reference:  page 48

    if ((matched = str.match(/roxl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxl @r,#@n-16
    // Reference:  page 48

    if ((matched = str.match(/roxl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxl @r,#@n-16
    // Reference:  page 48

    if ((matched = str.match(/roxl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxl @r,#@n-16
    // Reference:  page 48

    if ((matched = str.match(/roxl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxl @r,#@n-16
    // Reference:  page 48

    if ((matched = str.match(/roxl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxl @r,#@n-16
    // Reference:  page 48

    if ((matched = str.match(/roxl\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*\s*\s*-\s*\s*16/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxl @r,@s
    // Reference:  page 48

    if ((matched = str.match(/roxl\s\s*\+\s*@r\s*\s*,\s*\s*r0/i)) != null) {
      let rt = {
        pattern: "11100000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxl @r,@s
    // Reference:  page 48

    if ((matched = str.match(/roxl\s\s*\+\s*@r\s*\s*,\s*\s*r1/i)) != null) {
      let rt = {
        pattern: "11100001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxl @r,@s
    // Reference:  page 48

    if ((matched = str.match(/roxl\s\s*\+\s*@r\s*\s*,\s*\s*r2/i)) != null) {
      let rt = {
        pattern: "11100010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxl @r,@s
    // Reference:  page 48

    if ((matched = str.match(/roxl\s\s*\+\s*@r\s*\s*,\s*\s*r3/i)) != null) {
      let rt = {
        pattern: "11100011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxl.wt @r,@s
    // Reference:  page 48
    // Reference: Weighted stores the number of 1 bits shifted out into RA

    if ((matched = str.match(/roxl.wt\s\s*\+\s*@r\s*\s*,\s*\s*r0/i)) != null) {
      let rt = {
        pattern: "11101000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxl.wt @r,@s
    // Reference:  page 48
    // Reference: Weighted stores the number of 1 bits shifted out into RA

    if ((matched = str.match(/roxl.wt\s\s*\+\s*@r\s*\s*,\s*\s*r1/i)) != null) {
      let rt = {
        pattern: "11101001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxl.wt @r,@s
    // Reference:  page 48
    // Reference: Weighted stores the number of 1 bits shifted out into RA

    if ((matched = str.match(/roxl.wt\s\s*\+\s*@r\s*\s*,\s*\s*r2/i)) != null) {
      let rt = {
        pattern: "11101010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxl.wt @r,@s
    // Reference:  page 48
    // Reference: Weighted stores the number of 1 bits shifted out into RA

    if ((matched = str.match(/roxl.wt\s\s*\+\s*@r\s*\s*,\s*\s*r3/i)) != null) {
      let rt = {
        pattern: "11101011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxr @r,@s
    // Reference:  page 48

    if ((matched = str.match(/roxr\s\s*\+\s*@r\s*\s*,\s*\s*r0/i)) != null) {
      let rt = {
        pattern: "11110000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxr @r,@s
    // Reference:  page 48

    if ((matched = str.match(/roxr\s\s*\+\s*@r\s*\s*,\s*\s*r1/i)) != null) {
      let rt = {
        pattern: "11110001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxr @r,@s
    // Reference:  page 48

    if ((matched = str.match(/roxr\s\s*\+\s*@r\s*\s*,\s*\s*r2/i)) != null) {
      let rt = {
        pattern: "11110010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxr @r,@s
    // Reference:  page 48

    if ((matched = str.match(/roxr\s\s*\+\s*@r\s*\s*,\s*\s*r3/i)) != null) {
      let rt = {
        pattern: "11110011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxr.wt @r,@s
    // Reference:  page 48
    // Reference: Weighted stores the number of 1 bits shifted out into RA

    if ((matched = str.match(/roxr.wt\s\s*\+\s*@r\s*\s*,\s*\s*r0/i)) != null) {
      let rt = {
        pattern: "11111000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxr.wt @r,@s
    // Reference:  page 48
    // Reference: Weighted stores the number of 1 bits shifted out into RA

    if ((matched = str.match(/roxr.wt\s\s*\+\s*@r\s*\s*,\s*\s*r1/i)) != null) {
      let rt = {
        pattern: "11111001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxr.wt @r,@s
    // Reference:  page 48
    // Reference: Weighted stores the number of 1 bits shifted out into RA

    if ((matched = str.match(/roxr.wt\s\s*\+\s*@r\s*\s*,\s*\s*r2/i)) != null) {
      let rt = {
        pattern: "11111010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // roxr.wt @r,@s
    // Reference:  page 48
    // Reference: Weighted stores the number of 1 bits shifted out into RA

    if ((matched = str.match(/roxr.wt\s\s*\+\s*@r\s*\s*,\s*\s*r3/i)) != null) {
      let rt = {
        pattern: "11111011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // btst @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/btst\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // btst @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/btst\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // btst @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/btst\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // btst @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/btst\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // btst @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/btst\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // btst @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/btst\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // btst @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/btst\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // btst @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/btst\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // btst @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/btst\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // btst @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/btst\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // btst @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/btst\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // btst @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/btst\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // btst @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/btst\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // btst @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/btst\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // btst @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/btst\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // btst @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/btst\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // btst @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/btst\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // btst @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/btst\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // btst @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/btst\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // btst @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/btst\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // btst @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/btst\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // btst @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/btst\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // btst @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/btst\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // btst @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/btst\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // btst @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/btst\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // btst @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/btst\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // btst @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/btst\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // btst @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/btst\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // btst @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/btst\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // btst @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/btst\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // btst @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/btst\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // btst @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/btst\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "000nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // btst @r,@s
    // Reference:  page 16

    if ((matched = str.match(/btst\s\s*\+\s*@r\s*\s*,\s*\s*r0/i)) != null) {
      let rt = {
        pattern: "00100000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // btst @r,@s
    // Reference:  page 16

    if ((matched = str.match(/btst\s\s*\+\s*@r\s*\s*,\s*\s*r1/i)) != null) {
      let rt = {
        pattern: "00100001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // btst @r,@s
    // Reference:  page 16

    if ((matched = str.match(/btst\s\s*\+\s*@r\s*\s*,\s*\s*r2/i)) != null) {
      let rt = {
        pattern: "00100010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // btst @r,@s
    // Reference:  page 16

    if ((matched = str.match(/btst\s\s*\+\s*@r\s*\s*,\s*\s*r3/i)) != null) {
      let rt = {
        pattern: "00100011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bchg @r,#@n
    // Reference:  page 15

    if ((matched = str.match(/bchg\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "0100nnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin4(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bchg @r,#@n
    // Reference:  page 15

    if ((matched = str.match(/bchg\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "0100nnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin4(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bchg @r,#@n
    // Reference:  page 15

    if ((matched = str.match(/bchg\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "0100nnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin4(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bchg @r,#@n
    // Reference:  page 15

    if ((matched = str.match(/bchg\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "0100nnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin4(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bchg @r,#@n
    // Reference:  page 15

    if ((matched = str.match(/bchg\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "0100nnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin4(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bchg @r,#@n
    // Reference:  page 15

    if ((matched = str.match(/bchg\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "0100nnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin4(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bchg @r,#@n
    // Reference:  page 15

    if ((matched = str.match(/bchg\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "0100nnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin4(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bchg @r,#@n
    // Reference:  page 15

    if ((matched = str.match(/bchg\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "0100nnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin4(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bchg @r,#@n
    // Reference:  page 15

    if ((matched = str.match(/bchg\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "0100nnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin4(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bchg @r,#@n
    // Reference:  page 15

    if ((matched = str.match(/bchg\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "0100nnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin4(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bchg @r,#@n
    // Reference:  page 15

    if ((matched = str.match(/bchg\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "0100nnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin4(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bchg @r,#@n
    // Reference:  page 15

    if ((matched = str.match(/bchg\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "0100nnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin4(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bchg @r,#@n
    // Reference:  page 15

    if ((matched = str.match(/bchg\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "0100nnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin4(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bchg @r,#@n
    // Reference:  page 15

    if ((matched = str.match(/bchg\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "0100nnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin4(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bchg @r,#@n
    // Reference:  page 15

    if ((matched = str.match(/bchg\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "0100nnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin4(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bchg @r,#@n
    // Reference:  page 15

    if ((matched = str.match(/bchg\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "0100nnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin4(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bchg @r,@s
    // Reference:  page 15

    if ((matched = str.match(/bchg\s\s*\+\s*@r\s*\s*,\s*\s*r0/i)) != null) {
      let rt = {
        pattern: "01100000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bchg @r,@s
    // Reference:  page 15

    if ((matched = str.match(/bchg\s\s*\+\s*@r\s*\s*,\s*\s*r1/i)) != null) {
      let rt = {
        pattern: "01100001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bchg @r,@s
    // Reference:  page 15

    if ((matched = str.match(/bchg\s\s*\+\s*@r\s*\s*,\s*\s*r2/i)) != null) {
      let rt = {
        pattern: "01100010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bchg @r,@s
    // Reference:  page 15

    if ((matched = str.match(/bchg\s\s*\+\s*@r\s*\s*,\s*\s*r3/i)) != null) {
      let rt = {
        pattern: "01100011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bclr @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bclr\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bclr @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bclr\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bclr @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bclr\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bclr @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bclr\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bclr @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bclr\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bclr @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bclr\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bclr @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bclr\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bclr @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bclr\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bclr @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bclr\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bclr @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bclr\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bclr @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bclr\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bclr @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bclr\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bclr @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bclr\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bclr @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bclr\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bclr @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bclr\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bclr @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bclr\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bclr @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bclr\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bclr @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bclr\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bclr @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bclr\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bclr @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bclr\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bclr @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bclr\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bclr @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bclr\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bclr @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bclr\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bclr @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bclr\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bclr @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bclr\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bclr @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bclr\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bclr @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bclr\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bclr @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bclr\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bclr @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bclr\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bclr @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bclr\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bclr @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bclr\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bclr @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bclr\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "100nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bclr @r,@s
    // Reference:  page 16

    if ((matched = str.match(/bclr\s\s*\+\s*@r\s*\s*,\s*\s*r0/i)) != null) {
      let rt = {
        pattern: "10100000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bclr @r,@s
    // Reference:  page 16

    if ((matched = str.match(/bclr\s\s*\+\s*@r\s*\s*,\s*\s*r1/i)) != null) {
      let rt = {
        pattern: "10100001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bclr @r,@s
    // Reference:  page 16

    if ((matched = str.match(/bclr\s\s*\+\s*@r\s*\s*,\s*\s*r2/i)) != null) {
      let rt = {
        pattern: "10100010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bclr @r,@s
    // Reference:  page 16

    if ((matched = str.match(/bclr\s\s*\+\s*@r\s*\s*,\s*\s*r3/i)) != null) {
      let rt = {
        pattern: "10100011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bset @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bset\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bset @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bset\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bset @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bset\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bset @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bset\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bset @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bset\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bset @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bset\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bset @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bset\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bset @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bset\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bset @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bset\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bset @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bset\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bset @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bset\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bset @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bset\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bset @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bset\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bset @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bset\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bset @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bset\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bset @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bset\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bset @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bset\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bset @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bset\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bset @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bset\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bset @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bset\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bset @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bset\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bset @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bset\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bset @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bset\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bset @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bset\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bset @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bset\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bset @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bset\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bset @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bset\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bset @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bset\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bset @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bset\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bset @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bset\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bset @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bset\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bset @r,#@n
    // Reference:  page 16

    if ((matched = str.match(/bset\s\s*\+\s*@r\s*\s*,\s*\s*#\s*\(\s*\w\s*\+\s*\s*\)\s*/i)) != null) {
      let rt = {
        pattern: "110nnnnn",
        retry: false
      };
      let value0 = emf.utils.convertToDecimal(matched[1]);
      if (value0 == undefined) {
        value0 = getEquateValue(matched[1]);
        if (value0 == undefined) {
          rt.retry = true;
          value0 = 0xeeee;
        }
      }
      rt.pattern = rt.pattern.replace(/n+/, emf.utils.bin5(value0));
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bset @r,@s
    // Reference:  page 16

    if ((matched = str.match(/bset\s\s*\+\s*@r\s*\s*,\s*\s*r0/i)) != null) {
      let rt = {
        pattern: "11100000",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bset @r,@s
    // Reference:  page 16

    if ((matched = str.match(/bset\s\s*\+\s*@r\s*\s*,\s*\s*r1/i)) != null) {
      let rt = {
        pattern: "11100001",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bset @r,@s
    // Reference:  page 16

    if ((matched = str.match(/bset\s\s*\+\s*@r\s*\s*,\s*\s*r2/i)) != null) {
      let rt = {
        pattern: "11100010",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    // bset @r,@s
    // Reference:  page 16

    if ((matched = str.match(/bset\s\s*\+\s*@r\s*\s*,\s*\s*r3/i)) != null) {
      let rt = {
        pattern: "11100011",
        retry: false
      };
      rt.data = [
        parseInt(rt.pattern.substr(0, 8), 2),
      ]
      return rt;
    }

    return pattern;
  }
  return {
    clearEquateMap,
    setEquateValue,
    getEquateMap,
    getEquateValue,

    start,
    assemble
  }
});