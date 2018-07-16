import {Component, h} from 'preact';
import Transition from 'preact-transition';
import Tipbox from '../Tipbox';
import {without} from '../shared/helpers';
import TokenList from '../shared/TokenList';
import './Dialog.less';

const dialogProps = [
  'display',
  'dimmed',
  'docked',
  'children',
  'className',
  'onShow',
  'onHide',
];

function createEventListener(listener) {
  return function (...args) {
    if (typeof listener === 'function') {
      listener(...args);
    }
  };
}

export default class Dialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: props.display ? 'in' : 'out'
    };
  }

  componentWillReceiveProps(props) {
    const mode = props.display ? 'in' : 'out';
    if (mode !== this.state.mode) {
      this.setState({mode});
    }
  }

  render(props, state) {
    const attrs = without(props, dialogProps.concat(Tipbox.includeProps));
    const classList = TokenList.from(props.className);
    classList.add('ui-dialog');
    if (props.dimmed) classList.add('dimmed');

    attrs.className = classList.toString();
    attrs.name = 'ui-dialog';
    attrs.mode = state.mode;

    const onHide = createEventListener(props.onHide);
    const onShow = createEventListener(props.onShow);

    const tipBoxAttrs = without(props, ['className'].concat(dialogProps));
    tipBoxAttrs.children = props.children;
    tipBoxAttrs.onButtonClick = function (e) {
      if (typeof props.onButtonClick === 'function') {
        props.onButtonClick(e);
      }
    };

    const tipTbox = h(Tipbox, tipBoxAttrs);

    attrs.onClick = () => {
      if (!props.docked) {
        onHide();
      }
    };

    attrs.onAfterLeave = onHide;
    attrs.onAfterEnter = onShow;

    return h(Transition, attrs, tipTbox);
  }
}
