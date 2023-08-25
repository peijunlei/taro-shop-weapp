
export const isFunction = (value: unknown): value is (...args: any) => any =>
  typeof value === 'function';

export function getRandomInt(min, max) {
  // 生成min到max之间的随机整数
  return Math.floor(Math.random() * (max - min + 1)) + min;
}