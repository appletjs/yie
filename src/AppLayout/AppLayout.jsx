import {Component, h} from 'preact';
import {Router} from 'preact-router';
import {noop} from '../shared/helpers';
import Transition from 'preact-transition';
import nextTick from '../shared/nextTick';
import Toolbar from '../Toolbar';
import './AppLayout.less';

const defaultToolbarProps = {
  navIcon: undefined,
  onNavClick: noop,
  actions: [],
  onActionClick: noop,
  onMenuClick: noop,
  maxActionCount: 2,
  title: '',
  shadowed: false,
  color: 'primary',
};

export default class AppLayout extends Component {

  constructor(props) {
    super(props);

    // toolbar 属性
    this.state = {
      toolbarMode: 'out',
      toolbar: Object.assign({}, defaultToolbarProps),
    };

    this.toolbarAnimating = false;

    this.onToolbarChange = this.onToolbarChange.bind(this);
    this.setToolbar = this.setToolbar.bind(this);
    this.showToolbar = this.showToolbar.bind(this);
    this.hideToolbar = this.hideToolbar.bind(this);
  }

  getChildContext() {
    const {onToolbarChange, showToolbar, hideToolbar} = this;
    return {onToolbarChange, showToolbar, hideToolbar};
  }

  showToolbar() {
    if (this.toolbarAnimating) return;
    if (this.state.toolbarMode === 'in') return;
    this.setState({toolbarMode: 'in'});
  }

  hideToolbar() {
    if (this.toolbarAnimating) return;
    if (this.state.toolbarMode === 'out') return;
    this.setState({toolbarMode: 'out'});
  }

  setToolbar(states, cb) {
    if (this.toolbarAnimating) {
      nextTick(() => this.setToolbar(states, cb));
    } else {
      const toolbar = Object.assign({}, defaultToolbarProps, states);
      const toolbarMode = toolbar.title || toolbar.navIcon || (toolbar.actions && toolbar.actions.length) ? 'in' : 'out';
      this.setState({toolbar, toolbarMode}, () => cb && cb());
    }
  }

  onToolbarChange(states, cb) {
    const {navIcon, title, actions} = states;
    const attrs = {};

    if (!navIcon && !title && (!actions || !actions.length)) {
      // attrs.shadowed = false;
      this.setToolbar(attrs, cb);
      return;
    }

    Toolbar.includeProps.forEach(function (key) {
      if (states.hasOwnProperty(key)) {
        attrs[key] = states[key];
      }
    });

    if (states.navIcon === true) {
      attrs.navIcon = 'arrow_back';

      if (!states.onNavClick && this.props.history) {
        attrs.onNavClick = () => {
          this.props.history.goBack();
        };
      }
    }

    // attrs.shadowed = true;

    this.setToolbar(attrs, cb);
  }

  generateToolbar() {
    const attrs = Object.assign({}, this.state.toolbar);
    const start = () => this.toolbarAnimating = true;
    const stop = () => this.toolbarAnimating = false;
    attrs.tag = Toolbar;
    attrs.name = 'app-layout-toolbar';
    attrs.className = 'app-layout-toolbar';
    attrs.mode = this.state.toolbarMode;
    attrs.onBeforeEnter = start;
    attrs.onAfterEnter = stop;
    attrs.onBeforeLeave = start;
    attrs.onAfterLeave = stop;
    return h(Transition, attrs);
  }

  generateBottomNavigation() {
    
  }

  render(props, state) {
    return (
      <div className="app-layout">
        {this.generateToolbar()}
        <Router history={props.history} onChange={props.onRouterChange}>
          {props.children}
        </Router>
      </div>
    );
  }
}
