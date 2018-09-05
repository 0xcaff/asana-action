import * as React from "react";

interface Props {
  fn: () => void;
}

export class CallOnMount extends React.Component<Props> {
  public componentWillMount() {
    this.props.fn();
  }

  public render() {
    return null;
  }
}
