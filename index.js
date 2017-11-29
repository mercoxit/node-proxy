const axios = require('axios')
const body = require('body-parser')
const cors = require('cors')
const express = require('express')
const http = require('http')
const morgan = require('morgan')
const { API_HOST } = require('./config')

const app = new express()
const server = http.createServer(app)

app.disable('x-powered-by')
app.use(cors({
    allowedHeaders: ['Authorization', 'Content-Type'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    origin: '*'
}))
app.use(morgan('dev'))
app.use(body.urlencoded({ extended: true }))
app.use(body.json())

app.use('/', function(req, res) {
    const options = {
        data: req.body,
        headers: req.headers,
        method: req.method,
        url: API_HOST + req.path,
    }

    axios(options)
        .then(response => res.json(response.data))
        .catch(error => {
            console.log(require('util').inspect(error.response.data, false, 5, true))

            res.statusMessage = error.message
            return res.status(error.response.status || 500).end()
        })
})

server.listen(process.env.PORT || 5000)
