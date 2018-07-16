import {Component, h} from 'preact';
import {without} from '../shared/helpers';
import IconButton from '../IconButton';
import TokenList from '../shared/TokenList';
import Button from '../Button';
import './Tipbox.less';

function getButtonAttributes(btn, onClick) {
  let props = {};
  if (typeof btn === 'object') {
    props = Object.assign({}, btn);
  }
  return Object.assign(props, {
    className: 'ui-tipbox-button',
    type: 'flat',
    color: props.color,
    leftIcon: props.icon,
    onClick: props.onClick || onClick,
    value: props.text || btn,
    size: 'big',
    disabled: !!props.disabled,
    loading: !!props.loading,
  });
}

function isPreactElement(node) {
  return node.__preactattr_ != null || typeof Symbol !== 'undefined' && node[Symbol.for('preactattr')] != null;
}

function stopPropagation(e) {
  if (!e) return;
  e.stopPropagation();
  e.preventDefault();
}

export default class Tipbox extends Component {
  static includeProps = [
    'okValue',
    'cancelValue',
    'onOk',
    'onCancel',
    'buttons',
    'title',
    'color',
    'onButtonClick',
    'dismiss',
    'onDismiss',
  ];

  generateFooter(attrs, props) {
    let buttons = props.buttons || [];

    if (!Array.isArray(buttons)) {
      console.warn('[dialog] buttons必须是数组');
      buttons = [];
    } else {
      buttons = buttons.slice();
    }

    // 取消按钮
    const {cancelValue, onCancel} = props;
    if (cancelValue) {
      buttons.push({
        text: cancelValue,
        onClick: onCancel,
        color: 'danger'
      });
    }

    // 确定按钮
    const {okValue, onOk} = props;
    if (okValue) {
      buttons.push({
        text: okValue,
        onClick: onOk,
        color: 'primary'
      });
    }

    // 没有按钮，则不渲染之
    if (!buttons.length) {
      return;
    }

    function onClick(e) {
      if (typeof props.onButtonClick === 'function') {
        props.onButtonClick(e);
      }
    }

    // 不支持复杂情况，比如使用 VNode、Constructor
    buttons = buttons.filter(Boolean).reduce(function (btns, btn) {
      if (!btn) return btns;
      btns.push(
        h(Button, getButtonAttributes(btn, onClick)),
        h('div', {className: 'ui-tipbox-divider'})
      );
      return btns;
    }, []);

    if (!buttons.length) {
      return;
    }

    buttons.pop();

    attrs.children.push(
      <footer className="ui-tipbox-footer">
        {buttons}
      </footer>
    );
  }

  generateTitle(attrs, props) {
    const children = [];

    // Title
    if (props.title) {
      children.push(
        <h2 className="ui-tipbox-title">
          {props.title}
        </h2>
      );
    }

    // Dismiss
    const {dismiss, onDismiss} = props;
    if (dismiss && isPreactElement(dismiss)) {
      children.push(h(dismiss, {className: 'ui-tipbox-dismiss'}));
    } else if (dismiss || onDismiss) {
      children.push(
        <IconButton
          className="ui-tipbox-dismiss"
          icon={(dismiss === true || !dismiss) ? 'close' : dismiss}
          onClick={onDismiss}
          type="flat"
          size="big"
          round
          __center__
        />
      );
    }

    if (children.length) {
      attrs.children.push(
        <header className="ui-tipbox-header">
          {children}
        </header>
      );
    }
  }

  generateBody(attrs, prop) {
    if (prop.children && prop.children.length) {
      attrs.children.push(
        <div className="ui-tipbox-body">
          {prop.children}
        </div>
      );
    }
  }

  render(props) {
    const classList = TokenList
      .from(props.className)
      .add('ui-tipbox');

    if (props.color) {
      classList.add(props.color);
    }

    const onClick = props.onClick;
    const attrs = without(props, Tipbox.includeProps);
    attrs.className = classList.toString();
    attrs.children = [];
    attrs.onClick = function (e) {
      stopPropagation(e);
      onClick && onClick(e);
    };

    this.generateTitle(attrs, props);
    this.generateBody(attrs, props);
    this.generateFooter(attrs, props);

    return h(props.component || 'div', attrs);
  }
}

