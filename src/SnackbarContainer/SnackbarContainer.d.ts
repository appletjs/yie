import {Component, RenderableProps} from 'preact';
import {SnackbarPosition, SnackbarProps} from '../Snackbar';

export interface SnackbarContainerProps {
  queueSnackbars?: boolean;
  duration?: number;
  position?: SnackbarPosition;
  transition?: 'slide' | 'fade';
}

interface SnackbarContainerState {
  show: boolean;
  snackbar: SnackbarProps | null;
}

export default class SnackbarContainer extends Component<SnackbarContainerProps, SnackbarContainerState> {
  createSanckbar(snackbar: any): void;

  render(props: RenderableProps<SnackbarContainerProps>, state: SnackbarContainerState): JSX.Element;
}
