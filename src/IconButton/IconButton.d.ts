import {Component, RenderableProps} from 'preact';
import {ComponentClass} from '../shared/types';

export interface IconButtonProps {
  size?: 'big' | 'small';
  type?: 'flat' | 'raised' | 'outline',
  disabled?: boolean;
  icon?: string;
  loading?: boolean;
  component?: string;
  round?: boolean;
  className?: ComponentClass;
  onClick?: EventListener;
  __center__?: boolean;
}

export default class IconButton extends Component<IconButtonProps, {}> {
  render(props: RenderableProps<IconButtonProps>): JSX.Element;
}
