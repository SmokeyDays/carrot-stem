import React from "react";
import { ActionPage } from "../components/ActionPage";

export interface FamilyPageProps {
  setPage: (val: string) => void,
}

export class FamilyPage extends React.Component<FamilyPageProps, {}> {
  render() {
    return (
      <ActionPage onClickReturn={() => this.props.setPage("MainPage")}/>
    );
  }
}