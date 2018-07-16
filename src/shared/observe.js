export function watch(obj, key, value, change) {
  Object.defineProperty(obj, key, {
    get: () => value,
    set(newVal) {
      const oldVal = value;
      if (newVal === oldVal) return;
      value = newVal;
      change(newVal, oldVal);
    },
    configurable: true,
    enumerable: true
  })
}
