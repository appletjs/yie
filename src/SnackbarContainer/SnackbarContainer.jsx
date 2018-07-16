import {Component, h} from 'preact';
import {callHook} from '../shared/helpers';
import nextTick from '../shared/nextTick';
import Snackbar from '../Snackbar';

let uid = 0;

function snack(data, timeout) {
  if (data == null) return null;
  const type = typeof data;
  if (type === 'string' || type === 'number') data = {message: data};
  data.timeout = data.timeout = timeout || 5000;
  data.key = ++uid;
  data.display = false;
  return data;
}

export default class SnackbarContainer extends Component {
  constructor(props) {
    super(props);

    this.defaultSnackbar = snack('--');
    this.defaultSnackbar.message = '';

    this.queue = [];
    this.awaitHide = false;

    this.state = {
      show: false,
      snackbar: null,
    };
  }

  createSanckbar(snackbar) {
    snackbar = snack(
      snackbar,
      this.props.duration
    );

    if (snackbar === null) {
      return;
    }

    if (this.props.queueSnackbars) {
      // 消息入队
      this.queue.push(snackbar);
    } else {
      this.queue = [snackbar];
    }

    if (this.awaitHide) return;

    // 当前不是显示状态
    if (!this.state.show) {
      this.showNextSnackbar();
    } else if (!this.props.queueSnackbars) {
      this.awaitHide = true;
      nextTick(() => this.setState({show: false}));
    }
  }

  showNextSnackbar() {
    if (!this.queue.length) {
      return;
    }

    let snackbar;

    // 队列模式下，将第一条数据取出来显示即可。
    if (this.props.queueSnackbars) {
      while (!(snackbar = this.queue.shift())) ;
    } else {
      while (!(snackbar = this.queue.pop())) ;
    }

    const show = !!snackbar;
    this.setState({snackbar, show});

    return show;
  }

  handleShow(snackbar) {
    callHook(this.props, 'onSnackbarShow', snackbar);
    callHook(snackbar, 'onShow', snackbar);
    if (!this.awaitHide) return;
    nextTick(() => this.setState({show: false}));
  }

  handleHide(snackbar) {
    this.awaitHide = false;
    callHook(this.props, 'onSnackbarHide', snackbar);
    callHook(snackbar, 'onHide', snackbar);
    nextTick(() => this.showNextSnackbar());// 显示下一条信息
  }

  handleClick(snackbar) {
    if (!this.state.show) return;
    this.setState({show: false});// 点击控制关闭
    callHook(snackbar, 'onClick', snackbar);
  }

  handleActionClick(snackbar) {
    callHook(snackbar, 'onActionClick', snackbar);
  }

  // 超时控制关闭
  handleTimeout() {
    this.setState({show: false});
  }

  render(props, state) {
    const show = state.snackbar && state.show;
    const snackbar = state.snackbar || this.defaultSnackbar;
    if (!snackbar) return null;
    return (
      <Snackbar
        message={snackbar.message}
        action={snackbar.action}
        actionColor={snackbar.actionColor}
        floating={snackbar.floating}
        timeout={snackbar.timeout}
        display={show}
        status={snackbar.status}
        animation={props.transition}
        position={props.position}
        onClick={() => this.handleClick(snackbar)}
        onActionClick={() => this.handleClick(snackbar)}
        onShow={() => this.handleShow(snackbar)}
        onHide={() => this.handleHide(snackbar)}
        onTimeout={() => this.handleTimeout()}
      />
    );
  }
};
