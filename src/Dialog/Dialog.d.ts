import {Component, RenderableProps} from 'preact';
import {TipboxProps} from '../Tipbox';

export interface DialogProps extends TipboxProps {
  display?: boolean;
  dimmed?: boolean;
  docked?: boolean;
  onHide?: Function;
  onShow?: Function;
}

interface DialogState {
  mode: 'in' | 'out';
}

export default class Dialog extends Component<DialogProps, DialogState> {
  render(props: RenderableProps<DialogProps>, state: DialogState): JSX.Element;
}
