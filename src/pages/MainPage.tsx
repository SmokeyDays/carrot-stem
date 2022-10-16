import React from "react";
import logo from "../assets/carrot.png"
import ballotSvg from "../assets/icons/ballot.svg"
import familySvg from "../assets/icons/family.svg"
import musterSvg from "../assets/icons/muster.svg"
import './MainPage.css';

export interface MainPageProps {
  setPage: (id: string) => void,

}

export class MainPage extends React.Component<MainPageProps, {}> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="main-page">
        <img src={logo} className="main-logo" alt="logo"></img>
        <div className="main-btn-list">
          <div className = "main-btn" id = "switch-family" onClick={() => this.props.setPage("FamilyPage")}>
              <img src = {familySvg} className = "main-btn-icon" alt = "family"/>
            </div>
            <div className = "main-btn" id = "switch-muster" onClick={() => this.props.setPage("MusterPage")}>
              <img src = {musterSvg} className = "main-btn-icon" alt = "muster"/>
            </div>
            <div className = "main-btn" id = "switch-ballot" onClick={() => this.props.setPage("BallotPage")}>
              <img src = {ballotSvg} className = "main-btn-icon" alt = "ballot"/>
            </div>
        </div>
      </div>
    );
  }
}