结构体示例：



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

- 成功删除的 familyMember 结构体，正常情况下应与请求一致

#### 更新一个成员 `PUT /family`

**请求参数**

- 字段 `student_id`，成员学号

一个 `familyMember` 结构体，<u>未修改字段需要传，会直接覆盖更新；`student_id` 不接受修改</u>

**响应参数**

- 成功更新的 `familyMember` 结构体，正常情况下应与请求一致

# Muster 名单

以下接口均需要额外参数 `token`

#### 获取所有名单 `GET /muster/all`

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
- 一个 string 数组，成员姓名

```json
{
  "name": ["卡洛塔"]
}
```

**响应参数**

- 一个 `muster` 结构体，表示更新后的名单

#### 从一个名单批量删除成员 `DELETE /muster/people`

**请求参数**

- 字段 `title`，名单标题

- 一个 string 数组，成员姓名

```json
{
  "name": ["卡洛塔"]
}
```

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
- 字段 `remark`，备注，可留空

**响应参数**

空

#### 删除一个列表 `DELETE /ballot`

**请求参数**

- 字段 `title`，收集表标题

**响应参数**

空

#### 修改一个收集表的一个成员的回答 `PUT /ballot/member`

**请求参数**

- 字段 `title`，收集表标题
- 字段 `answer`，目标回答
- 字段 `name`，目标成员姓名

**响应参数**

- 一个 `BallotMember` 结构体，表示更新后的成员选择

#### 批量给未作答成员发送提醒 `POST /member/broadcast`

**请求参数**

- 字段 `title`，收集表标题
- 字段 `message`，需要发送的消息，可以置空

> 发送的消息主体为：
>
> "滋啦滋啦——卡洛收到了，希望你能填写【title】的祈愿！
> "message"
>
> 实际发送内容会加上一些奇怪的混淆（x

**响应参数**

- 一个 string 数组，发送**失败**的成员姓名