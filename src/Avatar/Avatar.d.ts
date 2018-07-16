import {Component, RenderableProps} from 'preact';
import {ComponentClass, ComponentStyle} from '../shared/types';

export interface AvatarProp {
  className?: ComponentClass;
  style?: ComponentStyle;
  color?: string;
  size?: string | number;
  tile?: boolean;
}

export default class Avatar extends Component<AvatarProp, {}> {
  render(props: RenderableProps<AvatarProp>): JSX.Element;
}
