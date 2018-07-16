import {Colorant} from '../shared/types';
import {Component, RenderableProps} from 'preact';

type BottomNavigationItem = {
  text?: string;
  icon?: string;
  onClick?: (e: Event, item?: string | BottomNavigationItem) => void;
  [key: string]: any;
};

export interface BottomNavigationProps {
  textColor?: Colorant;
  backgroundColor?: Colorant;
  selectedTextColor?: string;
  type?: 'absolute' | 'fixed' | 'static';
  items?: Array<string | BottomNavigationItem>;
  selected?: number;
  onItemClick?: (e: Event, item: BottomNavigationItem) => void;
}

export default class BottomNavigation extends Component<BottomNavigationProps, {}> {
  render(props: RenderableProps<BottomNavigationProps>): JSX.Element;
}
