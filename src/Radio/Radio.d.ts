import {Component, RenderableProps} from 'preact';
import {Colorant} from '../shared/types';

export interface RadioProps {
  name?: string;
  label?: string;
  value?: any;
  color?: Colorant;
  labelPosition?: 'left' | 'right';
  disabled?: boolean;
  onBlur?: EventListener;
  onFocus?: EventListener;
  onChange?: (e: Event, active: boolean) => void;
  children?: any[];
}

interface RadioState {
  isActive: boolean;
}

export default class Radio extends Component<RadioProps, RadioState> {
  render(props: RenderableProps<RadioProps>, state: RadioState): JSX.Element;
}
