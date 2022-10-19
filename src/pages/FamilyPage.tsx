import React, { ReactNode } from "react";
import { ActionPage } from "../components/ActionPage";
import { EditableForm, InfoForm } from "../components/Form";
import { LoadingPlaceholder } from "../components/LoadingPlaceholder";
import { FamilyMember, FamilyMembers } from "../regulates/interfaces";
import submitSvg from "../assets/icons/submit.svg"

import "./FamilyPage.css"
import { Connection } from "../utils/connection";
import { PopupBtn } from "../components/Popup";

interface MiniMemberTrProps {
  info: FamilyMember,
  modify: (member: FamilyMember) => void,
  delthis: () => void,
}

const MemberKeyList = ["student_id", "name", "qq", "phone", "mail", "address", "birthday"];

class MiniMemberTr extends React.Component<MiniMemberTrProps, {}> {
  getModifier(key: keyof FamilyMember) {
    return (val: string) => {
      const member = this.props.info;
      if(key === "qq") {
        member[key] = parseInt(val);
      } else {
        member[key] = val;
      }
      this.props.modify(member);
    }
  }
  render() {
    const info = this.props.info;
    const tdList: Array<ReactNode> = [];
    for(const baseKey in info) {
      const key = baseKey as keyof FamilyMember;
      tdList.push(
          <td className = "member-table-td">
            <EditableForm formClassName="member-table" editable = {key !== "student_id"} submit={this.getModifier(key)} val = {info[key].toString()}/>
          </td>
        );
    }
    return (
      <tr className="mini-member-card member-table-tr">
        <td>
          <PopupBtn btnComponent={
              <div className="member-del-btn">
                ✖
              </div> 
            } windowComponent={
              <div className="member-del-popup">
                <div className="member-del-popup-desc">
                  是否删除？此操作将不可撤回！
                  删除前将自动提交其他更改！
                </div>
                <div className="member-del-popup-submit" onClick = {this.props.delthis}>
                  确定
                </div>
              </div>
            }/>
        </td>
        {tdList}
      </tr>
    )
  }
}

export interface FamilyPageProps {
  setPage: (val: string) => void,
}

export interface FamilyPageStates {
  members: FamilyMembers
}

export class FamilyPage extends React.Component<FamilyPageProps, FamilyPageStates> {
  changedMembers: Set<number> = new Set();
  addMembers: Set<number> = new Set();

  async getMemberList(): Promise<FamilyMembers> {
    return new Promise((resolve,reject)=>{
			setTimeout(()=>{
				resolve(Connection.getInstance().getFamily() as unknown as FamilyMembers);
        // resolve(exampleMemberList);
			},100)
		})
  }

  async renewMembers() {
    const members = await this.getMemberList();
    this.setState({
      members: members
    });
  }

  modifyMember(member: FamilyMember, id: number) {
    const members = this.state.members;
    members[id] = member;
    this.setState({
      members: members
    });
    this.changedMembers.add(id);
  }

  addMember(studentID: string) {
    const member = {
      "student_id": studentID, //string,主键,不可为空
      "name": "卡洛塔", //string,不可为空（视为主键，但没有验证）
      "qq": 123456, //int64,不可为空（视为主键，但没有验证）
      "phone": "12345612345", //string
      "mail": "carrot@qq.com", //string
      "address": "相亲相爱一家人", //string
      "birthday": "2050-12-31T00:00:00Z"
    }
    const members = this.state.members;
    this.addMembers.add(members.length);
    members.push(member);
    this.setState({
      members: members
    });
  }

  async submitChange() {
    await this.changedMembers.forEach((id: number) => {
      console.log(id);
      Connection.getInstance().changeMember(this.state.members[id]);
    })
    await this.addMembers.forEach((id: number) => {
      Connection.getInstance().addMember(this.state.members[id]);
      // 上交更改
    })
    this.changedMembers.clear();
    this.addMembers.clear();
    this.renewMembers();
  }

  render() {
    let container: ReactNode = <LoadingPlaceholder text = "通讯录加载中..."/>
    if(this.state?.members === undefined) {
      this.renewMembers();
    } else {
      const trList = this.state.members.map((member: FamilyMember, id: number) => {
        return <MiniMemberTr
          modify={((member: FamilyMember) => {
            this.modifyMember(member, id);
          })}
          delthis = {async () => {
            await this.submitChange();
            await Connection.getInstance().delMember(member);
          }}
          info = {member}
        />
      });
      const tagList = MemberKeyList.map((val: string) => <td className="member-table-th">{val}</td>);
      const thead = (
        <thead className = "member-table-head">
          <tr>
            <td></td>
            {tagList}
          </tr>
        </thead>
      );
      container = [
        <table className="member-table">
          {thead}
          <tbody>
            {trList}
          </tbody>
        </table>,
        <div className="add-member-box">
          <EditableForm formClassName="add-member" editable = {true} submit={(val: string) => {
            this.addMember(val);
          }} val = {""}/>
        </div>,
        <img src = {submitSvg} className="submit-btn submit-btn-icon" alt = "submit" onClick = {this.submitChange.bind(this)}></img>
      ]
    }
    return (
      <ActionPage onClickReturn={() => this.props.setPage("MainPage")}>
        {container}
      </ActionPage>
    );
  }
}