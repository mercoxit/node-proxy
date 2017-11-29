# node-proxy

### Requirements
* Node.js 8.9.1
* NPM 5.5.1
* [PM2](http://pm2.keymetrics.io/docs/usage/quick-start)


### Configuration
Setup API_HOST and PORT in ecosystem configuration
```javascript
{
    API_HOST: 'http://192.168.0.179:8080',
    PORT: 5000
}
```

### Installation
```sh
npm install pm2@latest -g
npm install
pm2 startup
```

### Running
```sh
pm2 start ./ecosystem.config.js
pm2 save
```
