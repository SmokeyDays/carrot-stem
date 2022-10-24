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
  serverURL = "http://106.52.43.175:3487/api";
  token = "carrot";
  // Singleton
  private static instance: Connection;
  private constructor() { }
  static getInstance() {
    if (!this.instance) {
      this.instance = new Connection();
    }
    return this.instance;
  }


  async getFamily() {
    const res = await fetch(this.serverURL + "/family/all?token=" + this.token, {
      "headers": {},
      "body": null,
      "method": "GET",
    });
    const json = await res.json();
    return json.data;
  }

  async addMember(member: FamilyMember) {
    const res = await fetch(this.serverURL + "/family?token=" + this.token, {
      "headers": {
      },
      "body": JSON.stringify(member),
      "method": "POST",
    });
    const json = await res.json();
    console.log(json.data);
  }

  async delMember(member: FamilyMember) {
    const res = await fetch(this.serverURL + "/family?student_id=" + member.student_id + "&token=" + this.token, {
      "headers": {
      },
      "body": null,
      "method": "DELETE",
    });
    const json = await res.json();
    console.log(json.data);
  }

  async changeMember(member: FamilyMember) {
    const res = await fetch(this.serverURL + "/family?student_id=" + member.student_id + "&token=" + this.token, {
      "headers": {
      },
      "body": JSON.stringify(member),
      "method": "PUT",
    });
    const json = await res.json();
    console.log(json.data);
  }

  async getMusterList() {
    const res = await fetch(this.serverURL + "/muster/all?token=" + this.token, {
      "headers": {},
      "body": null,
      "method": "GET",
    });
    const json = await res.json();
    console.log(json.data);
    if(json.data == null) {
      return [];
    }
    return json.data;
  }
  
  async changeMusterPeople(title: string, names: string[], del: boolean) {
    if(del) {
      const res = await fetch(this.serverURL + "/muster/people?title=" + title + "&token=" + this.token, {
        "headers": {},
        "body": JSON.stringify({
          name: names
        }),
        "method": "DELETE",
      });
      const json = await res.json();
      console.log(json.data);
    } else {
      const res = await fetch(this.serverURL + "/muster/people?title=" + title + "&token=" + this.token, {
        "headers": {},
        "body": JSON.stringify({
          name: names
        }),
        "method": "POST",
      });
      const json = await res.json();
      console.log(json.data);
    }
  }

  async changeMuster(title: string, del: boolean) {
    if(del) {
      const res = await fetch(this.serverURL + "/muster?title=" + title + "&token=" + this.token, {
        "headers": {},
        "body": null,
        "method": "DELETE",
      });
      const json = await res.json();
      console.log(json.data);
    } else {
      const res = await fetch(this.serverURL + "/muster?title=" + title + "&token=" + this.token, {
        "headers": {},
        "body": null,
        "method": "POST",
      });
      const json = await res.json();
      console.log(json.data);
    }
  }

  async getBallotList() {
    const res = await fetch(this.serverURL + "/ballot/all?token=" + this.token, {
      "headers": {},
      "body": null,
      "method": "GET",
    });
    const json = await res.json();
    return json.data;
  }

  async addBallot(title: string, muster: string, remark: string) {
    const res = await fetch(this.serverURL + "/ballot?title=" + title + "&muster=" + muster + "&remark=" + remark + "&token=" + this.token, {
      "headers": {
      },
      "body": null,
      "method": "POST",
    });
    const json = await res.json();
    console.log(json.data);
  }

  async updateAnswer(title: string, name: string, answer: string) {
    const res = await fetch(this.serverURL + "/ballot/member?title=" + title + "&answer=" + answer + "&name=" + name + "&token=" + this.token, {
      "headers": {
      },
      "body": null,
      "method": "PUT",
    });
    const json = await res.json();
    console.log(json.data);
    return json.data;
  }

  async deleteBallot(title: string) {
    const res = await fetch(this.serverURL + "/ballot?title=" + title + "&token=" + this.token, {
      "headers": {
      },
      "body": null,
      "method": "DELETE",
    });
    const json = await res.json();
    console.log(json.data);
  }

  async sendBroadcast(title: string, message: string) {
    const res = await fetch(this.serverURL + "/ballot/member/broadcast?title=" + title + "&message=" + message + "&token=" + this.token, {
      "headers": {
      },
      "body": null,
      "method": "POST",
    });
    const json = await res.json();
    console.log(json.data);
  }
}