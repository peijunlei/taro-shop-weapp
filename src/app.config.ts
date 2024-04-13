export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/goods/index',
    'pages/reward/index',
    'pages/shopcart/index',
    'pages/user/index',
  ],
  subpackages: [
    {
      root: 'pages/package-A',
      pages: [
        'about/index',
        'select-map/index',
        'select-weapp-map/index'
      ]
    },
    {
      root: 'pages/package-B',
      pages: [
        'goods-list/index',
        'goods-detail/index',
      ]
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    // custom: true,
    color: '#999999',
    selectedColor: '#FF6600',
    list: [
      {
        pagePath: 'pages/index/index',
        selectedIconPath: 'assets/tab/home-selected.png',
        iconPath: 'assets/tab/home.png',
        text: '首页'
      },
      {
        pagePath: 'pages/goods/index',
        selectedIconPath: 'assets/tab/goods-selected.png',
        iconPath: 'assets/tab/goods.png',
        text: '商品'
      },
      {
        pagePath: 'pages/reward/index',
        selectedIconPath: 'assets/tab/reward-selected.png',
        iconPath: 'assets/tab/reward.png',
        text: '奖励中心'
      },
      {
        pagePath: 'pages/shopcart/index',
        selectedIconPath: 'assets/tab/shopcart-selected.png',
        iconPath: 'assets/tab/shopcart.png',
        text: '购物车'
      },
      {
        pagePath: 'pages/user/index',
        selectedIconPath: 'assets/tab/user-selected.png',
        iconPath: 'assets/tab/user.png',
        text: '我的'
      }
    ]
  },
 
  requiredPrivateInfos:["getLocation"]
})
