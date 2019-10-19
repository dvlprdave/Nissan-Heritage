// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"app.js":[function(require,module,exports) {
function init() {
  var slides = document.querySelectorAll('.slide');
  var pages = document.querySelectorAll('.page');
  var backgrounds = ["radial-gradient(#2B3760, #0B1023)", "radial-gradient(#4E3022, #161616)", "radial-gradient(#4E4342, #161616)"];
  var current = 0; // Page tracker

  var scrollSlide = 0;
  slides.forEach(function (slide, index) {
    slide.addEventListener('click', function () {
      changeDots(this);
      nextSlide(index);
      scrollSlide = index;
    });
  });

  function changeDots(dot) {
    slides.forEach(function (slide) {
      return slide.classList.remove('active');
    });
    dot.classList.add('active');
  }

  function nextSlide(pageNumber) {
    var nextPage = pages[pageNumber];
    var currentPage = pages[current];
    var nextLeft = nextPage.querySelectorAll('.hero .model-left');
    var nextRight = nextPage.querySelectorAll('.hero .model-right');
    var currentLeft = currentPage.querySelectorAll('.hero .model-left');
    var currentRight = currentPage.querySelectorAll('.hero .model-right');
    var nextText = nextPage.querySelectorAll('.details');
    var portfolio = document.getElementById('portfolio');
    /* -------------------- TimeLineMax / Page Dot Animations ------------------- */

    var timeLine = new TimelineMax();
    timeLine.fromTo(currentLeft, 0.3, {
      y: '-10%'
    }, {
      y: '-100%'
    }).fromTo(currentRight, 0.3, {
      y: '10%'
    }, {
      y: '-100%'
    }, '-=0.2').to(portfolio, 0.3, {
      backgroundImage: backgrounds[pageNumber]
    }).fromTo(currentPage, 0.3, {
      opacity: 1,
      pointerEvents: 'all'
    }, {
      opacity: 0,
      pointerEvents: 'none'
    }).fromTo(nextPage, 0.3, {
      opacity: 0,
      pointerEvents: 'none'
    }, {
      opacity: 1,
      pointerEvents: 'all'
    }, '-=0.6').fromTo(nextLeft, 0.3, {
      y: '-100%'
    }, {
      y: '-10%'
    }, '-=0.6').fromTo(nextRight, 0.3, {
      y: '-100%'
    }, {
      y: '10%'
    }, '-=0.8').fromTo(nextText, 0.3, {
      opacity: 0,
      y: 0
    }, {
      opacity: 1,
      y: 0
    }) // Fix left and right image hover
    .set(nextLeft, {
      clearProps: 'all'
    }).set(nextRight, {
      clearProps: 'all'
    });
    current = pageNumber;
  } // Don't execute more than once every 1400ms


  document.addEventListener('wheel', throttle(scrollChange, 1400));
  document.addEventListener('touchmove', throttle(scrollChange, 1400)); // allow on mobile

  function switchDots(dotNumber) {
    var activeDot = document.querySelectorAll('.slide')[dotNumber];
    slides.forEach(function (slide) {
      return slide.classList.remove('active');
    });
    activeDot.classList.add('active');
  } // Track dot(page) number when scrolling 


  function scrollChange(e) {
    if (e.deltaY > 0) {
      scrollSlide += 1;
    } else {
      scrollSlide -= 1;
    }

    if (scrollSlide > 2) {
      scrollSlide = 0;
    }

    if (scrollSlide < 0) {
      scrollSlide = 2;
    }

    switchDots(scrollSlide);
    nextSlide(scrollSlide);
  }
  /**************************************
   Throttling makes it so a function is 
   called a set number of times over a 
   given period. 
  ****************************************/


  function throttle(func, limit) {
    var inThrottle;
    return function () {
      var args = arguments;
      var context = this;

      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(function () {
          return inThrottle = false;
        }, limit);
      }
    };
  }
  /* -------------------------------- Hamburger ------------------------------- */


  var hamburger = document.querySelector('.menu');
  var hamburgerLines = document.querySelectorAll('.menu line');
  var navOpen = document.querySelector('.nav-open');
  var contact = document.querySelector('.contact');
  var social = document.querySelector('.social');
  var logo = document.getElementById('logo');
  var timeLine = new TimelineMax({
    paused: true,
    reversed: true
  });
  timeLine.to(navOpen, 0.5, {
    y: 0
  }).fromTo(contact, 0.5, {
    opacity: 0,
    y: 10
  }, {
    opacity: 1,
    y: 0
  }, "-=0.1").fromTo(social, 0.5, {
    opacity: 0,
    y: 10
  }, {
    opacity: 1,
    y: 0
  }, "-=0.5").fromTo(logo, 0.2, {
    color: "white"
  }, {
    color: "black"
  }, "-=1").fromTo(hamburgerLines, 0.2, {
    stroke: "white"
  }, {
    stroke: "black"
  }, "-=1");
  hamburger.addEventListener('click', function () {
    timeLine.reversed() ? timeLine.play() : timeLine.reverse();
  });
}

init();
},{}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55869" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map