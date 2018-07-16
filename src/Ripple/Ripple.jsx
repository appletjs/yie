import {Component, h} from 'preact';
import {without} from '../shared/helpers';
import TokenList from '../shared/TokenList';
import RippleInk from '../RippleInk';
import './Ripple.less';

export default class Ripple extends Component {
  // containerDOM = null;
  render(props) {
    const attrs = without(props, ['ref', 'component']);
    const children = attrs.children = (props.children || []).slice();
    const {ref, component = 'div'} = props;

    const classList = TokenList.from(props.className);
    classList.add('ui-ripple');
    attrs.className = classList.toString();

    attrs.ref = node => {
      this.containerDOM = node;
      ref && ref(node);
    };

    children.push(
      <RippleInk
        center={props.centerRipple}
        trigger={() => this.containerDOM}
      />
    );

    return h(component, attrs);
  }
};
