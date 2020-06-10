const currentEnv = process.env.NODE_ENV;

if (currentEnv === 'development') {
    module.exports = require('./config/webpack.dev.js');
} else {
    module.exports = require('./config/webpack.prod.js');
}
