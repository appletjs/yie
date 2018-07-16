import {Component, RenderableProps, VNode} from 'preact';
import {Colorant, Scenery} from '../shared/types';

export type SnackbarPosition = 'top left'
  | 'top center'
  | 'top right'
  | 'bottom left'
  | 'bottom right'
  | 'bottom center'
  | 'left top'
  | 'left bottom'
  | 'right top'
  | 'right bottom'
  | 'center top'
  | 'center bottom';

export interface SnackbarProps {
  message?: string | VNode | JSX.Element;
  action?: string;
  actionColor?: Colorant;
  status?: Scenery;
  onClick?: EventListener;
  onActionClick?: EventListener;
  onWillShow?: Function;
  onWillHide?: Function;
  onShow?: (value?: any) => void;
  onHide?: (value?: any) => void;
  onTimeout?: (value?: any) => void;
  display?: boolean;
  animation?: 'slide' | 'fade';
  floating?: boolean;
  position?: SnackbarPosition;
  onAnimating?: (value: SnackbarProps) => void;
  timeout?: number;
}

export default class Snackbar extends Component<SnackbarProps, {}> {
  render(props: RenderableProps<SnackbarProps>): JSX.Element;
}
