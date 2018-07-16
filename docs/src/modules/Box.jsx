import {Component, h} from 'preact';

export default class Box extends Component {
  render(props) {
    return (
      <div>{props.value}</div>
    );
  }
}
