

export interface IManager {
  id: number;
  account: string;
}

export interface IUser {
  _id: { $oid: string };
  lastLoginTime: number;
  createTime: number;
  spreaderID: string;
  permission: number;
  gold: number;
  nickname: string;
  uid: string;
  manager: IManager;
}


export interface ICredentials {
  username: string;
  password: string
}

export interface ICreateUser {
  account: string;
  nickName: string;
  password: string;
  confirmPass: string;
}


export interface IResetUser {
  userId: string;
  account: string;
  password: string;
  confirmPass: string;
}

export interface IRedeemUser {
  userId: string;
  amount:string;
  note:string;
}

export interface IRechargeUser {
  userId: string;
  amount:string;
  note:string;
}


export type FieldData = {
  name: string[];
  value?: string;
};

export interface IAdminData {
  id: number;
  account: string;
  balance: number;
  role_id: number;
  status: number;
  attempts: number;
}
export interface ITranSactionDetail{
  admin:IAdminData
  admin_id: number;
  after: string;
  balance: string;
  before: string;
  created_at: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  guidUserLog:any;
  id:number;
  ip:string;
  memo:string;
  type:number
  updated_at:string
}