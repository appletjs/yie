import {Component, RenderableProps} from 'preact';
import {Colorant, ComponentClass} from '../shared/types';

export interface IconProps {
  name: string;
  size?: 'small' | 'medium' | 'big' | 'large' | 'huge' | 'gigantic';
  onClick?: EventListener;
  color?: Colorant;
  className?: ComponentClass;
}

export default class Icon extends Component<IconProps, {}> {
  render(props: RenderableProps<IconProps>): JSX.Element;
}
