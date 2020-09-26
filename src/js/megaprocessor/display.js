let megaprocessor_display = (function(bus, options) {
  let ledDisplayMap = undefined;
  let ledDisplayMapNeedsRefresh = undefined;
  let optimised = true;
  let nativeOffset = 256;
  let ledOn;
  let ledOff;
  let mainSurface;
  let width = 32;
  let height = 64;
  let gfxWidth = 8;
  let hook = {
    onWrite8: function(addr, data) {
      let startAddress = 0xA000; // i.e. 40960
      // screen order:
      // byte0 1 2 3
      // bit0 b1 b2 b3 b4 b5 b6 b7 within each byte
      let offset = addr - startAddress;
      let idx = offset * 8;
      for (let mask = 1; mask != 256; mask <<= 1, ++idx) {
        ledDisplayMap[idx] = (data & mask) ? true : false;
        ledDisplayMapNeedsRefresh[idx] = true;
      }
    },
    onRead8: function(addr, data) {
      return data;
    },
  };

  (function ctor() {
    sgxSurface = sgxskeleton.init(width * gfxWidth, height * gfxWidth);
    mainSurface = sgx.graphics.DrawSurfaceManager.get().getDisplaySurface();

    ledOn = sgx.graphics.TextureManager.get().registerScenarioTexture("res/on");
    ledOff = sgx.graphics.TextureManager.get().registerScenarioTexture("res/off");

    start();
  })();

  function start() {
    ledDisplayMap = new Array(width * height);
    ledDisplayMapNeedsRefresh = new Array(width * height).fill(true);
    //
    for (let i = 0; i < ledDisplayMap.length; ++i) {
      ledDisplayMap[i] = sgxRand() > 0.5 ? true : false;
    }
    //
    if (bus) {
      setInterval(() => {
        render();
      }, 1000 / 50)
    }
  }

  function reset() {
    ledDisplayMapNeedsRefresh.fill(true);
  }

  function drawDot(idx) {
    let dotTexture = ledDisplayMap[idx] ? ledOn : ledOff;
    let x = (idx % width) * gfxWidth;
    let y = Math.floor(idx / width) * gfxWidth;

    mainSurface.setFillColor(sgxColorRGBA.White);
    mainSurface.setFillTexture(dotTexture);
    mainSurface.fillPoint(x, y, CSGXDrawSurface.eFromTopLeft);
  }

  function render() {
    for (let i = 0; i < ledDisplayMap.length; ++i) {
      if (!optimised || ledDisplayMapNeedsRefresh[i]) {
        drawDot(i);
        ledDisplayMapNeedsRefresh[i] = false;
      }
    }
  }

  return {
    start,
    reset,
    render,
    hook
  }
});