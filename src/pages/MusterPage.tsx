import React, { ReactNode } from "react";
import { ActionPage } from "../components/ActionPage";
import { EditableForm } from "../components/Form";
import { LoadingPlaceholder } from "../components/LoadingPlaceholder";
import { PopupBtn } from "../components/Popup";
import { Muster, MusterPerson } from "../regulates/interfaces";
import { Connection } from "../utils/connection";

import "./MusterPage.css"

interface MusterBoxProps {
  info: Muster,
  change: (name: string, del: boolean) => void,
  delthis: () => void
}

class MusterBox extends React.Component<MusterBoxProps, {}> {
  render() {
    const peopleList = this.props.info.people?.map((val: MusterPerson) => {
      return <div className="muster-person-display" onClick={() => {
        this.props.change(val.name, true);
      }}>{val.name}</div>;
    });
    return (
      <div className="muster-box">
        <div className="muster-title">
          <PopupBtn btnComponent={
            <div className="muster-del-btn">
              ✖
            </div> 
          } windowComponent={
            <div className="muster-del-popup">
              <div className="muster-del-popup-desc">
                是否删除？此操作将不可撤回！
              </div>
              <div className="muster-del-popup-submit" onClick = {this.props.delthis}>
                确定
              </div>
            </div>
          }/>
          <div className="muster-title-desc">
            {this.props.info.title}
          </div>
        </div>
        <div className="muster-people-list">
          {peopleList}
          <EditableForm val={""} formClassName={"muster-person"} submit={(val: string) => {
            if(val !== "") {
              this.props.change(val, false);
            }
          } } editable={true} />
        </div>
      </div>
    );
    ;
  }
}

interface MusterPageProps {
  setPage: (val: string) => void,
}

interface MusterPageStates {
  musters: Array<Muster>
}

export class MusterPage extends React.Component<MusterPageProps, MusterPageStates> {
  async getMusterList(): Promise< Array<Muster> > {
    return new Promise((resolve,reject)=>{
			setTimeout(()=>{
				resolve(Connection.getInstance().getMusterList());
			},100)
		})
  }

  async renewMusters() {
    const musters = await this.getMusterList();
    this.setState({
      musters: musters
    });
  }

  async changeMusterPerson(id: number, val: string, del: boolean = false) {
    await Connection.getInstance().changeMusterPeople(this.state.musters[id].title, [val], del);
    this.renewMusters();
  }

  async changeMuster(title: string, del: boolean = false) {
    await Connection.getInstance().changeMuster(title, del);
    this.renewMusters();
  }
  
  render() {
    let container: ReactNode = <LoadingPlaceholder text = "名单加载中..."/>
    if(this.state?.musters === undefined) {
      this.renewMusters();
    } else {
      const musterList = this.state.musters?.map((val: Muster, id: number) => {
        return <MusterBox delthis={() => {
          this.changeMuster(val.title, true);
        }} info = {val} change = {(name: string, del: boolean) => {
          this.changeMusterPerson(id, name, del);
        }}/>;
      })
      container = <div className="muster-list">
        {musterList}
        <div className="add-muster">
          <EditableForm val={""} formClassName={"add-muster"} submit={(val: string) => {
            this.changeMuster(val, false);
          } } editable={true} />
        </div>
      </div>;
    }
    return (
      <ActionPage onClickReturn={() => this.props.setPage("MainPage")}>
        {container}
      </ActionPage>
    );
  }
}