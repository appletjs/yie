import {Component, h} from 'preact';
import {generateHyperIcon} from '../shared/icon';
import {without} from '../shared/helpers';
import TokenList from '../shared/TokenList';
import './Icon.less';

export default class Icon extends Component {
  render(props) {
    const classList = TokenList.from(props.className);
    props.color && classList.add(props.color);
    classList.add(props.size || 'medium');

    const attrs = without(props, ['name', 'size', 'color']);
    attrs.className = classList.toString();

    return generateHyperIcon(h, props.name, attrs);
  }
}
