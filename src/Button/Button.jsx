import {Component, h} from 'preact';
import {callHook, without} from '../shared/helpers';
import TokenList from '../shared/TokenList';
import Icon from '../Icon';
import Indicator from '../LoadingIndicator';
import Ripple from '../Ripple';
import './Button.less';

const excludes = [
  'size',
  'color',
  'type',
  'disabled',
  'leftIcon',
  'rightIcon',
  'loading',
  'value',
  'component',
  'block',
  'round',
  'onClick',
];

export default class Button extends Component {
  handleClick(e) {
    e && e.stopPropagation();
    if (this.props.loading) return;
    if (this.props.disabled) return;
    callHook(this.props, 'onClick', e);
  }

  render(props, state) {
    const {component = 'button'} = props;
    const attrs = without(props, excludes);

    attrs.onClick = e => this.handleClick(e);
    attrs.component = component;

    const classList = TokenList.from(props.className);
    const {size, type, loading, color, disabled, round} = props;
    classList.add('ui-button');
    if (size) classList.add(size);
    if (color) classList.add(color);
    if (type) classList.add(type);
    if (disabled) classList.add('disabled');
    if (loading) classList.add('loading');
    if (round) classList.add('round');
    if (props.block) classList.add('block');
    attrs.className = classList.toString();

    // 请不要使用 input 标签
    if (component === 'button' && disabled) {
      attrs.disabled = true;
    }

    // <Button>...</Button>
    if (attrs.children.length) {
      return h(component, attrs);
    }

    const children = [];
    const content = [];

    let c = type === 'flat' ? color : '';
    if (loading === 'inline') {
      content.push(<Indicator size="small" color={c} inline/>);
    } else if (props.loading) {
      children.push(<Indicator color={c} overlay/>);
    }

    if (props.leftIcon && loading !== 'inline') {
      content.push(<Icon className="ui-button-icon left" size={size} name={props.leftIcon}/>);
    }

    if (props.value) {
      content.push(<div className="ui-button-value">{props.value}</div>);
    }

    if (props.rightIcon) {
      content.push(<Icon className="ui-button-icon right" size={size} name={props.rightIcon}/>);
    }

    children.push(<div className="ui-button-content">{content}</div>);

    attrs.children = children;

    if (props.loading || props.disabled) {
      return h(component, attrs);
    }

    return h(Ripple, attrs);
  }
}
