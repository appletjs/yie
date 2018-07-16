import {Component, RenderableProps} from 'preact';
import {RouterOnChangeArgs} from 'preact-router';
import {ToolbarProps} from '../Toolbar';
import './AppLayout.less';

export interface AppLayoutProps {
  history?: any;
  onRouterChange?: (args: RouterOnChangeArgs) => void;
  navIcon?: string | boolean;
}

interface AppLayoutState {
  toolbarMode: 'in' | 'out';
  toolbar: ToolbarProps;
}

export default class AppLayout extends Component<AppLayoutProps, AppLayoutState> {
  showToolbar(): void;

  hideToolbar(): void;

  setToolbar(states: any, cb?: Function): void;

  render(props: RenderableProps<AppLayoutProps>, state: AppLayoutState): JSX.Element;
}
