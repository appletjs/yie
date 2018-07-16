import {Component, RenderableProps} from 'preact';
import {ComponentClass} from '../shared/types';

export interface InputProps {
  type?: 'text' | 'password' | 'number' | 'email';
  value?: string | number;
  alt?: string;
  name?: string;
  placeholder?: string;
  id?: string;
  maxLength?: number;
  minLength?: number;
  max?: number;
  min?: number;
  autocomplete?: string | boolean;
  autofocus?: string | boolean;
  pattern?: string | RegExp;
  formnovalidate?: string;
  form?: string;
  list?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  onChange?: EventListener;
  onInput?: EventListener;
  onFocus?: EventListener;
  onBlur?: EventListener;
  onKeyUp?: EventListener;
  onKeyDown?: EventListener;
  onKeyPress?: EventListener;
  loading?: 'left' | 'right';
  leftIcon?: string;
  rightIcon?: string;
  status?: 'primary' | 'accent' | 'danger' | 'warning' | 'info' | 'success';
  size?: 'big';
  flat?: boolean;
  multiple?: boolean;
  block?: boolean;
  rows?: number;
  slots?: Record<string, any>;
  className?: ComponentClass;
}

export interface InputState {
  focused: boolean;
}

export default class Input extends Component<InputProps, InputState> {
  INPUT?: HTMLInputElement | HTMLTextAreaElement;

  render(props: RenderableProps<InputProps>, state: InputState): JSX.Element;
}
