const PROXY_SETTING = {
  '/api/': {
    target: 'http://198.168.111.111:3001',
    changeOrigin: true,
  },
  'api-2': {
    target: 'http://198.168.111.111:3002',
    changeOrigin: true,
    pathRewrite: {
      '^/api-2': '',
    },
  },
}
module.exports = PROXY_SETTING
