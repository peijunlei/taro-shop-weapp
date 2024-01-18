export interface BaseConfigRopResponse {
  /**
   * 主键ID
   */
  baseConfigId?: number;
  /**
   * 大屏端商城网址
   */
  largeScreenWebsite?: string;
  /**
   * 移动商城banner,最多可添加5个,多个图片间以"|"隔开
   */
  mobileBanner?: string;
  /**
   * 移动端商城网址
   */
  mobileWebsite?: string;
  /**
   * PC商城登录页banner,最多可添加5个,多个图片间以"|"隔开
   */
  pcBanner?: string;
  /**
   * 商城图标，最多添加一个
   */
  pcIco?: string;
  /**
   * PC商城logo
   */
  pcLogo?: string;
  /**
   * PC商城首页banner,最多可添加5个,多个图片间以"|"隔开
   */
  pcMainBanner?: string;
  /**
   * 商城首页标题
   */
  pcTitle?: string;
  /**
   * PC端商城网址
   */
  pcWebsite?: string;
  /**
   * 会员注册协议
   */
  registerContent?: string;
  /**
   * 商家网址
   */
  supplierWebsite?: string;
  [k: string]: any;
}
