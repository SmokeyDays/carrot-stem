import React, { ReactNode } from "react";
import returnSvg from "../assets/icons/return.svg"
import "./ActionPage.css"
import { PopupBtn } from "./Popup";

export interface ActionPageProps {
  onClickReturn: () => void
  children?: ReactNode
}

export class ActionPage extends React.Component<ActionPageProps, {}> {
  render() {
    return (
      <div className="action-page">
        <div className="action-head">
          <PopupBtn btnComponent={
            <img src = {returnSvg} className="return-btn action-btn-icon" alt = "return"></img>
          } windowComponent={
            <div className="action-return-popup">
              <div className="action-return-popup-desc">
                是否返回主页？未保存的更改或将丢失！不返回请点✖。
              </div>
              <div className="action-return-popup-submit" onClick = {this.props.onClickReturn}>
                确定
              </div>
            </div>
          }/>
        </div>
        <div className="action-body">
          {this.props.children}
        </div>
      </div>
    );
  }
}