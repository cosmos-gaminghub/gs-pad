const path = require("path");
const vueSrc = "./src";
const frontendSrc = "./admin/assets";
module.exports = {
    pages: {
        index: {
            // entry for the page
            entry: 'src/main.js',
            // the source template
            template: 'public/index.html',
            // output as dist/index.html
            filename: 'index.html',
            // when using title option,
            // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'GAME GS Pad',
            // chunks to include on this page, by default includes
            // extracted common chunks and vendor chunks.
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
    },
    configureWebpack: {
        resolve: {
            alias: {
                "@": path.resolve(__dirname, vueSrc),
                "@frontend": path.resolve(__dirname, frontendSrc)
            },
            extensions: ['.js', '.vue', '.json']
        }
    }
}
