import * as React from "react";

interface Props {
  fn: () => void;
}

/**
 * Calls a function on mount. This is a symptom of using a declarative design
 * for this application ont working.
 */
export class CallOnMount extends React.Component<Props> {
  public componentWillMount() {
    this.props.fn();
  }

  public render() {
    return null;
  }
}
