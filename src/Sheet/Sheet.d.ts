import {Component} from 'preact';
import {ComponentClass, ComponentStyle} from '../shared/types';

export interface SheetProps {
  display?: boolean;
  dimmed?: boolean;
  docked?: boolean;
  position?: 'top' | 'right' | 'bottom' | 'left';
  floating?: boolean;
  onShow?: Function;
  onHide?: Function;
  bodyStyle?: ComponentStyle;
  bodyClassName?: ComponentClass;
  className?: ComponentClass;
}

export interface SheetState {
  mode: 'in' | 'out';
}

export default class Sheet extends Component<SheetProps, SheetState> {
  render(props: SheetProps, state: SheetState): JSX.Element;
}
