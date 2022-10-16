import React from "react";

interface ErrorPageProps {
  message: string
}

export class ErrorPage extends React.Component<ErrorPageProps, {}> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return <div>{this.props.message}</div>
  }
}