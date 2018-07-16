define('preact-router', ['preact'], function (t) {
  function e(t, e) {
    for (var n in e) t[n] = e[n];
    return t;
  }

  function n(t, e, n) {
    var r, o = /(?:\?([^#]*))?(#.*)?$/, u = t.match(o), a = {};
    if (u && u[1]) for (var p = u[1].split('&'), c = 0; c < p.length; c++) {
      var f = p[c].split('=');
      a[decodeURIComponent(f[0])] = decodeURIComponent(f.slice(1).join('='));
    }
    t = i(t.replace(o, '')), e = i(e || '');
    for (var l = Math.max(t.length, e.length), s = 0; s < l; s++) if (e[s] && ':' === e[s].charAt(0)) {
      var h = e[s].replace(/(^\:|[+*?]+$)/g, ''), d = (e[s].match(/[+*?]+$/) || C)[0] || '', g = ~d.indexOf('+'),
        m = ~d.indexOf('*'), y = t[s] || '';
      if (!y && !m && (d.indexOf('?') < 0 || g)) {
        r = !1;
        break;
      }
      if (a[h] = decodeURIComponent(y), g || m) {
        a[h] = t.slice(s).map(decodeURIComponent).join('/');
        break;
      }
    } else if (e[s] !== t[s]) {
      r = !1;
      break;
    }
    return (!0 === n.default || !1 !== r) && a;
  }

  function r(t, e) {return t.rank < e.rank ? 1 : t.rank > e.rank ? -1 : t.index - e.index;}

  function o(t, e) {return t.index = e, t.rank = p(t), t.attributes;}

  function i(t) {return t.replace(/(^\/+|\/+$)/g, '').split('/');}

  function u(t) {return ':' == t.charAt(0) ? 1 + '*+?'.indexOf(t.charAt(t.length - 1)) || 4 : 5;}

  function a(t) {return i(t).map(u).join('');}

  function p(t) {return t.attributes.default ? 0 : a(t.attributes.path);}

  function c(t) {return null != t.__preactattr_ || 'undefined' != typeof Symbol && null != t[Symbol.for('preactattr')];}

  function f(t, e) {void 0 === e && (e = 'push'), R && R[e] ? R[e](t) : 'undefined' != typeof history && history[e + 'State'] && history[e + 'State'](null, null, t);}

  function l() {
    var t;
    return t = R && R.location ? R.location : R && R.getCurrentLocation ? R.getCurrentLocation() : 'undefined' != typeof location ? location : x, '' + (t.pathname || '') + (t.search || '');
  }

  function s(t, e) {return void 0 === e && (e = !1), 'string' != typeof t && t.url && (e = t.replace, t = t.url), h(t) && f(t, e ? 'replace' : 'push'), d(t);}

  function h(t) {
    for (var e = U.length; e--;) if (U[e].canRoute(t)) return !0;
    return !1;
  }

  function d(t) {
    for (var e = !1, n = 0; n < U.length; n++) !0 === U[n].routeTo(t) && (e = !0);
    for (var r = k.length; r--;) k[r](t);
    return e;
  }

  function g(t) {
    if (t && t.getAttribute) {
      var e = t.getAttribute('href'), n = t.getAttribute('target');
      if (e && e.match(/^\//g) && (!n || n.match(/^_?self$/i))) return s(e);
    }
  }

  function m(t) {if (0 == t.button) return g(t.currentTarget || t.target || this), y(t);}

  function y(t) {return t && (t.stopImmediatePropagation && t.stopImmediatePropagation(), t.stopPropagation && t.stopPropagation(), t.preventDefault()), !1;}

  function v(t) {
    if (!(t.ctrlKey || t.metaKey || t.altKey || t.shiftKey || 0 !== t.button)) {
      var e = t.target;
      do {
        if ('A' === (e.nodeName + '').toUpperCase() && e.getAttribute('href') && c(e)) {
          if (e.hasAttribute('native')) return;
          if (g(e)) return y(t);
        }
      } while (e = e.parentNode);
    }
  }

  function b() {_ || ('function' == typeof addEventListener && (R || addEventListener('popstate', function () {d(l());}), addEventListener('click', v)), _ = !0);}

  var C = {}, R = null, U = [], k = [], x = {}, _ = !1, A = function (i) {
      function u(t) {i.call(this, t), t.history && (R = t.history), this.state = {url: t.url || l()}, b();}

      return i && (u.__proto__ = i), u.prototype = Object.create(i && i.prototype), u.prototype.constructor = u, u.prototype.shouldComponentUpdate = function (t) {return !0 !== t.static || (t.url !== this.props.url || t.onChange !== this.props.onChange);}, u.prototype.canRoute = function (t) {return this.getMatchingChildren(this.props.children, t, !1).length > 0;}, u.prototype.routeTo = function (t) {return this._didRoute = !1, this.setState({url: t}), this.updating ? this.canRoute(t) : (this.forceUpdate(), this._didRoute);}, u.prototype.componentWillMount = function () {U.push(this), this.updating = !0;}, u.prototype.componentDidMount = function () {
        var t = this;
        R && (this.unlisten = R.listen(function (e) {t.routeTo('' + (e.pathname || '') + (e.search || ''));})), this.updating = !1;
      }, u.prototype.componentWillUnmount = function () {'function' == typeof this.unlisten && this.unlisten(), U.splice(U.indexOf(this), 1);}, u.prototype.componentWillUpdate = function () {this.updating = !0;}, u.prototype.componentDidUpdate = function () {this.updating = !1;}, u.prototype.getMatchingChildren = function (i, u, a) {
        return i.filter(o).sort(r).map(function (r) {
          var o = n(u, r.attributes.path, r.attributes);
          if (o) {
            if (!1 !== a) {
              var i = {url: u, matches: o};
              return e(i, o), delete i.ref, delete i.key, t.cloneElement(r, i);
            }
            return r;
          }
        }).filter(Boolean);
      }, u.prototype.render = function (t, e) {
        var n = t.children, r = t.onChange, o = e.url, i = this.getMatchingChildren(n, o, !0), u = i[0] || null;
        this._didRoute = !!u;
        var a = this.previousUrl;
        return o !== a && (this.previousUrl = o, 'function' == typeof r && r({
          router: this,
          url: o,
          previous: a,
          active: i,
          current: u
        })), u;
      }, u;
    }(t.Component), I = function (n) {return t.h('a', e({onClick: m}, n));},
    L = function (e) {return t.h(e.component, e);};
  return A.subscribers = k, A.getCurrentUrl = l, A.route = s, A.Router = A, A.Route = L, A.Link = I, A;
});
