import React, { ReactNode } from "react";
import { ActionPage } from "../components/ActionPage";
import { InfoForm } from "../components/Form";
import { LoadingPlaceholder } from "../components/LoadingPlaceholder";
import { FamilyMember, FamilyMembers } from "../regulates/interfaces";

import "./FamilyPage.css"

interface MiniMemberTdProps {
  val: string,
  submit: (val: string) => void
}

interface MiniMemberTdStates {
  editing: boolean,
}

class MiniMemberTd extends React.Component<MiniMemberTdProps, MiniMemberTdStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      editing: false,
    }
  }
  render(): React.ReactNode {
    let container: ReactNode = <div className = "member-table-tr-display" onClick={() => this.setState({editing: true})}>{this.props.val === ""? "+": this.props.val}</div>
    if(this.state.editing) {
      container = <InfoForm
        buttonName="确认"
        formVariables={{val: this.props.val}}
        formClassName = {"td-edit"}
        formButtonOnClick = {((info: Record<string, string>) => {
          this.props.submit(info.val);
          this.setState({editing: false})
        })}
      />
    }
    return (
      <td className = "member-table-td">
        {container}
      </td>
    );
  }
}

interface MiniMemberTrProps {
  info: FamilyMember,
  modify: (member: FamilyMember) => void
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
      console.log(member);
      this.props.modify(member);
    }
  }
  render() {
    const info = this.props.info;
    const tdList: Array<ReactNode> = [];
    for(const baseKey in info) {
      const key = baseKey as keyof FamilyMember;
      tdList.push(<MiniMemberTd submit={this.getModifier(key)} val = {info[key].toString()}/>)
    }
    return (
      <tr className="mini-member-card member-table-tr">
        {tdList}
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

const exampleMember2: FamilyMember = {
  "student_id": "U202100001", //string,主键,不可为空
	"name": "卡洛塔", //string,不可为空（视为主键，但没有验证）
	"qq": 123456, //int64,不可为空（视为主键，但没有验证）
	"phone": "12345612345", //string
	"mail": "carrot@qq.com", //string
	"address": "相亲相爱一家人", //string
	"birthday": ""
}


const exampleMemberList = [exampleMember, exampleMember2];

export interface FamilyPageProps {
  setPage: (val: string) => void,
}

export interface FamilyPageStates {
  members: FamilyMembers
}

export class FamilyPage extends React.Component<FamilyPageProps, FamilyPageStates> {
  changedMembers: Set<number> = new Set();

  async getMemberList(): Promise<FamilyMembers> {
    return new Promise((resolve,reject)=>{
			setTimeout(()=>{
				resolve(exampleMemberList);
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

  submitChange() {
    this.changedMembers.forEach((id: number) => {
      const member = this.state.members[id];
      console.log(member);
      // 上交更改
    })
    this.changedMembers.clear();
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
          })} info = {member}
        />
      });
      const tagList = MemberKeyList.map((val: string) => <td className="member-table-th">{val}</td>);
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