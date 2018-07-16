import {Component, RenderableProps} from 'preact';
import {ComponentClass} from '../shared/types';

export interface RippleProps {
  component?: string | Component;
  className?: ComponentClass;
  __center__?: boolean;
}

export default class Ripple extends Component<RippleProps, {}> {
  render(props: RenderableProps<RippleProps>): JSX.Element;
}
