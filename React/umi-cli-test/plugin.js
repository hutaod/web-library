module.exports = (api, options = {}) => {
  api.registerPlugin({
    id: 'demacia:antd',
    apply: require('umi-plugin-react/lib/plugins/antd').default,
    opts: options.antd
  })

  api.registerPlugin({
    id: 'demacia:dva',
    apply: require('umi-plugin-react/lib/plugins/dva').default,
    opts: options.dva
  })

  api.onBuildSuccessAsync(async () => {
    console.log('[demacia]: success')
  })
}
