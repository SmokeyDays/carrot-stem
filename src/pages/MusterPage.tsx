import React from "react";
import { ActionPage } from "../components/ActionPage";

export interface MusterPageProps {
  setPage: (val: string) => void,
}

export class MusterPage extends React.Component<MusterPageProps, {}> {
  render() {
    return (
      <ActionPage onClickReturn={() => this.props.setPage("MainPage")}/>
    );
  }
}