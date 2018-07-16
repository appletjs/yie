define(['preact', 'yie'], function (preact, yie) { 'use strict';

  var DemoLoadingIndicator = (function (Component$$1) {
    function DemoLoadingIndicator() {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var _temp;

      return _temp = Component$$1.apply(this, args), this.state = {
        half: false
      }, _temp;
    }

    if ( Component$$1 ) DemoLoadingIndicator.__proto__ = Component$$1;
    DemoLoadingIndicator.prototype = Object.create( Component$$1 && Component$$1.prototype );
    DemoLoadingIndicator.prototype.constructor = DemoLoadingIndicator;

    DemoLoadingIndicator.prototype.render = function render () {
      var this$1 = this;

      return preact.h(
        'div',
        null,
        preact.h(
          'div',
          null,
          preact.h(
            'label',
            null,
            preact.h('input', { type: 'checkbox', onChange: function (e) { return this$1.setState({ half: e.target.checked }); } }),
            ' half'
          )
        ),
        preact.h(yie.LoadingIndicator, null),
        preact.h(yie.LoadingIndicator, { color: 'primary', half: this.state.half }),
        preact.h(yie.LoadingIndicator, { color: 'accent', half: this.state.half }),
        preact.h(yie.LoadingIndicator, { color: 'danger', half: this.state.half }),
        preact.h(yie.LoadingIndicator, { color: 'warning', half: this.state.half }),
        preact.h(yie.LoadingIndicator, { color: 'info', half: this.state.half }),
        preact.h(yie.LoadingIndicator, { color: 'success', half: this.state.half })
      );
    };

    return DemoLoadingIndicator;
  }(preact.Component));

  return DemoLoadingIndicator;

});
//# sourceMappingURL=DemoLoadingIndicator.js.map
