module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://127.0.0.1:8080', // 域名 这会告诉开发服务器将任何未知请求 (没有匹配到静态文件的请求) 代理到http://localhost:8080/**/
        target: 'https://everywhere.hhao.wang',
        changOrigin: true, // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        secure: false,
        pathRewrite: {
          '^/api': '/api' // // 替换target中的请求地址，也就是说，在请求的时候，url用'/proxy'代替'http://ip.taobao.com'
        },
        logLevel: 'debug'
      }
    }
  },
  chainWebpack: config => {
    config.plugin('html')
        .tap(args => {
          args[0].title = "EveryWhere云打印平台";
          return args;
        })
  },
}
