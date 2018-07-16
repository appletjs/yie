import {Component, h} from 'preact';
import {without} from '../shared/helpers';
import TokenList from '../shared/TokenList';
import './LoadingIndicator.less';

export default class LoadingIndicator extends Component {
  static attributes = ['color', 'inline', 'overlay', 'size'];

  render(props) {
    const classList = TokenList.from(props.className);
    classList.add('ui-loading-indicator');
    if (props.color) classList.add(props.color);
    if (props.inline) classList.add('inline');
    if (props.overlay) classList.add('overlay');
    if (props.size) classList.add(props.size);
    const attrs = without(props, LoadingIndicator.attributes);
    attrs.className = classList.toString();
    attrs.children = [<div className="animation"/>];
    return h('div', attrs);
  }
}
