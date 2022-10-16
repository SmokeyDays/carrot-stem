import React, { ReactNode } from "react";
import returnSvg from "../assets/icons/return.svg"
import "./ActionPage.css"

export interface ActionPageProps {
  onClickReturn: () => void
  children?: ReactNode
}

export class ActionPage extends React.Component<ActionPageProps, {}> {
  render() {
    return (
      <div className="action-page">
        <div className="action-head">
          <img src = {returnSvg} className="return-btn action-btn-icon" alt = "return" onClick = {this.props.onClickReturn}></img>
        </div>
        <div className="action-body">
          {this.props.children}
        </div>
      </div>
    );
  }
}