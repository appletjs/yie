import {Component, h} from 'preact';
import './RippleInk.less';

const InkClassName = 'ui-ripple-ink';

function getHolder(event) {
  let holder = event.target || event.currentTarget;
  return (holder && !holder.classList.contains(InkClassName))
    ? holder.querySelector('.' + InkClassName)
    : holder;
}

function startRipple(eventType, event, center) {
  let holder = getHolder(event);
  if (!holder) return;

  // Store the event use to generate this ripple on the holder: don't allow
  // further events of different types until we're done. Prevents double
  // ripples from mousedown/touchstart.
  const prev = holder.getAttribute('data-ui-event');
  if (prev && prev !== eventType) return;
  holder.setAttribute('data-ui-event', eventType);

  const rect = holder.getBoundingClientRect();
  let x = event.offsetX;
  let y;

  if (center) {
    x = rect.width / 2;
    y = rect.height / 2;
  } else if (x === undefined) {
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
  } else {
    y = event.offsetY;
  }

  const ripple = document.createElement('div');
  let max;

  if (rect.width === rect.height) {
    max = rect.width * 1.412;
  } else {
    max = Math.sqrt((rect.width * rect.width) + (rect.height * rect.height));
  }

  const dim = (max * 2) + 'px';

  ripple.style.width = dim;
  ripple.style.height = dim;
  ripple.style.marginLeft = -max + x + 'px';
  ripple.style.marginTop = -max + y + 'px';

  // Activite/add the element
  ripple.className = InkClassName + '__ink';
  holder.appendChild(ripple);

  setTimeout(function () {
    ripple.classList.add('is-held');
  }, 0);

  const releaseEvent = (eventType === 'mousedown' ? 'mouseup' : 'touchend');
  const handleRelease = function () {
    document.removeEventListener(releaseEvent, handleRelease);
    ripple.classList.add('is-done');
    // Larger than the animation duration in CSS
    setTimeout(function () {
      if (ripple.parentNode === holder) {
        holder.removeChild(ripple);
      }
      if (holder.children.length === 0) {
        holder.removeAttribute('data-ui-event');
      }
    }, 650);
  };

  document.addEventListener(releaseEvent, handleRelease);
}

function createMouseDown(center) {
  return function onMouseDown(e) {
    // Trigger on left click only
    if (e.button === 0) {
      startRipple(e.type, e, center);
    }
  };
}

function createTouchStart(center) {
  return function onTouchStart(e) {
    if (e.changedTouches) {
      for (let i = 0; i < e.changedTouches.length; ++i) {
        startRipple(e.type, e.changedTouches[i], center);
      }
    }
  };
}

// function handleCenteredMouseDown(e) {
//   // Trigger on left click only
//   if (e.button === 0) {
//     startRipple(e.type, e, true);
//   }
// }
//
// function handleCenteredTouchStart(e) {
//   if (e.changedTouches) {
//     for (let i = 0; i < e.changedTouches.length; ++i) {
//       startRipple(e.type, e.changedTouches[i], true);
//     }
//   }
// }
//
// function handleMouseDown(e) {
//   // Trigger on left click only
//   if (e.button === 0) {
//     startRipple(e.type, e);
//   }
// }
//
// function handleTouchStart(e) {
//   if (e.changedTouches) {
//     for (let i = 0; i < e.changedTouches.length; ++i) {
//       startRipple(e.type, e.changedTouches[i]);
//     }
//   }
// }

export default class RippleInk extends Component {
  // currentTrigger?: Element;
  // currentTouchStart?: EventListener;
  // currentMouseDown?: EventListener;

  bindRipple() {
    let {trigger, center} = this.props;
    if (typeof trigger === 'function') trigger = trigger();
    if (!trigger || trigger.nodeType !== 1) return;
    if (trigger === this.currentTrigger) return;
    this.destroyRipple();
    this.currentTrigger = trigger;
    // trigger.addEventListener('touchstart', this.currentTouchStart = center ? handleCenteredTouchStart : handleTouchStart);
    // trigger.addEventListener('mousedown', this.currentMouseDown = center ? handleCenteredMouseDown : handleMouseDown);
    trigger.addEventListener('touchstart', this.currentTouchStart = createTouchStart(center));
    trigger.addEventListener('mousedown', this.currentMouseDown = createMouseDown(center));
  }

  destroyRipple() {
    const trigger = this.currentTrigger;
    if (!trigger) return;
    delete this.currentTrigger;
    if (this.currentTouchStart) trigger.removeEventListener('touchstart', this.currentTouchStart);
    if (this.currentMouseDown) trigger.removeEventListener('mousedown', this.currentMouseDown);
    delete this.currentTouchStart;
    delete this.currentMouseDown;
  }

  componentDidMount() {
    setTimeout(this.bindRipple.bind(this));
  }

  componentWillUnmount() {
    this.destroyRipple();
  }

  componentWillReceiveProps() {
    this.bindRipple();
  }

  render() {
    return h('div', {className: InkClassName});
  }
}
