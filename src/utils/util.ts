import { Ballot } from "../regulates/interfaces";

export function getUndoneNum(ballot: Ballot) {
  let res = 0;
  for(let i = 0; i < ballot.target_member.length; ++i) {
    if(ballot.target_member[i].answered_flag === false) {
      ++res;
    }
  }
  return res;
}

export function getStatesSum(ballot: Ballot): Record<string, number> {
  const ret: Record<string, number> = {
    "未填写": getUndoneNum(ballot),
  }
  for(const i of ballot.target_member) {
    if(!i.answered_flag) {
      continue;
    }
    if(ret[i.answer] === undefined) {
      ret[i.answer] = 1;
    } else {
      ++ret[i.answer];
    }
  }
  return ret;
}