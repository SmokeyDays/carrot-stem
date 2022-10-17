import React, { ReactNode } from "react";
import { ActionPage } from "../components/ActionPage";
import { LoadingPlaceholder } from "../components/LoadingPlaceholder";
import { FamilyMember, FamilyMembers } from "../regulates/interfaces";

import "./FamilyPage.css"



interface MiniMmberTrProps {
  info: FamilyMember
}

const MemberKeys = ["student_id", "name", "qq", "phone", "mail", "address", "birthday"];

class MiniMemberTr extends React.Component<MiniMmberTrProps, {}> {
  render() {
    const info = this.props.info;
    return (
      <tr className="mini-member-card member-table-tr">
        <td className="member-table-td">{info.student_id}</td>
        <td className="member-table-td">{info.name}</td>
        <td className="member-table-td">{info.qq}</td>
        <td className="member-table-td">{info.phone}</td>
        <td className="member-table-td">{info.mail}</td>
        <td className="member-table-td">{info.address}</td>
        <td className="member-table-td">{info.birthday}</td>
      </tr>
    )
  }
}

const exampleMember: FamilyMember = {
  "student_id": "U202100000", //string,主键,不可为空
	"name": "卡洛塔", //string,不可为空（视为主键，但没有验证）
	"qq": 123456, //int64,不可为空（视为主键，但没有验证）
	"phone": "12345612345", //string
	"mail": "carrot@qq.com", //string
	"address": "相亲相爱一家人", //string
	"birthday": ""
}

const exampleMemberList = [exampleMember, exampleMember, exampleMember, exampleMember, exampleMember, exampleMember];

export interface FamilyPageProps {
  setPage: (val: string) => void,
}

export interface FamilyPageStates {
  members: FamilyMembers
}

export class FamilyPage extends React.Component<FamilyPageProps, FamilyPageStates> {
  async getMemberList(): Promise<FamilyMembers> {
    return new Promise((resolve,reject)=>{
			setTimeout(()=>{
				resolve(exampleMemberList );
			},1000)
		})
  }

  async renewMembers() {
    const members = await this.getMemberList();
    this.setState({
      members: members
    });
  }
  render() {
    let container: ReactNode = <LoadingPlaceholder text = "通讯录加载中..."/>
    if(this.state?.members === undefined) {
      this.renewMembers();
    } else {
      const trList = this.state.members.map((member: FamilyMember) => <MiniMemberTr info = {member}/>);
      const tagList = MemberKeys.map((val: string) => <td className="member-table-th">{val}</td>);
      const thead = (
        <thead className = "member-table-head">
          <tr>
            {tagList}
          </tr>
        </thead>
      );
      container = (
        <table>
          {thead}
          {trList}
        </table>
      )
    }
    return (
      <ActionPage onClickReturn={() => this.props.setPage("MainPage")}>
        {container}
      </ActionPage>
    );
  }
}