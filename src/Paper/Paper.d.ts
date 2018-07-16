import {Component, RenderableProps, VNode} from 'preact';

export interface PaperProps {
  elevation?: number;
  component?: string | VNode | JSX.Element;
}

export default class Paper extends Component<PaperProps, {}> {
  render(props: RenderableProps<PaperProps>): JSX.Element;
}
