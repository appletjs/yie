define(['preact', 'yie'], function (preact, yie) { 'use strict';

  var components = [{
    "text": "Avatar",
    "name": "DemoAvatar"
  }, {
    "text": "BottomNavigation",
    "name": "DemoBottomNavigation"
  }, {
    "text": "LoadingIndicator",
    "name": "DemoLoadingIndicator"
  }, {
    "text": "Paper",
    "name": "DemoPaper"
  }, {
    "text": "Slot",
    "name": "DemoSlot"
  }];

  var App = (function (Component$$1) {
    function App() {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var _temp;

      return _temp = Component$$1.apply(this, args), this.state = {
        title: 'Yie UI v',
        component: null
      }, _temp;
    }

    if ( Component$$1 ) App.__proto__ = Component$$1;
    App.prototype = Object.create( Component$$1 && Component$$1.prototype );
    App.prototype.constructor = App;

    App.prototype.createComponentDocumentLink = function createComponentDocumentLink (component) {
      var this$1 = this;

      var app = this;

      component.title = component.text;

      var onClick = function (e) {
        if (component.component) {
          this$1.setState(component);
          return;
        }

        requirejs(['pages/' + component.name], function (module) {
          component.component = preact.h(module.default || module);
          app.setState(component);
        }, function (err) {
          console.log(err);
        });
      };

      return preact.h(
        yie.Ripple,
        { className: 'demo-link', onClick: onClick },
        component.text
      );
    };

    App.prototype.render = function render$$1 (props, state) {
      var create = this.createComponentDocumentLink.bind(this);
      return preact.h(
        'div',
        { id: 'app' },
        preact.h(yie.Toolbar, { title: state.title }),
        preact.h(
          'main',
          { id: 'body' },
          preact.h(
            'aside',
            { id: 'sidebar' },
            props.components.map(create)
          ),
          preact.h(
            'div',
            { id: 'main' },
            state.component
          )
        )
      );
    };

    return App;
  }(preact.Component));

  preact.render(preact.h(App, { components: components }), document.body);

});
//# sourceMappingURL=app.js.map
