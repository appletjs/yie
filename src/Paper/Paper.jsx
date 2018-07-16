import {Component, h} from 'preact';
import {without} from '../shared/helpers';
import TokenList from '../shared/TokenList';
import './Paper.less';

export default class Paper extends Component {
  static attributes = ['component', 'elevation'];

  render(props) {
    const attrs = without(props, Paper.attributes);
    const classes = TokenList.from(props.className);
    const {component = 'div', elevation = 3} = props;
    classes.add('ui-elevation-' + elevation);
    attrs.className = classes.toString();
    return h(component, attrs);
  }
}
