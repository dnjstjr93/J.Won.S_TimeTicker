const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    pluginOptions: {
        electronBuilder: {
            // List native deps here if they don't work
            externals: [''],
            // If you are using Yarn Workspaces, you may have multiple node_modules folders
            // List them all here so that VCP Electron Builder can find them
            nodeModulesPath: ['../../node_modules', './node_modules'],
            builderOptions: {
                // options placed here will be merged with default configuration and passed to electron-builder
                appId: 'kr.re.keti.app',
                productName: "time_ticker",
                win: {
                    icon: "./public/logo.png",
                    target: [
                        {
                            target: "nsis",
                            arch: ["x64", "ia32"]
                        }
                    ]
                },
                nsis: {
                    oneClick: false,
                    perMachine: true,
                    allowToChangeInstallationDirectory: true
                },
                publish: ["github"]
                // publish: [
                //     {
                //         provider: "github",
                //         owner: "dnjstjr93",
                //         releaseType: "release",
                //         channel: "latest",
                //         repo: "https://github.com/dnjstjr93/time_ticker.git",
                //         private: false,
                //         token: process.env.WS_TOKEN
                //     }
                // ]
            }
        }
    }
})
