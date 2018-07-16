import {Component, h} from 'preact';
import BottomNavigation from '../../../dist/BottomNavigation/esm';

export default class DemoBottomNavigation extends Component {
  state = {
    bgColor: ''
  };

  render(props, state) {
    return (
      <div>
        <div>
          <label><input type="radio" name="bg" onInput={() => this.setState({bgColor: ''})}/> default</label>
          <label><input type="radio" name="bg" value="danger" onInput={() => this.setState({bgColor: 'danger'})}/> danger</label>
          <label><input type="radio" name="bg" value="warning" onInput={() => this.setState({bgColor: 'warning'})}/> warning</label>
          <label><input type="radio" name="bg" value="info" onInput={() => this.setState({bgColor: 'info'})}/> info</label>
          <label><input type="radio" name="bg" value="success" onInput={() => this.setState({bgColor: 'success'})}/> success</label>
          <label><input type="radio" name="bg" value="primary" onInput={() => this.setState({bgColor: 'primary'})}/> primary</label>
          <label><input type="radio" name="bg" value="accent" onInput={() => this.setState({bgColor: 'accent'})}/> accent</label>
        </div>
        <BottomNavigation/>
        <BottomNavigation items={[
          123,
          234,
          345
        ]}/>
        <BottomNavigation backgroundColor={state.bgColor} items={[
          {text: 'hello'},
          {icon: 'android'},
          {icon: 'home', text: 'home'},
          ''
        ]}/>
      </div>
    );
  }
};
