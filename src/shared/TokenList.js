const {indexOf, splice, slice, join} = [];

/**
 * 模拟 DOMTokenList 接口，主要用于组件的 class 管理，
 * 类似于 Vue 的绑定 class 方式。
 *
 * 本来打算直接使用 Set，但是谷歌浏览器执行 Set.call 提示错误：
 * "Uncaught TypeError: Constructor Set requires 'new'"，
 * 所以无法实现 class Sub extends Set，才有了该类。
 *
 * @link https://developer.mozilla.org/zh-CN/docs/Web/API/DOMTokenList
 */
export default class TokenList {

  /**
   * @param {*} data
   * @return {TokenList}
   */
  static from(data) {
    const list = new TokenList();
    const parsed = this.explode(data);
    parsed.forEach(t => list.add(t));
    return list;
  }

  /**
   * @param {*} value
   * @return {string[]}
   */
  static explode(value) {
    let parsed = [];

    if (value instanceof TokenList) {
      return slice.call(value);
    }

    switch (typeof value) {
      // 'class1'
      // 'class1 class2'
      case 'string':
        parsed = value.trim().split(/\s+/);
        break;

      // arg = () => 'class';
      // arg = () => 'class1 class2';
      // arg = () => ['class1', 'class2'];
      // arg = () => {'class1': true, 'class2': check};
      // arg = () => [{'class1': true}, 'selected', [...]];
      case 'function':
        try {
          const values = value();
          if (!values) break;
          parsed = this.explode(values);
        } catch (e) {
        }
        break;

      // array, object, null
      case 'object':
        if (value == null) {
          break;
        }

        // ['class1', ...]
        // ['class1', {...}]
        if (Array.isArray(value)) {
          parsed = value
            .map(this.explode, this)
            .reduce((x, a) => x.concat(a), []);
          break;

        }

        // {className: check, ...}
        parsed = Object.keys(value)
          .map(key => value[key] && key);

    }

    if (parsed.length) {
      return parsed
        .map(c => c.trim())
        .filter(Boolean)
        .filter(function check(className) {
          if (!/^[a-zA-Z$_-][\w$_-]*$/.test(className)) {
            console.warn(`Bad className "${className}"`);
            return false;
          }
          return true;
        });
    }

    return parsed;
  }

  constructor() {
    this.length = 0;
  }

  /**
   * @param {string[]} tokens
   * @return {TokenList}
   */
  add(...tokens) {
    tokens.forEach(token => {
      if (token == null) return;
      if (this.contains(token)) return;
      this[this.length++] = token;
    });
    return this;
  }

  /**
   * @param {*} token
   * @return {boolean}
   */
  contains(token) {
    return indexOf.call(this, token) > -1;
  }

  item(index) {
    if (index < 0) index += this.length;
    if (index >= this.length) return null;
    return index < 0 ? null : this[index];
  }

  /**
   * @param {*[]} tokens
   */
  remove(...tokens) {
    tokens.forEach(token => {
      const index = indexOf.call(this, token);
      if (index > -1) splice.call(this, index, 1);
    });
  }

  /**
   * 从 TokenList 字符串中移除符号字串（token），并返回 false。
   * 如果传入的符号字串（token）不存在，则将其添加进去，并返回 true
   *
   * @param {string} token
   * @return {boolean}
   */
  toggle(token) {
    const has = this.contains(token);
    this[has ? 'remove' : 'add'](token);
    return has;
  }

  /**
   * @return {string}
   */
  toString() {
    return join.call(this, ' ');
  }
}
