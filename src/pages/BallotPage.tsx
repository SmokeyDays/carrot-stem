import React, { ReactNode } from "react";
import { ActionPage } from "../components/ActionPage";
import { EditableForm, InfoForm } from "../components/Form";
import { LoadingPlaceholder } from "../components/LoadingPlaceholder";
import { PopupBtn } from "../components/Popup";
import { Ballot, BallotPerson } from "../regulates/interfaces";
import { Connection } from "../utils/connection";
import { getStatesSum, getUndoneNum } from "../utils/util";
import broadcastSvg from "../assets/icons/broadcast.svg";
import deleteSvg from "../assets/icons/delete.svg";
import leftReturnSvg from "../assets/icons/left_return.svg";

import "./BallotPage.css"

interface BallotDetailProps {
  ballot: Ballot,
  backToList: () => void,
  deleteBallot: () => void;
}

interface BallotDetailStates {
  ballot: Ballot
}

class BallotDetail extends React.Component<BallotDetailProps, BallotDetailStates> {

  constructor(props: any) {
    super(props);
    this.state = {
      ballot: this.props.ballot
    }
  }

  async updateAnswer(title: string, name: string, answer: string) {
    const newBallot = await Connection.getInstance().updateAnswer(title, name, answer);
    this.setState({
      ballot: newBallot
    });
  }

  render() {
    const ballot = this.props.ballot;
    let refresh = (
      <EditableForm
        formClassName="ballot-refresh"
        editable = {true}
        submit={async (msg: string) => {
          await Connection.getInstance().sendBroadcast(ballot.title, msg);
        }}
        val = {""}>
          <img src={broadcastSvg} className = "refresh-icon" alt="refresh"></img>
      </EditableForm>
    );
    const statesSum = getStatesSum(ballot);
    const detailStates: Array<React.ReactNode> = [];
    for(const i in statesSum) {
      detailStates.push(
        <div className="ballot-one-state" id={i}>{i + "(" + statesSum[i] + ")"}</div>
      )
    }
    const trList = ballot.target_member.map((val, id) => {
      return (
        <tr>
          <td className="people-table-td" id = {"col-" + id}>
            {val.people.name}
          </td>
          <td className="people-table-td" id = {"col-" + id}>
            {val.answered_flag? "✔": "✘"}
          </td>
          <td className="people-table-td" id = {"col-" + id}>
            <EditableForm
              formClassName="member-table"
              editable = {true}
              submit={(ans: string) => {
                this.updateAnswer(ballot.title, val.people.name, ans);
              }}
              val = {val.answer}/>
          </td>
        </tr>
      )
    })
    return (
      <div className="ballot-detail">
        <div className="ballot-options">
          <div className="ballot-return-list">
            <img src={leftReturnSvg}
              className = "return-list-icon"
              alt="refresh"
              onClick = {this.props.backToList}></img>
          </div>
          <div className="ballot-delete">
            <img src={deleteSvg}
              className = "delete-icon"
              alt="refresh"
              onClick = {this.props.deleteBallot}></img>
          </div>
          {refresh}
        </div>
        <div className="ballot-detail-desc">
          <div className="ballot-detail-title">
            {ballot.title}
          </div>
          <div className="ballot-detail-remark">
            {ballot.remark}
          </div>
          <div className="ballot-detail-states">
            <div className="ballot-states-list">
              {detailStates}
            </div>
          </div>
        </div>
        <div className="ballot-people-list">
          <table className="people-table">
            <thead className = "people-table-head">
              <tr className="people-table-tr">
                <td className="people-table-th" id="name">姓名</td>
                <td className="people-table-th" id="flag">填写状态</td>
                <td className="people-table-th" id="answer">回答</td>
              </tr>
            </thead>
            <tbody>
              {trList}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

interface BallotAddCardProps {
  addBallot: (title: string, muster: string, remark: string) => void,
}

interface BallotAddCardStates {
  editing: boolean
}

class BallotAddCard extends React.Component<BallotAddCardProps, BallotAddCardStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      editing: false,
    };
  }
  render() {
    let container = <div className="ballot-card-title" onClick={() => {
      this.setState({
        editing: true,
      });
    }}>+</div>;
    if(this.state.editing === true) {
      container = <InfoForm 
        buttonName={"提交"}
        formVariables={{
          title: "标题",
          muster: "名单",
          remark: "备注"
        }}
        formClassName={"ballot-add"}
        formButtonOnClick={(info: Record<string, string>) => {
          this.props.addBallot(info.title, info.muster, info.remark);
          this.setState({
            editing: false,
          })
      }}/>
    }
    return (
      <div className = "ballot-card">
        {container}
      </div>
    );
  }
}

export interface BallotPageProps {
  setPage: (val: string) => void,
}

export interface BallotPageStates {
  ballots: Array<Ballot> | null,
  displayBallot: Record<string, boolean>
}

export class BallotPage extends React.Component<BallotPageProps, BallotPageStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      ballots: null,
      displayBallot: {},
    }
  }

  async getBallotList(): Promise< Array<Ballot> > {
    return new Promise((resolve,reject)=>{
			setTimeout(()=>{
				resolve(Connection.getInstance().getBallotList());
			},100)
		})
  }

  async renewBallot() {
    const ballots = await this.getBallotList();
    this.setState({
      ballots: ballots,
    });
  }

  async addBallot(title: string, muster: string, remark: string) {
    await Connection.getInstance().addBallot(title, muster, remark);
    this.renewBallot();
  }

  async deleteBallot(title: string) {
    await Connection.getInstance().deleteBallot(title);
    this.renewBallot();
  }


  setDisplayBallot(val: number) {
    const display = this.state.displayBallot;
    if(display[val] === undefined) {
      display[val] = true;
    } else {
      display[val] = !display[val];
    }
    this.setState({
      displayBallot: display,
    });
  }

  render() {
    let container: ReactNode = <LoadingPlaceholder text = "名单加载中..."/>;
    if(this.state.ballots === null) {
      this.renewBallot();
    } else {
      const ballotCardList = this.state.ballots.map((val, id) => {
        const ret = (this.state.displayBallot[id] === undefined
          || this.state.displayBallot[id] === false)
          ? (
          <div className = "ballot-card" id={"ballot-card-" + id} onClick = {() => {
            this.setDisplayBallot(id);
          }}>
            {val.title + "(" + (val.target_member.length - getUndoneNum(val)) + "/" + val.target_member.length + ")"}
          </div>
        ): (
          <BallotDetail
            ballot = {val}
            backToList = {() => {
              this.setDisplayBallot(id);
            }}
            deleteBallot = {() => {
              this.deleteBallot(val.title);
            }}
          />
        );
        return ret;
      });
      container = (
        <div className = "ballot-list">
          {ballotCardList}
          <BallotAddCard addBallot={this.addBallot.bind(this)}/>
        </div>
      );
    }
    return (
      <ActionPage onClickReturn={() => this.props.setPage("MainPage")}>
        {container}
      </ActionPage>
    );
  }
}