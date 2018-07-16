import {Component, h} from 'preact';
import LoadingIndicator from '../../../src/LoadingIndicator/LoadingIndicator';

export default class DemoLoadingIndicator extends Component {
  state = {
    half: false
  };

  render() {
    return (
      <div>
        <div>
          <label><input type="checkbox" onChange={e => this.setState({half: e.target.checked})}/> half</label>
        </div>
        <LoadingIndicator/>
        <LoadingIndicator color="primary" half={this.state.half}/>
        <LoadingIndicator color="accent" half={this.state.half}/>
        <LoadingIndicator color="danger" half={this.state.half}/>
        <LoadingIndicator color="warning" half={this.state.half}/>
        <LoadingIndicator color="info" half={this.state.half}/>
        <LoadingIndicator color="success" half={this.state.half}/>
      </div>
    );
  }
};
