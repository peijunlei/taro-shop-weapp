import api from ".";
import { BaseConfigRopResponse } from "./type";





/**
 *
 * 查询基本设置
 *
 */
export async function findBaseConfig() {
  let result = await api.get<BaseConfigRopResponse>(
    '/system/baseConfig',
    {},
  );
  return result.context;
}