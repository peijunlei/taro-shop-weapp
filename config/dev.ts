import type { UserConfigExport } from "@tarojs/cli";

export default {
  logger: {
    quiet: false,
    stats: true
  },
  
  mini: {},
  h5: {
    router:{
      mode: 'browser'
    },
    devServer: {
      port: 3000,
      proxy:{
        '/mbff': {
          target: 'https://wm-test.800890.com/mbff',
          changeOrigin: true,
          pathRewrite: { "^/mbff": '/' }
        }
      }
     
    }
  }
} as UserConfigExport;
