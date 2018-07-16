import {Component} from 'preact';

export interface RippleInkProps {
  trigger?: Element | (() => Element);
  center?: boolean;
}

export default class RippleInk extends Component<RippleInkProps, {}> {
  currentTrigger?: Element;
  currentTouchStart?: EventListener;
  currentMouseDown?: EventListener;

  render(): JSX.Element;
}
