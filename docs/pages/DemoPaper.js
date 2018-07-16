define(['preact', 'yie'], function (preact, yie) { 'use strict';

  var DemoPaper = (function (Component$$1) {
    function DemoPaper () {
      Component$$1.apply(this, arguments);
    }

    if ( Component$$1 ) DemoPaper.__proto__ = Component$$1;
    DemoPaper.prototype = Object.create( Component$$1 && Component$$1.prototype );
    DemoPaper.prototype.constructor = DemoPaper;

    DemoPaper.prototype.render = function render () {
      return preact.h(
        'div',
        { className: 'paper-demo-wrapper' },
        '-'.repeat(25).split('').map(function (x, i) {
          return preact.h(
            yie.Paper,
            { className: 'demo-paper', elevation: i },
            i
          );
        })
      );
    };

    return DemoPaper;
  }(preact.Component));

  return DemoPaper;

});
//# sourceMappingURL=DemoPaper.js.map
