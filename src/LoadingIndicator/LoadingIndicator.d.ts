import {Component, RenderableProps} from 'preact';
import {Colorant, ComponentClass} from '../shared/types';

export interface LoadingIndicatorProps {
  className?: ComponentClass;
  size?: 'small' | 'big';
  overlay?: boolean;
  inline?: boolean;
  half?: boolean;
  color?: Colorant;
}

export default class LoadingIndicator extends Component<LoadingIndicatorProps, {}> {
  render(props: RenderableProps<LoadingIndicatorProps>): JSX.Element;
}
