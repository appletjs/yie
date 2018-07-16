import {Component, h} from 'preact';
import {without} from "../shared/helpers";
import LoadingIndicator from '../LoadingIndicator';
import Icon from '../Icon';
import TokenList from "../shared/TokenList";
import './Input.less';

const invalidTypes = [
  'file', 'checkbox', 'radio', 'hidden',
  'image', 'button', 'reset', 'submit',
];

const inputProps = [
  // common
  'type', 'value', 'alt', 'name', 'placeholder', 'id',
  'maxLength', 'minLength', 'max', 'min',
  'autocomplete', 'autofocus', 'pattern', 'formnovalidate',
  'form', 'list',
  'disabled', 'readonly', 'required',
  'onChange', 'onInput', 'onFocus', 'onBlur', 'onKeyUp', 'onKeyDown', 'onKeyPress',
  'rows'
];

const excludeProps = inputProps.concat(
  'loading', 'leftIcon', 'rightIcon',
  'status', 'size', 'flat', 'multiple',
  'block'
);

export default class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: !!props.autofocus
    };

    this.INPUT = null;
  }

  render(props, state) {
    const {slots = {}} = props;
    const isBig = props.size === 'big';
    const iconSize = isBig ? 'big' : undefined;
    const loadSize = isBig ? undefined : 'small';

    // 输入框
    // ====================

    const content = [];

    // 左边的 loading 优先于左边的图标
    if (props.loading === 'left') {
      content.push(<LoadingIndicator className="ui-input-left-loading" size={loadSize} inline/>);
    } else if (props.leftIcon) {
      content.push(<Icon className="ui-input-left-icon" size={iconSize} name={props.leftIcon}/>);
    }

    // 输入框左边自定义
    if (slots.left && Array.isArray(slots.left)) {
      content.push(...slots.left);
    } else if (slots.left) {
      content.push(slots.left);
    }

    // 输入框
    {
      const attrs = {};

      inputProps.forEach(function (name) {
        if (name in props) {
          attrs[name] = props[name];
        }
      });

      // 类型检查
      if (!attrs.type) {
        attrs.type = 'text';
      } else if (invalidTypes[attrs.type]) {
        throw new Error('Invalid Type: ' + attrs.type + '\n  allowed ' + invalidTypes.join(','));
      }

      // 代理聚焦和失焦
      const {onBlur, onFocus} = attrs;

      attrs.onFocus = (e) => {
        if (onFocus) onFocus(e);
        if (state.focused) return;// primary
        this.setState({focused: true});
      };

      attrs.onBlur = (e) => {
        if (onBlur) onBlur(e);
        if (!state.focused) return;// primary
        this.setState({focused: false});
      };

      // 收集 Input 节点
      attrs.ref = (node) => {
        this.INPUT = node;
      };

      attrs.className = 'ui-input-field';

      content.push(h(props.multiple ? 'textarea' : 'input', attrs));
    }

    // 输入框右边自定义
    if (slots.right && Array.isArray(slots.right)) {
      content.push(...slots.right);
    } else if (slots.right) {
      content.push(slots.right);
    }

    // 右边的 loading 优先于右边的图标
    if (props.loading === 'right') {
      content.push(<LoadingIndicator className="ui-input-right-loading" size={loadSize} inline/>);
    } else if (props.rightIcon) {
      content.push(<Icon className="ui-input-right-icon" size={iconSize} name={props.rightIcon}/>);
    }

    // 聚焦动画
    content.push(<div className="ui-input-animation"/>);


    // 整个视图
    // ====================

    const children = [];

    if (slots.title) {
      children.push(<div className="ui-input-title">{slots.title}</div>);
    }

    const handleFocus = (e) => {
      if (e.target.nodeName === 'INPUT') return;// 点击输入框
      if (props.disabled) return;// 被禁用了
      if (state.focused) return;// 已经聚焦
      if (!this.INPUT) return;// 还没有挂在到DOM上
      this.INPUT.focus();
    };
    children.push(<div className="ui-input-content" onClick={handleFocus}>{content}</div>);

    if (slots.subtitle) {
      children.push(<div className="ui-input-subtitle">{slots.subtitle}</div>);
    }

    const classList = TokenList.from(props.className);
    classList.add('ui-input');
    if (isBig) classList.add('big');
    if (props.flat) classList.add('flat');
    if (props.disabled) classList.add('disabled');
    if (props.readonly) classList.add('readonly');
    if (state.focused) classList.add('focused');
    if (props.block) classList.add('block');
    classList.add(props.status || 'primary');

    const attrs = without(props, excludeProps);
    attrs.className = classList.toString();
    attrs.children = children;

    return h('div', attrs);
  }
}
