import {Component, h} from 'preact';
import {without} from "../shared/helpers";
import TokenList from "../shared/TokenList";
import Toolbar from '../Toolbar';
import Transition from 'preact-transition';
import './AppActivity.less';

export default class AppActivity extends Component {
  constructor(props) {
    super(props);

    const toolbarProps = {};
    Toolbar.includeProps.forEach(function (key) {
      if (props.hasOwnProperty(key)) {
        toolbarProps[key] = props[key];
      }
    });

    this.toolbarProps = toolbarProps;
    this.renderTimes = 0;
    this.willUpdateToolbar = false;
  }

  onToolbarChange() {
    const {onToolbarChange} = this.context;
    if (typeof onToolbarChange !== 'function') return;
    if (this.willUpdateToolbar) return;
    this.willUpdateToolbar = true;
    const states = Object.assign({}, this.toolbarProps);
    onToolbarChange(states, () => {
      this.willUpdateToolbar = false;
    });
  }

  componentWillReceiveProps(nextProps) {
    this.renderTimes++;

    const states = this.toolbarProps;
    const toolbarProps = {};
    let changed = false;

    Toolbar.includeProps.forEach(function (key) {
      if (nextProps.hasOwnProperty(key)
        && states.hasOwnProperty(key)
        && states[key] !== nextProps[key]
      ) {
        changed = true;
        toolbarProps[key] = nextProps[key];
      }
    });

    if (changed && this.renderTimes > 0) {
      Object.assign(states, toolbarProps);
      this.onToolbarChange();
    }
  }

  componentDidMount() {
    this.onToolbarChange();
    this.renderTimes++;
  }

  render(props) {
    // Attributes
    const attrs = without(props, Toolbar.includeProps.concat('children'));
    const children = attrs.children = [];

    attrs.className = TokenList
      .from(props.className)
      .add('app-activity')
      .toString();

    // Toolbar Holder
    const {navIcon, title, actions} = props;
    if (navIcon || title || actions) {
      children.push(<div className="app-activity-toolbar-holder" />);
    }

    // Children
    if (props.children) {
      children.push(...props.children);
    }

    if (!attrs.mode) {
      attrs.mode = 'in';
    }

    attrs.name = 'app-activity';
    attrs.tag = 'div';

    return h(Transition, attrs);
  }
}
