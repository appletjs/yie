import {Component, h} from 'preact';
import {without} from '../shared/helpers';
import TokenList from '../shared/TokenList';
import StyleMap from '../shared/StyleMap';
import Transition from 'preact-transition';
import './Sheet.less';

const sheetProps = [
  'display',
  'dimmed',
  'docked',
  'position',
  'floating',
  'onShow',
  'onHide',
  'bodyStyle',
  'bodyClassName',
];

function realPosition(p) {
  switch (p) {
    case 'top':
    case 'right':
    case 'bottom':
    case 'left':
      return p;
    default:
      return 'bottom';
  }
}

function createEventListener(listener) {
  return function (...args) {
    if (typeof listener === 'function') {
      listener(...args);
    }
  };
}

export default class Sheet extends Component {
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
    const onShow = () => {
      if (typeof props.onShow === 'function') {
        props.onShow();
      }
    };

    const onHide = () => {
      if (typeof props.onHide === 'function') {
        props.onHide();
      }
    };

    function stopPropagation(e) {
      if (!e) return;
      e.stopPropagation();
      e.preventDefault();
    }

    const classList = TokenList.from(props.className);
    classList.add('ui-sheet');
    classList.add(realPosition(props.position));
    props.dimmed && classList.add('dimmed');
    props.floating && classList.add('floating');

    const attrs = without(props, sheetProps);
    attrs.className = classList.toString();
    attrs.name = 'ui-sheet';
    attrs.mode = state.mode;
    attrs.onClick = props.docked ? () => '' : onHide;
    attrs.onAfterEnter = onShow;
    attrs.onAfterLeave = onHide;
    attrs.children = [
      <div
        className={TokenList.from(props.bodyClassName).add('ui-sheet-body').toString()}
        style={StyleMap.from(props.bodyStyle).toString()}
        onClick={stopPropagation}>{props.children}</div>
    ];

    return h(Transition, attrs);
  }
}
