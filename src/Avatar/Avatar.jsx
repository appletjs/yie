import {Component, h} from 'preact';
import {convertSize, makeAccessor, without} from '../shared/helpers';
import TokenList from '../shared/TokenList';
import StyleMap from '../shared/StyleMap';
import './Avatar.less';

const access = makeAccessor(
  'primary,accent,danger,warning,info,success'
);

export default class Avatar extends Component {
  render(props) {
    const classList = TokenList.from(props.className);
    classList.add('ui-avatar');
    if (props.tile) classList.add('tile');

    const styleMap = StyleMap.from(props.style);
    const size = convertSize(props.size || 36);
    styleMap.set('width', size);
    styleMap.set('height', size);

    const {color} = props;
    if (color && access(color)) classList.add(color);
    else if (color) styleMap.set('background', color);

    const attrs = without(props, ['tile', 'size', 'color']);
    attrs.className = classList.toString();
    attrs.style = styleMap.toString();

    return h('div', attrs);
  }
}
