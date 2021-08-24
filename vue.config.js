module.exports = {
    filenameHashing: false,
    css: {
        loaderOptions: {
            sass: {
                prependData: ` @import "./src/assets/scss/main.scss";`,
            }
        }
    },
    devServer: {
        proxy: 'http://localhost:8080/'
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? './'
        : '/',
};