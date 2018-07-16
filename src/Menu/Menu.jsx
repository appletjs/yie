import {Component, h} from 'preact';
import {without} from '../shared/helpers';
import Transition from 'preact-transition';
import MenuItem from '../MenuItem';
import TokenList from '../shared/TokenList';
import './Menu.less';


const hooks = [
  'onBeforeOpen',
  'onOpen',
  'onAfterOpen',
  'onBeforeClose',
  'onClose',
  'onAfterClose',
];

const proxy = [
  'onBeforeEnter',
  'onEnter',
  'onAfterEnter',
  'onBeforeLeave',
  'onLeave',
  'onAfterLeave',
];

const excludeProps = hooks.concat([
  'component',
  'raised',
  'open',
  'origin',
  'items',
]);

export default class Menu extends Component {
  render(props) {
    const attrs = without(props, excludeProps);

    attrs.mode = props.open ? 'in' : 'out';
    attrs.tag = props.component;
    attrs.name = 'ui-menu';
    attrs.role = 'menu';

    hooks.forEach(function (name, i) {
      if (!props[name]) return;
      attrs[proxy[i]] = props[name];
    });

    let style = attrs.style ? attrs.style + ';' : '';
    style += 'transform-origin: ' + (props.origin || '0 0') + ';';
    attrs.style = style;

    const classList = TokenList.from(props.className);
    classList.add('ui-menu');
    props.raised && classList.add('raised');

    if (Array.isArray(props.items)) {
      attrs.children = props.items.map(item => {
        if (item == null || item === false) return null;
        if (item === true) return <li className="ui-menu-divider"/>;
        if (typeof item === 'function') return item;// MenuItem or generator
        if (typeof item === 'string') return <MenuItem text={item}/>;// todo click 事件
        if (item.icon) classList.add('has-icon');
        return h(MenuItem, item);// 包括 onClick 事件等
      });
    }

    attrs.className = classList.toString();

    return h(Transition, attrs);
  }
}
