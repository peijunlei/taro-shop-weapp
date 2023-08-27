import api from "../api";


/**
 *
 * 查询会员中心主页面数据
 *
 */
export async function findCustomerCenterInfo() {
  let result = await api.get<unknown>(
    '/customer/customerCenter',
    {},
  );
  return result.context;
}