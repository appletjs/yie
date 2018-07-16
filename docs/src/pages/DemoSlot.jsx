import {Component, h} from 'preact';
import Container from '../modules/Container';
import Box from '../modules/Box';

export default class DemoSlot extends Component {
  render() {
    return (
      <Container>
        {'='.repeat(10).split('').map(function (_, i) {
          if (i%4===0) return <Box slot="four" value={i}/>
          if (i%3===0) return <Box slot="three" value={i}/>
          if (i%2===0) return <Box slot="two" value={i}/>
          return <Box value={i}/>
        })}
        <div>000</div>
        <div slot="one">001</div>
        <div slot="two">002</div>
        <div slot="three">003</div>
        <div slot="four">004</div>
      </Container>
    );
  }
}
