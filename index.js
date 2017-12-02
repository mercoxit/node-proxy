const axios = require('axios')
const body = require('body-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const http = require('http')
const morgan = require('morgan')
const FormData = require('form-data')
const { API_HOST } = require('./config')

const app = new express()
const server = http.createServer(app)

app.use(body.json())
app.use(body.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use(cors({
    allowedHeaders: ['Authorization', 'Content-Type'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    origin: '*'
}))

app.use('/multipart', bodyParser.json(), function(req, res) {
    const data = Object.keys(req.body).reduce((result, prop) => {
        result.append(prop, req.body[prop])
        return result
    }, new FormData())

    axios.post(API_HOST + req.path, data, { headers: { ...data.getHeaders(), withCredentials: true } })
        .then(response => {
            const [token] = response.headers['set-cookie']

            return res.json({
                ...response.data,
                token
            })
        })
        .catch(error => {
            console.log(require('util').inspect(error.response.data, false, 5, true))
            res.statusMessage = error.message
            return res.status(error.response.status || 500).end()
        })
})

app.use('/', bodyParser.json(), function(req, res) {
    const token = req.headers['authorization']
    const options = {
        data: req.body,
        headers: {
            ...req.headers,
            Cookie: token
        },
        method: req.method,
        url: API_HOST + req.path,
        withCredentials: true
    }

    axios(options)
        .then(response => res.json(response.data))
        .catch(error => {
            console.log(require('util').inspect(error.response.data, false, 5, true))
            res.statusMessage = error.message
            return res.status(error.response.status || 500).end()
        })
})

app.disable('x-powered-by')
server.listen(process.env.PORT || 5000)
