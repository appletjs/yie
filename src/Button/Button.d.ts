import {Component, RenderableProps} from 'preact';
import {Colorant, ComponentClass} from '../shared/types';

export interface ButtonProps {
  size?: 'big' | 'small';
  type?: 'flat' | 'raised' | 'outline',
  disabled?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  loading?: boolean | 'inline';
  value?: string | number;
  component?: string;
  block?: boolean;
  round?: boolean;
  onClick?: EventListener;
  className?: ComponentClass;
  color?: Colorant;
}

export default class Button extends Component<ButtonProps, {}> {
  render(props: RenderableProps<ButtonProps>, state: any): JSX.Element;
}
