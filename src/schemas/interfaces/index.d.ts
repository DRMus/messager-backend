export interface IUserModel {
  _id: string;
  email: string;
  fullname: string;
  password: string;
  confirmed: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
