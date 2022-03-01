//! webpack自定义配置文件
const CracoLessPlugin = require('craco-less');
module.exports = {
    plugins: [
        {
          plugin: CracoLessPlugin,
          options: {
            lessLoaderOptions: {
              lessOptions: {
                modifyVars: { '@primary-color': '#FF6347' },
                javascriptEnabled: true,
              },
            },
            cssLoaderOptions: {
              modules: { localIdentName: "[local]_[hash:base64:5]" }
            }
          },
        },
      ],
}