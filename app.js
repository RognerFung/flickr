const express = require('express')
const app = express()
const port = 3000
const router = require('./router')

app.use('/', router)

app.use(function (err, req, res, next) {
    console.error(err)
    res.json(err)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))