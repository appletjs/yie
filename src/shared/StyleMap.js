const partSplitRE = /\s*;\s*/;
const nvSplitRE = /\s*:\s*/;

// 获取具有浏览器前缀的CSS属性
const prefixedCssProperties = function (map) {
  const styles = window.getComputedStyle(document.documentElement, '');
  [].slice.call(styles).filter(function (x) {
    const matches = x.match(/-(webkit|moz|ms|o)-/);
    if (matches) map[x.slice(matches[0].length)] = x;
  });
  return map;
}({});

function property(name) {
  return prefixedCssProperties[name] || name;
}

export default class StyleMap {

  static property = property;

  static from(data) {
    const style = new StyleMap();
    style.dict = this.explode(data);
    return style;
  }

  static explode(data) {
    if (data instanceof StyleMap) {
      return Object.assign({}, data.dict);
    }

    const map = Object.create(null);

    // prop:value;prop2:value2;...
    if (typeof data === 'string') {
      data.split(partSplitRE).forEach(function (part) {
        if (!part.trim()) return;
        const [name, value] = part.split(nvSplitRE);
        name && value !== undefined && (map[name] = value);
      });
    }
    // ['name:value', [name, value]...]
    else if (Array.isArray(data)) {
      data.forEach(function (part) {
        if (typeof part === 'string') part = part.split(nvSplitRE);
        if (!Array.isArray(part)) return;
        const [name, value] = part;
        name && value !== undefined && (map[name] = value);
      });
    }
    // {name: value, ...}
    else if (data && typeof data === 'object') {
      Object.keys(data).forEach(function (key) {
        data[key] !== undefined && (map[key] = data[key]);
      });
    }

    return map;
  }

  get size() {
    return Object.keys(this.dict).length;
  }

  constructor() {
    this.dict = Object.create(null);
  }

  append(name, value) {
    this.set(name, (this.has(name) ? this.get(name) + ',' : '') + value);
  }

  get(name) {
    return this.dict[property(name)];
  }

  has(name) {
    return property(name) in this.dict;
  }

  remove(name) {
    return delete this.dict[property(name)];
  }

  set(name, value) {
    this.dict[property(name)] = value;
    return this;
  }

  toString() {
    const styles = [];
    for (const key in this.dict) styles.push(key + ':' + this.dict[key]);
    return styles.join(';') + (this.size ? ';' : '');
  }
}
