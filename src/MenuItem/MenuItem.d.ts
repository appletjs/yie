import {Component, RenderableProps} from 'preact';
import {ComponentClass} from '../shared/types';

export interface MenuItemProps {
  text?: string;
  icon?: string;
  selected?: boolean;
  disabled?: boolean;
  component?: string;
  onClick?: EventListener;
  className?: ComponentClass;
}

export default class MenuItem extends Component<MenuItemProps, {}> {
  render(props: RenderableProps<MenuItemProps>): JSX.Element;
}
