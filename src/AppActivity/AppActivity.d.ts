import {Component, RenderableProps} from 'preact';
import {ComponentClass, ComponentStyle} from '../shared/types';
import {ToolbarProps} from '../Toolbar';

export interface AppActivityProps extends ToolbarProps {
  className?: ComponentClass;
  style?: ComponentStyle;
  snackbarTransition?: 'slide' | 'fade';
}

export default class AppActivity extends Component<AppActivityProps, {}> {
  render(props: RenderableProps<AppActivityProps>): JSX.Element;
}
