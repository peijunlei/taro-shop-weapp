

/**
 * 登录页面
 * @param from 来源
 * @returns 登录页面路径
 */
export function LoginPage({ from } = { from: '' }) {
  return `/pages/package-A/login/index?from=${from}`
}

export function GoodsDetailPage(params: { skuId: string }) {
  const { skuId } = params
  return `/pages/package-B/goods-detail/index?skuId=${skuId}`
}