/*!
 * preact-transition v0.1.2
 * (c) 2018 Yingqin Zhang
 * Released under the MIT License.
 */
define('preact-transition', ['preact'], function (preact) {
  'use strict';

  // CSS 过渡代码使用了 Vue.js 的 transition 组件代码
  // 在此感谢 Vue 团队的无私奉献
  // https://github.com/vuejs/vue/blob/dev/src/platforms/web/runtime/transition-util.js

  var transformRE = /\b(transform|all)(,|$)/;
  var hasOwn = Object.prototype.hasOwnProperty;

  var TRANSITION = 'transition';
  var ANIMATION = 'animation';

  // Transition property/event sniffing
  var transitionProp = 'transition';
  var transitionEndEvent = 'transitionend';
  var animationProp = 'animation';
  var animationEndEvent = 'animationend';

  if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }

  if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }

  /**
   * Call a function asynchronously, as soon as possible. Makes
   * use of HTML Promise to schedule the callback if available,
   * otherwise falling back to `setTimeout` (mainly for IE<11).
   *
   * @param {Function} callback
   */
  var defer = window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : (typeof Promise === 'function'
      ? Promise.resolve().then.bind(Promise.resolve())
      : setTimeout);

  function has(obj, prop) {
    return hasOwn.call(obj, prop);
  }

  /**
   * 根据 CSS 动画类型，监听动画结束事件
   *
   * @param {Element} el
   * @param {string|undefined} expectedType
   * @param {function} cb
   * @return {*}
   */
  function whenTransitionEnds(el, expectedType, cb) {
    var ref = getTransitionInfo(el, expectedType);
    var type = ref.type;
    var timeout = ref.timeout;
    var propCount = ref.propCount;
    if (!type) {
      return cb(type);
    }

    var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
    var ended = 0;

    function end() {
      el.removeEventListener(event, onEnd);
      cb(type);
    }

    function onEnd(e) {
      if (e.target === el) {
        if (++ended >= propCount) {
          end();
        }
      }
    }

    setTimeout(function () {
      if (ended < propCount) {
        end();
      }
    }, timeout + 1);

    el.addEventListener(event, onEnd);
  }

  /**
   * 获取CSS过渡动画数据
   *
   * @param {Element} el
   * @param {string} [expectedType]
   * @return {{type:string,propCount:number,timeout:number,hasTransform:boolean}}
   */
  function getTransitionInfo(el, expectedType) {
    var styles = window.getComputedStyle(el);

    var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
    var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
    var transitionTimeout = getTimeout(transitionDelays, transitionDurations);

    var animationDelays = styles[animationProp + 'Delay'].split(', ');
    var animationDurations = styles[animationProp + 'Duration'].split(', ');
    var animationTimeout = getTimeout(animationDelays, animationDurations);

    var type;
    var timeout = 0;
    var propCount = 0;

    if (expectedType === TRANSITION) {
      if (transitionTimeout > 0) {
        type = TRANSITION;
        timeout = transitionTimeout;
        propCount = transitionDurations.length;
      }
    } else if (expectedType === ANIMATION) {
      if (animationTimeout > 0) {
        type = ANIMATION;
        timeout = animationTimeout;
        propCount = animationDurations.length;
      }
    } else {
      timeout = Math.max(transitionTimeout, animationTimeout);
      type = timeout > 0
        ? transitionTimeout > animationTimeout
          ? TRANSITION
          : ANIMATION
        : null;
      propCount = type
        ? type === TRANSITION
          ? transitionDurations.length
          : animationDurations.length
        : 0;
    }

    var hasTransform =
      type === TRANSITION &&
      transformRE.test(styles[transitionProp + 'Property']);

    return {
      type: type,
      timeout: timeout,
      propCount: propCount,
      hasTransform: hasTransform
    };
  }

  /**
   * @param {string[]} delays
   * @param {string[]} durations
   * @return {number}
   */
  function getTimeout(delays, durations) {
    while (delays.length < durations.length) {
      delays = delays.concat(delays);
    }

    return Math.max.apply(null, durations.map(function (d, i) {
      return toMs(d) + toMs(delays[i]);
    }));
  }

  /**
   * @param {string} s
   * @return {number}
   */
  function toMs(s) {
    return Number(s.slice(0, -1)) * 1000;
  }

  function isFunction(fn) {
    return typeof fn === 'function';
  }

  function without(obj, exclude) {
    var target = {};

    for (var k in obj) {
      if (has(obj, k) && exclude.indexOf(k) === -1) {
        target[k] = obj[k];
      }
    }

    return target;
  }

  function noop() {
    // nothing
  }

  var transitions = [
    'enter',
    'enter-active',
    'enter-to',
    'leave',
    'leave-active',
    'leave-to'
  ];

  var hooks = [
    'onBeforeEnter',
    'onEnter',
    'onAfterEnter',
    'onBeforeLeave',
    'onLeave',
    'onAfterLeave' ];

  var nonWrapProps = hooks.concat( ['type'],
    ['mode'],
    ['appear'],
    ['tag'],
    ['ref'],
    ['name'],
    ['css']
  );

  function transit(t, name, callback) {
    var setState = t.setState.bind(t);
    var key = name === 'enter' ? 0 : 3;
    var ref = t.props;
    var css = ref.css; if ( css === void 0 ) css = true;

    function hook() {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var fn = t.props[hooks[key]];
      if (!isFunction(fn)) { return; }
      return fn.apply(void 0, [ t.DOM ].concat( args ));
    }

    function after() {
      setState({transfer: ++key}, function () {
        defer(hook);// 执行 onAfterEnter/onAfterLeave
        callback && defer(function () { return callback(); });
      });
    }

    function setup() {
      setState({transfer: ++key}, function () {
        // 如果使用 css 动画，则自动检测何时结束
        if (css) {
          whenTransitionEnds(t.DOM, t.props.type, function (type) {
            hook(noop);// 执行 onEnter/onLeave

            if (type === TRANSITION || type === ANIMATION) {
              // 明确知道使用了CSS动画，则直接更新状态
              after();
            } else {
              defer(after);
            }
          });
        } else {
          // 只有通过 javascript 的钩子函数，才能确定过渡是否结束。
          // 执行 onEnter/onLeave
          hook(function (when) {
            if (when !== +when) { defer(after); }
            else { setTimeout(after, when); }
          });
        }
      });
    }

    function before() {
      hook();// 执行 onBeforeEnter/onBeforeLeave
      defer(setup);
    }

    setState({transfer: key}, function () {
      defer(before);
    });
  }

  function disappearTransit(t, name, callback) {
    var transfer = name === 'enter' ? 2 : 5;
    var hook = t.props[hooks[transfer]];
    t.setState({transfer: transfer}, function () {
      if (isFunction(hook)) { defer(function () { return hook(t.DOM, true); }); }
      if (isFunction(callback)) { defer(function () { return callback(); }); }
    });
  }

  function getHTMLElement(el) {
    return (el.base && el.base.nodeType && el.base.nodeName)
      ? getHTMLElement(el.base)
      : el;
  }

  /**
   * `Transition` 组件将作为过渡容器使用，
   * 所有的过渡类名都将作用在此容器上。
   */
  var Transition = (function (Component) {
    function Transition(props) {
      Component.call(this, props);
      this.state.transfer = -1;
      this.state.mode = undefined;
      this.DOM = null;
    }

    if ( Component ) Transition.__proto__ = Component;
    Transition.prototype = Object.create( Component && Component.prototype );
    Transition.prototype.constructor = Transition;

    Transition.prototype.componentDidMount = function componentDidMount () {
      var this$1 = this;

      var ref = this.props;
      var mode = ref.mode; if ( mode === void 0 ) mode = 'in';
      var appear = ref.appear; if ( appear === void 0 ) appear = false;
      var isEnter = mode === 'in';
      var callback = function () { return this$1.setState({mode: mode}); };
      if (!appear) { disappearTransit(this, isEnter ? 'enter' : 'leave', callback); }
      else if (isEnter) { transit(this, 'enter', callback); }
      else { transit(this, 'leave', callback); }
    };

    Transition.prototype.componentWillReceiveProps = function componentWillReceiveProps (ref) {
      var this$1 = this;
      var mode = ref.mode;

      if (!mode || mode === this.state.mode) { return; }
      var callback = function () { return this$1.setState({mode: mode}); };
      if (mode === 'in') { transit(this, 'enter', callback); }
      else { transit(this, 'leave', callback); }
    };

    Transition.prototype.render = function render (props, ref$1) {
      var this$1 = this;
      var transfer = ref$1.transfer; if ( transfer === void 0 ) transfer = -1;

      var ref = props.ref;
      var name = props.name; if ( name === void 0 ) name = 't';
      var css = props.css; if ( css === void 0 ) css = true;
      var attrs = without(props, nonWrapProps);

      attrs.ref = function (node) {
        isFunction(ref) && ref(node);
        this$1.DOM = node && getHTMLElement(node);
      };

      if (css && transitions[transfer]) {
        attrs.className = [
          attrs.className,
          name + '-' + transitions[transfer]
        ]
          .filter(Boolean)
          .join(' ');
      }

      return preact.h(props.tag || 'div', attrs);
    };

    return Transition;
  }(preact.Component));

  return Transition;

});
