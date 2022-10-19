import { addAbortSignal } from "stream";
import { FamilyMember, Muster } from "../regulates/interfaces";

const exampleMuster1: Muster = {
  "title": "勇敢的野猪骑士",
  "people": [
    {
      "name": "卡洛塔",
      "qq": 123456,
    },
    {
      "name": "塔洛卡",
      "qq": 654321,
    },
    {
      "name": "塔洛卡",
      "qq": 654321,
    },
    {
      "name": "塔洛卡",
      "qq": 654321,
    },
    {
      "name": "塔洛卡",
      "qq": 654321,
    },
    {
      "name": "塔洛卡",
      "qq": 654321,
    },
    {
      "name": "塔洛卡",
      "qq": 654321,
    },
    {
      "name": "塔洛卡",
      "qq": 654321,
    },
    {
      "name": "塔洛卡",
      "qq": 654321,
    },
    {
      "name": "塔洛卡",
      "qq": 654321,
    },
    {
      "name": "塔洛卡",
      "qq": 654321,
    }
  ],
};

const exampleMuster2: Muster = {
  "title": "A",
  "people": [
    {
      "name": "卡洛塔",
      "qq": 123456,
    },
    {
      "name": "塔洛卡",
      "qq": 654321,
    }
  ],
};

const exampleMuster3: Muster = {
  "title": "B",
  "people": [
    {
      "name": "卡洛塔",
      "qq": 123456,
    },
    {
      "name": "塔洛卡",
      "qq": 654321,
    }
  ],
};

const musterList = [exampleMuster1, exampleMuster2, exampleMuster3];

export class Connection {
  serverURL = "http://106.52.43.175:3456/api";
  token = "nsOd";
  // Singleton
  private static instance: Connection;
  private constructor() { }
  static getInstance() {
    if (!this.instance) {
      this.instance = new Connection();
    }
    return this.instance;
  }

  getMusterList() {
    return musterList;
  }

  changeMusterPerson(title: string, name: string, del: boolean) {
    if (!del) {
      for(const i of musterList) {
        if(i.title === title) {
          for(let j = 0; j < i.people.length; ++j) {
            if(i.people[j].name === name) {
              i.people.splice(j, 1);
              break;
            }
          }
        }
      }
    } else {
      for(const i of musterList) {
        if(i.title === title) {
          i.people.push({
            name: name,
            qq: 114514,
          })
        }
      }
    }
  }
  
  changeMusterPeople(title: string, names: string[], del: boolean) {
    for(const i of names) {
      this.changeMusterPerson(title, i, del);
    }
  }

  changeMuster(title: string, del: boolean) {
    if(del) {
      
    } else {
      musterList.push({
        title: title,
        people: [],
      });
    }
  }

  async getFamily() {
    const res = await fetch(this.serverURL + "/family/all?token=" + this.token, {
      "headers": {},
      "body": null,
      "method": "GET",
      mode: "no-cors",
    });
    console.log(res);
    const json = await res.json();
    console.log(json.text());
    return json.text();
  }

  async addMember(member: FamilyMember) {
    const res = await fetch(this.serverURL + "/family?token=" + this.token, {
      "headers": {
        "Access-Control-Allow-Origin": "*",
      },
      "body": JSON.stringify(member),
      "method": "POST",
      mode: "no-cors",
    });
    console.log(res);
  }
  async changeMember(member: FamilyMember) {
    const res = await fetch(this.serverURL + "/family?student_id=" + member.student_id + "?token=" + this.token, {
      "headers": {
        "Access-Control-Allow-Origin": "*",
      },
      "body": JSON.stringify(member),
      "method": "PUT",
      mode: "no-cors",
    });
    console.log(res);
  }
}