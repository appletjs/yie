import {Component, h} from 'preact';
import Avatar from '../../../src/Avatar/Avatar';

export default class DemoAvatar extends Component {
  render() {
    return (
      <div>
        <Avatar><img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John"/></Avatar>
        <Avatar color="accent">N</Avatar>
      </div>
    );
  }
}
