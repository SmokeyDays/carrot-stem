import React from "react"
import loadingSvg from "../assets/icons/loading.svg"
import { FamilyMember, FamilyMembers } from "../regulates/interfaces"
import "./LoadingPlaceholder.css"

export interface LoadingProps {
  text: string
}

export class LoadingPlaceholder extends React.Component<LoadingProps, {}> {

  render() {
    return (
      <div className="loading-placeholder">
        <div className="loading-text">{this.props.text}</div>
        <img src = {loadingSvg} className = "loading-icon" alt = "loading"></img>
      </div>
    )
  }
}