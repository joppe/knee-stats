// vue.config.js
module.exports = {
    css: {
        loaderOptions: {
            // pass options to sass-loader
            scss: {
                // @/ is an alias to src/
                prependData: `@import "@/style/main.scss";`,
            },
        },
    },
};
