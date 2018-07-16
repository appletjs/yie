import {Component, h} from 'preact';
import Paper from '../../../src/Paper/Paper';
import '../styles/DemoPaper.less';

export default class DemoPaper extends Component {
  render() {
    return (
      <div className="paper-demo-wrapper">
        {'-'.repeat(25).split('').map(function (x, i) {
          return <Paper className="demo-paper" elevation={i}>{i}</Paper>
        })}
      </div>
    );
  }
}
