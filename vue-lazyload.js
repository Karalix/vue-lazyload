/*!
 * Vue-Lazyload.js v1.0.4
 * (c) 2017 Awe <hilongjw@gmail.com>
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueLazyload = factory());
}(this, (function () { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get$1 = function get$1(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get$1(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var inBrowser = typeof window !== 'undefined';

function remove$1(arr, item) {
    if (!arr.length) return;
    var index = arr.indexOf(item);
    if (index > -1) return arr.splice(index, 1);
}

function assign(target, source) {
    if (!target || !source) return target || {};
    if (target instanceof Object) {
        for (var key in source) {
            target[key] = source[key];
        }
    }
    return target;
}

function some(arr, fn) {
    var has = false;
    for (var i = 0, len = arr.length; i < len; i++) {
        if (fn(arr[i])) {
            has = true;
            break;
        }
    }
    return has;
}

function getBestSelectionFromSrcset(el, scale) {
    if (el.tagName !== 'IMG' || !el.getAttribute('data-srcset')) return;

    var options = el.getAttribute('data-srcset');
    var result = [];
    var container = el.parentNode;
    var containerWidth = container.offsetWidth * scale;

    var spaceIndex = void 0;
    var tmpSrc = void 0;
    var tmpWidth = void 0;

    options = options.trim().split(',');

    options.map(function (item) {
        item = item.trim();
        spaceIndex = item.lastIndexOf(' ');
        if (spaceIndex === -1) {
            tmpSrc = item;
            tmpWidth = 999998;
        } else {
            tmpSrc = item.substr(0, spaceIndex);
            tmpWidth = parseInt(item.substr(spaceIndex + 1, item.length - spaceIndex - 2), 10);
        }
        result.push([tmpWidth, tmpSrc]);
    });

    result.sort(function (a, b) {
        if (a[0] < b[0]) {
            return -1;
        }
        if (a[0] > b[0]) {
            return 1;
        }
        if (a[0] === b[0]) {
            if (b[1].indexOf('.webp', b[1].length - 5) !== -1) {
                return 1;
            }
            if (a[1].indexOf('.webp', a[1].length - 5) !== -1) {
                return -1;
            }
        }
        return 0;
    });
    var bestSelectedSrc = '';
    var tmpOption = void 0;
    var resultCount = result.length;

    for (var i = 0; i < resultCount; i++) {
        tmpOption = result[i];
        if (tmpOption[0] >= containerWidth) {
            bestSelectedSrc = tmpOption[1];
            break;
        }
    }

    return bestSelectedSrc;
}

function find(arr, fn) {
    var item = void 0;
    for (var i = 0, len = arr.length; i < len; i++) {
        if (fn(arr[i])) {
            item = arr[i];
            break;
        }
    }
    return item;
}

var getDPR = function getDPR() {
    var scale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    return inBrowser && window.devicePixelRatio || scale;
};

function supportWebp() {
    if (!inBrowser) return false;

    var support = true;
    var d = document;

    try {
        var el = d.createElement('object');
        el.type = 'image/webp';
        el.style.visibility = 'hidden';
        el.innerHTML = '!';
        d.body.appendChild(el);
        support = !el.offsetWidth;
        d.body.removeChild(el);
    } catch (err) {
        support = false;
    }

    return support;
}

function throttle(action, delay) {
    var timeout = null;
    var lastRun = 0;
    return function () {
        if (timeout) {
            return;
        }
        var elapsed = Date.now() - lastRun;
        var context = this;
        var args = arguments;
        var runCallback = function runCallback() {
            lastRun = Date.now();
            timeout = false;
            action.apply(context, args);
        };
        if (elapsed >= delay) {
            runCallback();
        } else {
            timeout = setTimeout(runCallback, delay);
        }
    };
}

function testSupportsPassive() {
    if (!inBrowser) return;
    var support = false;
    try {
        var opts = Object.defineProperty({}, 'passive', {
            get: function get() {
                support = true;
            }
        });
        window.addEventListener("test", null, opts);
    } catch (e) {}
    return support;
}

var supportsPassive = testSupportsPassive();

var _ = {
    on: function on(el, type, func) {
        if (supportsPassive) {
            el.addEventListener(type, func, {
                passive: true
            });
        } else {
            el.addEventListener(type, func, false);
        }
    },
    off: function off(el, type, func) {
        el.removeEventListener(type, func);
    }
};

var loadImageAsync = function loadImageAsync(item, resolve, reject) {
    var image = new Image();
    image.src = item.src;

    image.onload = function () {
        resolve({
            naturalHeight: image.naturalHeight,
            naturalWidth: image.naturalWidth,
            src: image.src
        });
    };

    image.onerror = function (e) {
        reject(e);
    };
};

var style = function style(el, prop) {
    return typeof getComputedStyle !== 'undefined' ? getComputedStyle(el, null).getPropertyValue(prop) : el.style[prop];
};

var overflow = function overflow(el) {
    return style(el, 'overflow') + style(el, 'overflow-y') + style(el, 'overflow-x');
};

var scrollParent = function scrollParent(el) {
    if (!inBrowser) return;
    if (!(el instanceof HTMLElement)) {
        return window;
    }

    var parent = el;

    while (parent) {
        if (parent === document.body || parent === document.documentElement) {
            break;
        }

        if (!parent.parentNode) {
            break;
        }

        if (/(scroll|auto)/.test(overflow(parent))) {
            return parent;
        }

        parent = parent.parentNode;
    }

    return window;
};

function isObject(obj) {
    return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
}

function ObjectKeys(obj) {
    if (!(obj instanceof Object)) return [];
    if (Object.keys) {
        return Object.keys(obj);
    } else {
        var keys = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
        return keys;
    }
}

var imageCache = {};

var ReactiveListener = function () {
    function ReactiveListener(_ref) {
        var el = _ref.el,
            src = _ref.src,
            error = _ref.error,
            loading = _ref.loading,
            bindType = _ref.bindType,
            $parent = _ref.$parent,
            options = _ref.options,
            elRenderer = _ref.elRenderer;
        classCallCheck(this, ReactiveListener);

        this.el = el;
        this.src = src;
        this.error = error;
        this.loading = loading;
        this.bindType = bindType;
        this.attempt = 0;

        this.naturalHeight = 0;
        this.naturalWidth = 0;

        this.options = options;

        this.filter();

        this.initState();

        this.performanceData = {
            init: Date.now(),
            loadStart: null,
            loadEnd: null
        };

        this.rect = el.getBoundingClientRect();

        this.$parent = $parent;
        this.elRenderer = elRenderer;
        this.render('loading', false);
    }

    /**
     * init listener state
     * @return
     */


    createClass(ReactiveListener, [{
        key: 'initState',
        value: function initState() {
            this.state = {
                error: false,
                loaded: false,
                rendered: false,
                rested: false
            };
        }

        /**
         * record performance
         * @return
         */

    }, {
        key: 'record',
        value: function record(event) {
            this.performanceData[event] = Date.now();
        }

        /**
         * update image listener data
         * @param  {String} image uri
         * @param  {String} loading image uri
         * @param  {String} error image uri
         * @return
         */

    }, {
        key: 'update',
        value: function update(_ref2) {
            var src = _ref2.src,
                loading = _ref2.loading,
                error = _ref2.error;

            var oldSrc = this.src;
            this.src = src;
            this.loading = loading;
            this.error = error;
            this.filter();
            if (oldSrc !== this.src) {
                this.attempt = 0;
                this.initState();
            }
        }

        /**
         * get el node rect
         * @return
         */

    }, {
        key: 'getRect',
        value: function getRect() {
            this.rect = this.el.getBoundingClientRect();
        }

        /**
         *  check el is near
         * @return {Boolean} el is near
         */

    }, {
        key: 'checkIsNear',
        value: function checkIsNear() {
            this.getRect();
            return this.rect.top < window.innerHeight * this.options.preLoad * 1.5 && this.rect.bottom > this.options.preLoadTop && this.rect.left < window.innerWidth * this.options.preLoad * 1.5 && this.rect.right > 0;
        }

        /**
         *  check el is in view
         * @return {Boolean} el is in view
         */

    }, {
        key: 'checkInView',
        value: function checkInView() {
            this.getRect();
            return this.rect.top < window.innerHeight * this.options.preLoad && this.rect.bottom > this.options.preLoadTop && this.rect.left < window.innerWidth * this.options.preLoad && this.rect.right > 0;
        }

        /**
         * listener filter
         */

    }, {
        key: 'filter',
        value: function filter() {
            var _this = this;

            ObjectKeys(this.options.filter).map(function (key) {
                _this.options.filter[key](_this, _this.options);
            });
        }

        /**
         * render loading first
         * @params cb:Function
         * @return
         */

    }, {
        key: 'renderLoading',
        value: function renderLoading(cb) {
            var _this2 = this;

            loadImageAsync({
                src: this.loading
            }, function (data) {
                _this2.render('loading', false);
                cb();
            });
        }

        /**
         * try load image and  render it
         * @return
         */

    }, {
        key: 'load',
        value: function load() {
            var _this3 = this;

            if (this.attempt > this.options.attempt - 1 && this.state.error) {
                if (!this.options.silent) console.log('error end');
                return;
            }

            if (this.state.loaded || imageCache[this.src]) {
                return this.render('loaded', true);
            }

            this.renderLoading(function () {
                _this3.attempt++;

                _this3.record('loadStart');

                loadImageAsync({
                    src: _this3.src
                }, function (data) {
                    _this3.naturalHeight = data.naturalHeight;
                    _this3.naturalWidth = data.naturalWidth;
                    _this3.state.loaded = true;
                    _this3.state.error = false;
                    _this3.record('loadEnd');
                    _this3.render('loaded', false);
                    imageCache[_this3.src] = 1;
                }, function (err) {
                    _this3.state.error = true;
                    _this3.state.loaded = false;
                    _this3.render('error', false);
                });
            });
        }
    }, {
        key: 'rest',
        value: function rest() {
            this.state.rested = true;
        }
    }, {
        key: 'unrest',
        value: function unrest() {
            this.state.rested = false;
        }

        /**
         * render image
         * @param  {String} state to render // ['loading', 'src', 'error']
         * @param  {String} is form cache
         * @return
         */

    }, {
        key: 'render',
        value: function render(state, cache) {
            this.elRenderer(this, state, cache);
        }

        /**
         * output performance data
         * @return {Object} performance data
         */

    }, {
        key: 'performance',
        value: function performance() {
            var state = 'loading';
            var time = 0;

            if (this.state.loaded) {
                state = 'loaded';
                time = (this.performanceData.loadEnd - this.performanceData.loadStart) / 1000;
            }

            if (this.state.error) state = 'error';

            return {
                src: this.src,
                state: state,
                time: time
            };
        }

        /**
         * destroy
         * @return
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            this.el = null;
            this.src = null;
            this.error = null;
            this.loading = null;
            this.bindType = null;
            this.attempt = 0;
        }
    }]);
    return ReactiveListener;
}();

var DEFAULT_URL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
var DEFAULT_EVENTS = ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove'];

var Lazy = function (Vue) {
    return function () {
        function Lazy(_ref) {
            var _this = this;

            var preLoad = _ref.preLoad,
                error = _ref.error,
                preLoadTop = _ref.preLoadTop,
                loading = _ref.loading,
                attempt = _ref.attempt,
                silent = _ref.silent,
                scale = _ref.scale,
                listenEvents = _ref.listenEvents,
                hasbind = _ref.hasbind,
                filter = _ref.filter,
                adapter = _ref.adapter;
            classCallCheck(this, Lazy);

            this.ListenerQueue = [];
            this.TargetIndex = 0;
            this.TargetQueue = [];
            this.options = {
                silent: silent || true,
                preLoad: preLoad || 1.3,
                preLoadTop: preLoadTop || 0,
                error: error || DEFAULT_URL,
                loading: loading || DEFAULT_URL,
                attempt: attempt || 3,
                scale: scale || getDPR(scale),
                ListenEvents: listenEvents || DEFAULT_EVENTS,
                hasbind: false,
                supportWebp: supportWebp(),
                filter: filter || {},
                adapter: adapter || {}
            };
            this._initEvent();

            this.lazyLoadHandler = throttle(function () {
                var catIn = false;
                _this.ListenerQueue.forEach(function (listener) {
                    if (listener.state.loaded) {
                        if (!listener.state.rested) {
                            catIn = listener.checkIsNear();
                            !catIn && listener.rest();
                        } else {
                            catIn = listener.checkInView();
                            catIn && listener.unrest();
                        }
                    } else {
                        catIn = listener.checkInView();
                        catIn && listener.load();
                    }
                });
            }, 100);
        }

        /**
         * update config
         * @param  {Object} config params
         * @return
         */


        createClass(Lazy, [{
            key: 'config',
            value: function config() {
                var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                assign(this.options, options);
            }

            /**
             * output listener's load performance
             * @return {Array} 
             */

        }, {
            key: 'performance',
            value: function performance() {
                var list = [];

                this.ListenerQueue.map(function (item) {
                    list.push(item.performance());
                });

                return list;
            }

            /**
             * add lazy component to queue
             * @param  {Vue} vm lazy component instance
             * @return
             */

        }, {
            key: 'addLazyBox',
            value: function addLazyBox(vm) {
                this.ListenerQueue.push(vm);
                if (inBrowser) {
                    this._addListenerTarget(window);
                    if (vm.$el && vm.$el.parentNode) {
                        this._addListenerTarget(vm.$el.parentNode);
                    }
                }
            }

            /**
             * add image listener to queue
             * @param  {DOM} el 
             * @param  {object} binding vue directive binding
             * @param  {vnode} vnode vue directive vnode
             * @return
             */

        }, {
            key: 'add',
            value: function add(el, binding, vnode) {
                var _this2 = this;

                if (some(this.ListenerQueue, function (item) {
                    return item.el === el;
                })) {
                    this.update(el, binding);
                    return Vue.nextTick(this.lazyLoadHandler);
                }

                var _valueFormatter2 = this._valueFormatter(binding.value),
                    src = _valueFormatter2.src,
                    loading = _valueFormatter2.loading,
                    error = _valueFormatter2.error;

                Vue.nextTick(function () {
                    src = getBestSelectionFromSrcset(el, _this2.options.scale) || src;

                    var container = Object.keys(binding.modifiers)[0];
                    var $parent = void 0;

                    if (container) {
                        $parent = vnode.context.$refs[container];
                        // if there is container passed in, try ref first, then fallback to getElementById to support the original usage
                        $parent = $parent ? $parent.$el || $parent : document.getElementById(container);
                    }

                    if (!$parent) {
                        $parent = scrollParent(el);
                    }

                    var newListener = new ReactiveListener({
                        bindType: binding.arg,
                        $parent: $parent,
                        el: el,
                        loading: loading,
                        error: error,
                        src: src,
                        elRenderer: _this2._elRenderer.bind(_this2),
                        options: _this2.options
                    });

                    _this2.ListenerQueue.push(newListener);
                    if (inBrowser) {
                        _this2._addListenerTarget(window);
                        _this2._addListenerTarget($parent);
                    }

                    _this2.lazyLoadHandler();
                    Vue.nextTick(function () {
                        return _this2.lazyLoadHandler();
                    });
                });
            }

            /**
            * update image src
            * @param  {DOM} el 
            * @param  {object} vue directive binding
            * @return
            */

        }, {
            key: 'update',
            value: function update(el, binding) {
                var _this3 = this;

                var _valueFormatter3 = this._valueFormatter(binding.value),
                    src = _valueFormatter3.src,
                    loading = _valueFormatter3.loading,
                    error = _valueFormatter3.error;

                var exist = find(this.ListenerQueue, function (item) {
                    return item.el === el;
                });

                exist && exist.update({
                    src: src,
                    loading: loading,
                    error: error
                });
                this.lazyLoadHandler();
                Vue.nextTick(function () {
                    return _this3.lazyLoadHandler();
                });
            }

            /**
             * remove listener form list
             * @param  {DOM} el 
             * @return
             */

        }, {
            key: 'remove',
            value: function remove(el) {
                if (!el) return;
                var existItem = find(this.ListenerQueue, function (item) {
                    return item.el === el;
                });
                if (existItem) {
                    this._removeListenerTarget(existItem.$parent);
                    this._removeListenerTarget(window);
                    remove$1(this.ListenerQueue, existItem) && existItem.destroy();
                }
            }

            /**
             * remove lazy components form list
             * @param  {Vue} vm Vue instance 
             * @return
             */

        }, {
            key: 'removeComponent',
            value: function removeComponent(vm) {
                if (!vm) return;
                remove$1(this.ListenerQueue, vm);
                if (vm.$parent && vm.$el.parentNode) {
                    this._removeListenerTarget(vm.$el.parentNode);
                }
                this._removeListenerTarget(window);
            }

            /**** Private functions ****/

            /**
             * add listener target
             * @param  {DOM} el listener target 
             * @return
             */

        }, {
            key: '_addListenerTarget',
            value: function _addListenerTarget(el) {
                if (!el) return;
                var target = find(this.TargetQueue, function (target) {
                    return target.el === el;
                });
                if (!target) {
                    target = {
                        el: el,
                        id: ++this.TargetIndex,
                        childrenCount: 1,
                        listened: true
                    };
                    this._initListen(target.el, true);
                    this.TargetQueue.push(target);
                } else {
                    target.childrenCount++;
                }
                return this.TargetIndex;
            }

            /**
             * remove listener target or reduce target childrenCount
             * @param  {DOM} el or window
             * @return
             */

        }, {
            key: '_removeListenerTarget',
            value: function _removeListenerTarget(el) {
                var _this4 = this;

                this.TargetQueue.forEach(function (target, index) {
                    if (target.el === el) {
                        target.childrenCount--;
                        if (!target.childrenCount) {
                            _this4._initListen(target.el, false);
                            _this4.TargetQueue.splice(index, 1);
                            target = null;
                        }
                    }
                });
            }

            /**
             * add or remove eventlistener
             * @param  {DOM} el DOM or Window
             * @param  {boolean} start flag
             * @return
             */

        }, {
            key: '_initListen',
            value: function _initListen(el, start) {
                var _this5 = this;

                this.options.ListenEvents.forEach(function (evt) {
                    return _[start ? 'on' : 'off'](el, evt, _this5.lazyLoadHandler);
                });
            }
        }, {
            key: '_initEvent',
            value: function _initEvent() {
                var _this6 = this;

                this.Event = {
                    listeners: {
                        loading: [],
                        loaded: [],
                        error: []
                    }
                };

                this.$on = function (event, func) {
                    _this6.Event.listeners[event].push(func);
                };

                this.$once = function (event, func) {
                    var vm = _this6;
                    function on() {
                        vm.$off(event, on);
                        func.apply(vm, arguments);
                    }
                    _this6.$on(event, on);
                };

                this.$off = function (event, func) {
                    if (!func) {
                        _this6.Event.listeners[event] = [];
                        return;
                    }
                    remove$1(_this6.Event.listeners[event], func);
                };

                this.$emit = function (event, context, inCache) {
                    _this6.Event.listeners[event].forEach(function (func) {
                        return func(context, inCache);
                    });
                };
            }

            /**
             * set element attribute with image'url and state
             * @param  {object} lazyload listener object
             * @param  {string} state will be rendered
             * @param  {bool} inCache  is rendered from cache 
             * @return
             */

        }, {
            key: '_elRenderer',
            value: function _elRenderer(listener, state, cache) {
                if (!listener.el) return;
                var el = listener.el,
                    bindType = listener.bindType;


                var src = void 0;
                switch (state) {
                    case 'loading':
                        src = listener.loading;
                        break;
                    case 'error':
                        src = listener.error;
                        break;
                    default:
                        src = listener.src;
                        break;
                }

                if (bindType) {
                    el.style[bindType] = 'url(' + src + ')';
                } else if (el.getAttribute('src') !== src) {
                    el.setAttribute('src', src);
                }

                el.setAttribute('lazy', state);

                this.$emit(state, listener, cache);
                this.options.adapter[state] && this.options.adapter[state](listener, this.options);
            }

            /**
             * generate loading loaded error image url 
             * @param {string} image's src
             * @return {object} image's loading, loaded, error url
             */

        }, {
            key: '_valueFormatter',
            value: function _valueFormatter(value) {
                var src = value;
                var loading = this.options.loading;
                var error = this.options.error;

                // value is object
                if (isObject(value)) {
                    if (!value.src && !this.options.silent) console.error('Vue Lazyload warning: miss src with ' + value);
                    src = value.src;
                    loading = value.loading || this.options.loading;
                    error = value.error || this.options.error;
                }
                return {
                    src: src,
                    loading: loading,
                    error: error
                };
            }
        }]);
        return Lazy;
    }();
}

var LazyComponent = (function (lazy) {
    return {
        props: {
            tag: {
                type: String,
                default: 'div'
            }
        },
        render: function render(h) {
            if (this.show === false) {
                return h(this.tag);
            }
            return h(this.tag, null, this.$slots.default);
        },
        data: function data() {
            return {
                state: {
                    loaded: false,
                    rested: false
                },
                rect: {},
                show: false
            };
        },
        mounted: function mounted() {
            lazy.addLazyBox(this);
            lazy.lazyLoadHandler();
        },
        beforeDestroy: function beforeDestroy() {
            lazy.removeComponent(this);
        },

        methods: {
            getRect: function getRect() {
                this.rect = this.$el.getBoundingClientRect();
            },
            checkInView: function checkInView() {
                this.getRect();
                return inBrowser && this.rect.top < window.innerHeight * lazy.options.preLoad && this.rect.bottom > 0 && this.rect.left < window.innerWidth * lazy.options.preLoad && this.rect.right > 0;
            },
            checkIsNear: function checkIsNear() {
                this.getRect();
                return inBrowser && this.rect.top < window.innerHeight * lazy.options.preLoad * 1.5 && this.rect.bottom > 0 && this.rect.left < window.innerWidth * lazy.options.preLoad * 1.5 && this.rect.right > 0;
            },
            load: function load() {
                this.show = true;
                this.state.loaded = true;
                this.$emit('show', this);
            },
            rest: function rest() {
                this.state.rested = true;
                this.$emit('rest', this);
            },
            unrest: function unrest() {
                this.state.rested = false;
                this.$emit('unrest', this);
            }
        }
    };
});

var index = {
    /**
     * install function
     * @param  {Vue} Vue
     * @param  {object} options  lazyload options
     */
    install: function install(Vue) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var LazyClass = Lazy(Vue);
        var lazy = new LazyClass(options);

        var isVueNext = Vue.version.split('.')[0] === '2';

        Vue.prototype.$Lazyload = lazy;

        if (options.lazyComponent) {
            Vue.component('lazy-component', LazyComponent(lazy));
        }

        if (isVueNext) {
            Vue.directive('lazy', {
                bind: lazy.add.bind(lazy),
                update: lazy.update.bind(lazy),
                componentUpdated: lazy.lazyLoadHandler.bind(lazy),
                unbind: lazy.remove.bind(lazy)
            });
        } else {
            Vue.directive('lazy', {
                bind: lazy.lazyLoadHandler.bind(lazy),
                update: function update(newValue, oldValue) {
                    assign(this.vm.$refs, this.vm.$els);
                    lazy.add(this.el, {
                        modifiers: this.modifiers || {},
                        arg: this.arg,
                        value: newValue,
                        oldValue: oldValue
                    }, {
                        context: this.vm
                    });
                },
                unbind: function unbind() {
                    lazy.remove(this.el);
                }
            });
        }
    }
};

return index;

})));
