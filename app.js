const express = require('express')
const app = express()
const port = 3000
const router = require('./router')

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
})

app.disable('x-powered-by')
app.use('/', router)

app.use((err, req, res, next) => {
    console.error(err)
    res.json(err)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))