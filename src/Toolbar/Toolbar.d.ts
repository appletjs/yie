import {Component, RenderableProps} from 'preact';
import {Colorant, ComponentClass} from '../shared/types';

export interface Action {
  icon?: string;
  text?: string;
  onClick?: (e: Event) => void;
}

export interface ToolbarProps {
  className?: ComponentClass;
  color?: Colorant;
  navIcon?: string;
  onNavClick?: (e: Event) => void;
  onActionClick?: (e: Event) => void;
  onMenuClick?: (e: Event) => void;
  actions?: Action[];
  maxActionCount?: number;
  title?: string;
  shadowed?: boolean;
  static?: boolean;
}

interface ToolbarState {
  open?: boolean;
}

export default class Toolbar extends Component<ToolbarProps, ToolbarState> {
  render(props: RenderableProps<ToolbarProps>, state: ToolbarState): JSX.Element;
}
