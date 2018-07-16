define(['preact', 'yie'], function (preact, yie) { 'use strict';

  var DemoAvatar = (function (Component$$1) {
    function DemoAvatar () {
      Component$$1.apply(this, arguments);
    }

    if ( Component$$1 ) DemoAvatar.__proto__ = Component$$1;
    DemoAvatar.prototype = Object.create( Component$$1 && Component$$1.prototype );
    DemoAvatar.prototype.constructor = DemoAvatar;

    DemoAvatar.prototype.render = function render () {
      return preact.h(
        'div',
        null,
        preact.h(
          yie.Avatar,
          null,
          preact.h('img', { src: 'https://cdn.vuetifyjs.com/images/john.jpg', alt: 'John' })
        ),
        preact.h(
          yie.Avatar,
          { color: 'accent' },
          'N'
        )
      );
    };

    return DemoAvatar;
  }(preact.Component));

  return DemoAvatar;

});
//# sourceMappingURL=DemoAvatar.js.map
