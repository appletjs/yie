import {Component, RenderableProps} from 'preact';
import {Colorant} from '../shared/types';

export interface ProgressBarProps {
  indeterminate?: boolean;
  progress?: number;
  color?: Colorant;
}

export default class ProgressBar extends Component<ProgressBarProps, {}> {
  render(props: RenderableProps<ProgressBarProps>): JSX.Element;
}
