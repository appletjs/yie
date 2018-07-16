import {Component, h} from 'preact';
import {generateHyperSvg} from '../shared/icon';
import {without} from '../shared/helpers';
import TokenList from '../shared/TokenList';
import Ripple from '../Ripple';
import './MenuItem.less';

export default class MenuItem extends Component {
  render(props) {
    const {text, icon, children} = props;

    if (!text && !icon && (!children || !children.length)) {
      return null;
    }

    const attrs = without(props, ['text', 'icon', 'selected', 'disabled', 'component']);

    attrs.role = 'menuitem';
    attrs.tabIndex = -1;

    const classList = TokenList.from(props.className);
    classList.add('ui-menu-item');
    props.selected && classList.add('selected');
    props.disabled && classList.add('disabled');
    attrs.className = classList.toString();

    const childVNodes = [];
    if (icon) {
      let textVNode = text ? h('span', {}, text) : '';
      childVNodes.push(generateHyperSvg(h, icon, {className: 'ui-menu-item-icon', focusable: 'false'}));
      childVNodes.push(<div className="ui-menu-item-text">{textVNode}</div>);
    } else if (text) {
      childVNodes.push(text);
    }

    if (childVNodes.length) {
      attrs.children = childVNodes;
    }

    const {component = 'li'} = props;

    if (!props.disabled) {
      attrs.component = component;
      return h(Ripple, attrs);
    }

    return h(component, attrs);
  }
};
