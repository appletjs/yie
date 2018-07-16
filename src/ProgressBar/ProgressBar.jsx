import {Component, h} from 'preact';
import {without} from '../shared/helpers';
import StyleMap from '../shared/StyleMap';
import TokenList from '../shared/TokenList';
import './ProgressBar.less';

export default class ProgressBar extends Component {
  render(props) {
    const style = StyleMap.from(props.style);
    const classList = TokenList.from(props.className);
    const attrs = without(props, ['progress', 'indeterminate', 'color']);

    let {indeterminate, progress} = props;
    if (progress == null || progress !== +progress) indeterminate = true;

    classList.add('ui-progress-bar');
    if (!indeterminate) style.set('width', progress + '%');
    else classList.add('indeterminate');
    if (props.color) classList.add(props.color);

    attrs.className = classList.toString();
    attrs.children = [<div className="ui-progress-bar__bar" style={style.toString()}/>];

    return h('div', attrs);
  }
}
