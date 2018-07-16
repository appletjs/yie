import {Component, h, render} from 'preact';
import Toolbar from '../../src/Toolbar/Toolbar';
import Ripple from '../../src/Ripple/Ripple';
import components from './components';
import './App.less';

class App extends Component {
  state = {
    title: 'Yie UI v',
    component: null
  };

  createComponentDocumentLink(component) {
    const app = this;

    component.title = component.text;

    const onClick = (e) => {
      if (component.component) {
        this.setState(component);
        return;
      }

      requirejs(['pages/' + component.name], function (module) {
        component.component = h(module.default || module);
        app.setState(component);
      }, (err) => {
        console.log(err);
      });
    };

    return (
      <Ripple className="demo-link" onClick={onClick}>
        {component.text}
      </Ripple>
    );
  }

  render(props, state) {
    const create = this.createComponentDocumentLink.bind(this);
    return (
      <div id="app">
        <Toolbar title={state.title}/>
        <main id="body">
          <aside id="sidebar">{props.components.map(create)}</aside>
          <div id="main">{state.component}</div>
        </main>
      </div>
    );
  }
}

render(
  <App components={components}/>,
  document.body
);
