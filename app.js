const express = require('express')
const app = express()
const path = require('path')
const port = 3000
const router = require('./router')
const bodyParser = require('body-parser')

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Content-Type")
    next();
})

//follow security advice by expressjs
app.disable('x-powered-by')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'dist')))

app.use('/api', router)

app.get('*', (req, res) => { 
    res.sendFile(path.join(__dirname, 'dist/index.html'))
})

app.use((err, req, res, next) => {
    console.error(err)
    res.json(err)
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
