import { isLogin } from "@/utils";
import api from "../api";


/**
 *
 * 查询商品分页
 *
 */
export async function goodsSkulist(request: any) {
  const url = isLogin() ? '/goods/skus' : '/goods/unLogin/skus';
  let result = await api.post<unknown>(url, request);
  return result.context;
}