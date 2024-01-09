const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        firebase: './src/firebase.js',
        main: './src/main.js',
        app: './src/app.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    watch: true,
};
