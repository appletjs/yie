define(['preact'], function (preact) { 'use strict';

  function parseSlots(children) {
    var slots = {};

    function add(name, child) {
      (slots[name] || (slots[name] = [])).push(child);
    }

    children.forEach(function (child) {
      if (child == null) { return; }
      var attrs = child.attributes;
      add(attrs && attrs.slot || 'default', child);
    });

    return slots;
  }

  var Container = (function (Component$$1) {
    function Container () {
      Component$$1.apply(this, arguments);
    }

    if ( Component$$1 ) Container.__proto__ = Component$$1;
    Container.prototype = Object.create( Component$$1 && Component$$1.prototype );
    Container.prototype.constructor = Container;

    Container.prototype.render = function render (props) {
      var slots = parseSlots(props.children);

      console.log(slots);

      return preact.h(
        'div',
        null,
        Object.keys(slots).map(function (key) {
          return preact.h(
            'div',
            { className: 'key' },
            preact.h(
              'h2',
              null,
              key
            ),
            slots[key]
          );
        })
      );
    };

    return Container;
  }(preact.Component));

  var Box = (function (Component$$1) {
    function Box () {
      Component$$1.apply(this, arguments);
    }

    if ( Component$$1 ) Box.__proto__ = Component$$1;
    Box.prototype = Object.create( Component$$1 && Component$$1.prototype );
    Box.prototype.constructor = Box;

    Box.prototype.render = function render (props) {
      return preact.h(
        'div',
        null,
        props.value
      );
    };

    return Box;
  }(preact.Component));

  var DemoSlot = (function (Component$$1) {
    function DemoSlot () {
      Component$$1.apply(this, arguments);
    }

    if ( Component$$1 ) DemoSlot.__proto__ = Component$$1;
    DemoSlot.prototype = Object.create( Component$$1 && Component$$1.prototype );
    DemoSlot.prototype.constructor = DemoSlot;

    DemoSlot.prototype.render = function render () {
      return preact.h(
        Container,
        null,
        '='.repeat(10).split('').map(function (_, i) {
          if (i % 4 === 0) { return preact.h(Box, { slot: 'four', value: i }); }
          if (i % 3 === 0) { return preact.h(Box, { slot: 'three', value: i }); }
          if (i % 2 === 0) { return preact.h(Box, { slot: 'two', value: i }); }
          return preact.h(Box, { value: i });
        }),
        preact.h(
          'div',
          null,
          '000'
        ),
        preact.h(
          'div',
          { slot: 'one' },
          '001'
        ),
        preact.h(
          'div',
          { slot: 'two' },
          '002'
        ),
        preact.h(
          'div',
          { slot: 'three' },
          '003'
        ),
        preact.h(
          'div',
          { slot: 'four' },
          '004'
        )
      );
    };

    return DemoSlot;
  }(preact.Component));

  return DemoSlot;

});
//# sourceMappingURL=DemoSlot.js.map
