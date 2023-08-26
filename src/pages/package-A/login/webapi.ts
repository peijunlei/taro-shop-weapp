import api from "@/pages/api";


export async function LoginWithAccount(request: ILoginLoginRequestReq) {
  let result = await api.post<ILoginLoginRequestRes>('/login', request);
  return result.context;
}

export interface ILoginLoginRequestReq {
  /**
   * 账号
   */
  customerAccount?: string;
  /**
   * 密码
   */
  customerPassword?: string;
  [k: string]: any;
}

export interface ILoginLoginRequestRes {
  [k: string]: any;
}