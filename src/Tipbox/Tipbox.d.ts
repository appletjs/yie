import {Component, RenderableProps} from 'preact';

interface TipboxButton {
  text?: string;
  onClick?: Function;
}

export interface TipboxProps {
  title?: string;
  okValue?: string;
  cancelValue?: string;
  onOk?: Function;
  onCancel?: Function;
  onButtonClick?: Function;
  buttons?: Array<string | number | TipboxButton>;
  dismiss?: any;
  onDismiss?: (e?: Event) => void;
}

export default class Tipbox extends Component<TipboxProps, {}> {
  render(props: RenderableProps<TipboxProps>): JSX.Element;
}

