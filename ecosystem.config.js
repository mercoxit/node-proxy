module.exports = {
    apps: [
        {
            name: 'node-proxy',
            script: './index.js',
            env: {
                API_HOST: 'http://192.168.0.179:8080',
                NODE_ENV: 'production',
                PORT: 5000
            }
        }
    ]
}
