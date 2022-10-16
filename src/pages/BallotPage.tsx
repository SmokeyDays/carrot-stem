import React from "react";
import { ActionPage } from "../components/ActionPage";


export interface BallotPageProps {
  setPage: (val: string) => void,
}

export class BallotPage extends React.Component<BallotPageProps, {}> {
  render() {
    return (
      <ActionPage onClickReturn={() => this.props.setPage("MainPage")}/>
    );
  }
}