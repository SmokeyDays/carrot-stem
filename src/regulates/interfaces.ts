export interface FamilyMember {
  student_id: string, //string,主键,不可为空
	name: string, //string,不可为空（视为主键，但没有验证）
	qq: number, //int64,不可为空（视为主键，但没有验证）
	phone: string, //string
	mail: string, //string
	address: string, //string
	birthday: string
}

export type FamilyMembers = Array<FamilyMember>;