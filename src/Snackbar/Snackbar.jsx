import {Component, h} from 'preact';
import {callHook} from '../shared/helpers';
import {isAndroid, isIOS} from '../shared/env';
import TokenList from '../shared/TokenList';
import Transition from 'preact-transition';
import Button from '../Button';
import './Snackbar.less';

export default class Snackbar extends Component {
  // animating: boolean = false;
  // timer?: any;

  constructor(props) {
    super(props);
    this.animating = false;
  }

  setTimeout(duration) {
    this.timer = setTimeout(() => {
      this.timer = null;
      callHook(this.props, 'onTimeout', this.props);
    }, duration);
  }

  clearTimeout() {
    if (!this.timer) return;
    clearTimeout(this.timer);
    this.timer = null;
  }

  handleClick(e) {
    e.stopPropagation();
    callHook(this.props, 'onClick', this.props);
  }

  handleActionClick(e) {
    e.stopPropagation();
    callHook(this.props, 'onActionClick', this.props);
  }

  // shouldComponentUpdate() {
  //   return !this.animating;
  // }

  componentDidMount() {
    const {timeout} = this.props;
    if (timeout && this.props.display) {
      this.setTimeout(timeout);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.display) return;
    this.clearTimeout();
    if (!nextProps.timeout) return;
    this.setTimeout(nextProps.timeout);
  }

  render(props) {
    let action = null;

    if (props.action) {
      action = h(Button, {
        className: 'ui-snackbar__action-button',
        color: props.actionColor || 'primary',
        type: 'flat',
        onClick: e => this.handleActionClick(e),
        value: props.action
      });
    }

    if (action) {
      action = (<div className="ui-snackbar__action">
        {action}
      </div>);
    }

    const position = props.position || 'left bottom';
    const classList = TokenList.from(position);
    classList.add('ui-snackbar');
    if (props.floating) classList.add('floating');
    if (props.status) classList.add(props.status);
    if (isAndroid || isIOS) classList.add('in-mobile');

    const style = position
      .split(/\s+/)
      .map(name => name + ':0')
      .join(';');

    const createStop = (hook) => {
      return () => {
        this.animating = false;
        callHook(this.props, hook, this.props);
      };
    };

    return (
      <Transition
        type="transition"
        className={classList.toString()}
        style={style}
        name={'ui-snackbar-' + (props.animation || 'slide')}
        mode={props.display ? 'in' : 'out'}
        onClick={e => this.handleClick(e)}
        onBeforeEnter={() => callHook(this.props, 'onWillShow')}
        onEnter={() => this.animating = true}
        onAfterEnter={createStop('onShow')}
        onBeforeLeave={() => callHook(this.props, 'onWillHide')}
        onLeave={() => this.animating = true}
        onAfterLeave={createStop('onHide')}>
        <div className="ui-snackbar__message">{props.message}</div>
        {action}
      </Transition>
    );
  }
}
