module.exports = {
    config: {
        tailwindjs: './tailwind.config.js',
        port: 3000,
    },
    paths: {
        src: {
            base: './src',
            css: './src/css',
            js: './src/js',
            img: './src/img',
            font: './src/font',
            favicon: './src/favicon',
        },
        app: {
            base: './app',
            css: './app/dist/css',
            js: './app/dist/js',
            img: './app/dist/img',
            font: './app/dist/font',
            favicon: './app/dist/favicon',
        },
        build: {
            base: './build',
            css: './build/dist/css',
            js: './build/dist/js',
            img: './build/dist/img',
            font: './build/dist/font',
            favicon: './build/dist/favicon',
        },
    },
};
