结构体示例：

```json
//familyMember
{
	"student_id": "U202100000", //string,主键,不可为空
	"name": "卡洛塔", //string,不可为空（视为主键，但没有验证）
	"qq": 123456, //int64,不可为空（视为主键，但没有验证）
	"phone": "12345612345", //string
	"mail": "carrot@qq.com", //string
	"address": "相亲相爱一家人", //string
	"birthday": ""
}
```

```json
//muster
{
    "title": "勇敢的野猪骑士",
    "people": [
        {
            "name": "卡洛塔",
    		"qq":123456,
    	},
        {
            "name": "塔洛卡",
            "qq":654321,
        }
    ],
}
```

```json
//ballot
{
	"title": "核酸情况10.16",
    "offered_options": ["已做","未做","未填写"],
    "target_member": [
        {
            "info": {
                "name": "卡洛塔",
                "qq": 123456,
           	},
            "option": "已做",
        }
    ]
}
```

### 响应格式

```json
{
    "status": 200,
    "data": data,
}
```

**以下响应参数均指 data 字段**

# Family 通讯录

以下接口均需要额外参数 `token`

#### 获取所有成员信息 `GET /family/all`

##### **请求参数** 

无

**响应参数**

- 一个 `familyMember` 结构体<u>数组</u>

#### 增加一个成员 `POST /family`

**请求参数**

- 一个 `familyMember` 结构体

**响应参数**

- 成功插入的 `familyMember` 结构体，正常情况下应与请求一致

#### 删除一个成员 `DELETE /family`

**请求参数**

- 字段 `student_id`，成员学号

**响应参数**

无

#### 更新一个成员 `PUT /family`

**请求参数**

- 字段 `student_id`，成员学号

- 一个 `familyMember` 结构体，<u>未修改字段需要传，会直接覆盖更新；`student_id` 不接受修改</u>

**响应参数**

- 成功更新的 `familyMember` 结构体，正常情况下应与请求一致

# Muster 名单

以下接口均需要额外参数 `token`

#### 获取所有列表 `GET /muster/all`

**请求参数**

空

**响应参数**

- 一个 `muster` 结构体数组

#### 增加一个名单 `POST /muster`

**请求参数**

- 字段 `title`，名单标题

**响应参数**

空

#### 删除一个名单 `DELETE /muster`

**请求参数**

- 字段 `title`，名单标题

**响应参数**

空

#### 往一个名单批量增加成员 `POST /muster/people`

**请求参数**

- 字段 `title`，名单标题

一个 string 数组，成员姓名

**响应参数**

- 一个 `muster` 结构体，表示更新后的名单

#### 从一个名单批量删除成员 `DELETE /muster/people`

**请求参数**

- 字段 `title`，名单标题

- 一个 string 数组，成员姓名

**响应参数**

- 一个 `muster` 结构体，表示更新后的名单

# Ballot 收集表

以下接口均需要额外参数 `token`

#### 获取所有收集表 `GET /ballot/all`

**请求参数**

空

**响应参数**

- 一个 `ballot` 结构体数组

#### 增加一个收集表 `POST /ballot`

**请求参数**

- 字段 `title`，收集表标题
- 字段 `muster`，名单标题
- 字段 `default_option`，默认选项，可留空，留空视为 "未填写"

**响应参数**

空

#### 删除一个列表 `DELETE /ballot`

**请求参数**

- 字段 `title`，收集表标题

**响应参数**

空

#### 往一个收集表增加一个选项 `POST /ballot/option`

**请求参数**

- 字段 `title`，收集表标题

- 字段 `option`，新增选项

**响应参数**

- 一个 `ballot` 结构体，表示更新后的收集表

#### 从一个收集表删除一个选项 `DELETE /ballot/option`

**请求参数**

- 字段 `title`，列表标题

- 字段 `option`，需要删除的选项

**响应参数**

- 一个 `ballot` 结构体，表示更新后的收集表

#### 批量修改一个收集表的若干成员选项 `PUT /ballot/member`

**请求参数**

- 字段 `title`，列表标题
- 字段 `option`，目标选项

一个 string 数组，目标成员姓名

**响应参数**

- 一个 `ballot` 结构体，表示更新后的收集表