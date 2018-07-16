import {Component, RenderableProps} from 'preact';
import {Colorant, ComponentClass, ComponentStyle} from '../shared/types';

export interface TextProps {
  lines?: number;
  value?: string;
  ellipsis?: boolean;
  size?: number | string;
  color?: Colorant;
  style?: ComponentStyle;
  className?: ComponentClass;
}

export default class Text extends Component<TextProps, {}> {
  render(props: RenderableProps<TextProps>): JSX.Element | null;
}
