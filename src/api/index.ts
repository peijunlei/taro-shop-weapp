import Const from "@/constant/Const";
import Cache from "@/constant/cache";
import Taro from "@tarojs/taro";

const host = process.env.TARO_APP_API;

export interface AsyncResult<T> {
  /**
   * 结果码
   */
  code: string;
  /**
   * 内容
   */
  context: T;
  /**
   * 消息内容
   */
  message: string;
}
interface IFetch {
  url: string;
  method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';
  data?: Object;
  contentType?: string;
}
async function Common<T = object>(params: IFetch): Promise<AsyncResult<T>> {
  let { url, data, method } = params;
  let methodUrl = host + url; // prefixHost(host, url);
  const token = Taro.getStorageSync(Cache.TOKEN);
  const distributeChannel = {
    channelType: 1,
    inviteeId: null,
  };
  const header = {
    'Content-Type': 'application/json; charset=utf-8',
    // 'Access-Control-Allow-Origin': '*',
    Authorization: 'Bearer ' + token || '',
    'distribute-channel': JSON.stringify(distributeChannel),
    terminal: 'H5',
  };
  return new Promise((resolve, reject) => {
    Taro.request({
      url: methodUrl,
      data,
      header,
      method,
      success: async (res) => {
        if ((res.statusCode >= 200 && res.statusCode < 300) || res.statusCode === 400) {
          const json = res.data as AsyncResult<T>;
          let { message, code } = json;
          if (code !== Const.SUCCESS_CODE) {
            Taro.showToast({
              title: message,
              icon: 'none',
            });
            reject(json); //抛出错误信息
          }
          resolve(json);
        } else {
          throw new Error('发生未知异常错误!!');
        }
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}
export function get<T = any>(url, data) {
  return Common<T>({
    url,
    data,
    method: 'GET',
  });
}
export function post<T = any>(url, data) {
  return Common<T>({
    url,
    method: 'POST',
    data,
  });
}
export function del<T = any>(url, data) {
  return Common<T>({
    url,
    method: 'DELETE',
    data,
  });
}
export function put<T = any>(url, data) {
  return Common<T>({
    url,
    method: 'PUT',
    data,
  });
}
export default {
  get,
  post,
  del,
  put
}