import {Component, h} from 'preact';
import {without} from '../shared/helpers';
import TokenList from '../shared/TokenList';
import Button from '../Button';
import './IconButton.less';

export default class IconButton extends Component {
  render(props) {
    const attrs = without(props, ['value', 'rightIcon', 'loading']);
    attrs.leftIcon = props.icon;
    attrs.loading = Boolean(props.loading);
    attrs.className = TokenList.from(props.className).add('ui-icon-button').toString();
    attrs.block = false;
    return h(Button, attrs);
  }
}
