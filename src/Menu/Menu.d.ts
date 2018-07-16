import {Component, RenderableProps} from 'preact';
import {ComponentClass} from '../shared/types';
import MenuItem, {MenuItemProps} from '../MenuItem';

export interface MenuProps {
  open?: boolean;
  component?: string;
  raised?: boolean;
  origin?: 'top left' | 'top right' | 'bottom left' | 'bottom right' | string;
  items?: Array<MenuItemProps | string | boolean | MenuItem>;
  onBeforeOpen?: Function;
  onOpen?: Function;
  onAfterOpen?: Function;
  onBeforeClose?: Function;
  onClose?: Function;
  onAfterClose?: Function;
  className?: ComponentClass;
}

export default class Menu extends Component<MenuProps> {
  render(props: RenderableProps<MenuProps>): JSX.Element;
}
