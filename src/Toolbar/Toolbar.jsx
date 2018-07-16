import {Component, h} from 'preact';
import {without} from '../shared/helpers';
import MenuItem from '../MenuItem';
import Menu from '../Menu';
import IconButton from '../IconButton';
import Text from '../Text';
import TokenList from '../shared/TokenList';
import './Toolbar.less';

function createHandle(fn) {
  return function (e) {
    if (typeof fn === 'function') {
      fn(e);
    }
  };
}

export default class Toolbar extends Component {

  static includeProps = [
    'title',
    'navIcon',
    'onNavClick',
    'actions',
    'maxActionCount',
    'onActionClick',
    'onMenuClick',
    'shadowed',
    'color',
    'static'
  ];

  constructor(props) {
    super(props);

    this.state = {open: false};
    // this.menuAction?: Element;
    // this._clickOutsideListener?: EventListener;
    this.animating = false;
  }

  componentDidMount() {
    this._clickOutsideListener = (e) => {
      if (this.animating || !this.menuAction) return;
      if (this.menuAction.contains(e.target)) return;
      if (!this.state.open) return;
      this.setState({open: false});
    };

    document.body.addEventListener('click', this._clickOutsideListener);
  }

  componentWillUnmount() {
    if (this._clickOutsideListener) {
      document.body.removeEventListener('click', this._clickOutsideListener);
      delete this._clickOutsideListener;
    }
  }

  render(props, state) {
    const attrs = without(props, Toolbar.includeProps);
    const children = attrs.children = [];

    // Navigation
    if (props.navIcon) {
      children.push(
        <IconButton
          className="ui-toolbar-navigation"
          icon={props.navIcon}
          size="big"
          type="flat"
          __center__
          round
          onClick={createHandle(props.onNavClick)}
        />
      );
    }

    // Title
    if (props.title) {
      children.push(<Text className="ui-toolbar-title" value={props.title}/>);
    } else {
      children.push(<div className="ui-toolbar-title">{props.children}</div>);
    }

    // Actions & Menus
    let menus;

    if (Array.isArray(props.actions)) {
      const onActionClick = createHandle(props.onActionClick);
      const onMenuClick = createHandle(props.onMenuClick || props.onActionClick);
      const max = typeof props.maxActionCount === 'number' ? props.maxActionCount : 2;

      props.actions.slice(0, max).forEach(function (act) {
        if (act.nodeName) {
          children.push(act);
        } else {
          children.push(
            <IconButton
              className="ui-toolbar-action"
              size="big"
              icon={act.icon}
              onClick={e => (act.onClick || onActionClick)(e, act)}
              type="flat"
              __center__
              round/>
          );
        }
      });

      const closeMenu = () => {
        this.setState({open: false});
      };

      menus = props.actions.slice(max).map(function (menu) {
        const click = (e) => {
          (menu.onClick || onMenuClick)(e, menu);
          setTimeout(closeMenu, 160);
        };
        return <MenuItem text={menu.text} icon={menu.icon} onClick={click}/>;
      });
    } else if (props.actions) {
      console.warn('[appbar] actions必须是数组');
    }

    // init menus
    if (menus && menus.length) {
      const onToggleMenu = () => {
        this.setState({
          open: !state.open
        });
      };

      const refMenuIcon = (node) => this.menuAction = node;
      const onAnimateStart = () => this.animating = true;
      const onAnimationStop = () => this.animating = false;

      children.push((
        <div className="ui-toolbar-menu" ref={refMenuIcon}>
          <IconButton size="big" icon="more_vert" type="flat" onClick={onToggleMenu} round/>
          <Menu
            onOpen={onAnimateStart}
            onClose={onAnimateStart}
            onAfterOpen={onAnimationStop}
            onAfterClose={onAnimationStop}
            open={state.open}
            origin="top right"
            raised>
            {menus}
          </Menu>
        </div>
      ));
    }

    const classList = TokenList.from(props.className);
    classList.add('ui-toolbar').add(props.color || 'primary');
    if (props.shadowed !== false) classList.add('shadowed');
    if (!props.static) classList.add('fixed');
    attrs.className = classList.toString();

    return h('div', attrs);
  }
};
