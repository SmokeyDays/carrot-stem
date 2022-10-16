import React from "react";

interface AlertWindowProps {
  message: string,
}

export class AlertWindow extends React.Component<AlertWindowProps, {}> {
  render(): React.ReactNode {
    return (
      <div className='alert-message-window'>
        <div className='alert-message-content'>
          {this.props.message}
        </div>
      </div>
    )
  }
}