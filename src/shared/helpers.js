const hasOwn = Object.prototype.hasOwnProperty;

export function contains(obj, prop) {
  return obj != null && hasOwn.call(obj, prop);
}

export function callHook(obj, name, ...args) {
  if (typeof obj[name] === 'function') {
    return obj[name](...args);
  }
}

export function identity(v) {
  return v;
}

export function unary(fn) {
  return function (arg) {
    return fn(arg);
  };
}

export function spread(fn) {
  return function (args) {
    return fn(...args);
  };
}

export function gather(fn) {
  return function (...args) {
    return fn(args);
  };
}

/**
 * @param {string} str
 * @param {string | RegExp} separator
 * @return {function(*): *}
 */
export function makeAccessor(str, separator = ',') {
  const map = Object.create(null);
  const list = str.split(separator);

  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }

  return val => map[val];
}

export function without(obj, exclude) {
  const target = {};

  for (const k in obj) {
    if (contains(obj, k) && exclude.indexOf(k) === -1) {
      target[k] = obj[k];
    }
  }

  return target;
}

/**
 * Create a cached version of a pure function.
 *
 * @param {function(string=): *} fn
 * @return {function(string=): *}
 */
export function cached(fn) {
  const cache = Object.create(null);
  return function hitHandle(str) {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

const unitRE = /(px|r?em|vw|vh|dp)$/;

export function convertSize(size, unit = 'px') {
  if (typeof size === 'number') return size + unit;
  return unitRE.test(size) ? size : (size + unit);
}

export function noop(e) {
}
