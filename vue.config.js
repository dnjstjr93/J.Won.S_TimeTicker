const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://news.google.com/topstories?hl=ko&gl=KR&ceid=KR:ko',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
        }
    },
    pluginOptions: {
        electronBuilder: {
            // List native deps here if they don't work
            externals: [''],
            // If you are using Yarn Workspaces, you may have multiple node_modules folders
            // List them all here so that VCP Electron Builder can find them
            nodeIntegration: true,
            nodeModulesPath: ['../../node_modules', './node_modules'],
            builderOptions: {
                // options placed here will be merged with default configuration and passed to electron-builder
                appId: 'kr.re.keti.app',
                productName: "J.Won.S_TimeTicker",
                win: {
                    icon: "./public/JWS_TimeTicker.png",
                    target: [
                        {
                            target: "nsis",
                            arch: ["x64", "ia32"]
                        }
                    ],
                    publish: ["github"]
                },
                linux: {
                    icon: "./public/JWS_TimeTicker_linux.png",
                    target: [
                        {
                            target: "appimage",
                            arch: ["armv7l"]
                        }
                    ],
                    publish: ["github"]
                },
                nsis: {
                    oneClick: false,
                    perMachine: true,
                    allowToChangeInstallationDirectory: true
                },
                publish: [
                    {
                        provider: "github",
                        owner: "dnjstjr93",
                        vPrefixedTagName: true,
                        host: 'github.com',
                        token: process.env.GH_TOKEN,
                        private: true,
                        channel: "Latest",
                        releaseType: 'release',
                    }
                ]
            }
        }
    }
})
