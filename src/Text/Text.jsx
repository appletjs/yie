import {Component, h} from 'preact';
import {convertSize, without} from '../shared/helpers';
import StyleMap from '../shared/StyleMap';
import TokenList from '../shared/TokenList';
import './Text.less';

export default class Text extends Component {
  render(props) {
    // 没有内容不渲染到DOM上
    if (props.value === undefined && props.children.length === 0) {
      return null;
    }

    const attrs = without(props, ['lines', 'ellipsis', 'value']);

    if (props.value !== undefined) {
      attrs.children = [
        String(props.value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          // .replace(/ /g, '&nbsp;')
          .replace(/\'/g, '&#39;')
          .replace(/\"/g, '&quot;')
      ];
    }

    const styleMap = StyleMap.from(props.style);
    styleMap.set('display', '-webkit-box');

    if (props.ellipsis && !props.lines) {
      attrs.lines = 1;
    }

    if (props.lines) {
      // 限制在一个块元素显示的文本的行数
      styleMap.set('word-break', 'break-all');
      styleMap.set('-webkit-line-clamp', props.lines);
      styleMap.set('-webkit-box-orient', 'vertical');
      styleMap.set('overflow', 'hidden');
    }

    if (props.size) {
      styleMap.set('font-size', convertSize(props.size));
    }

    attrs.style = styleMap.toString();

    const classList = TokenList.from(props.className);
    classList.add('ui-text');
    if (props.color) classList.add(props.color);
    attrs.className = classList.toString();

    return h('span', attrs);
  }
}
