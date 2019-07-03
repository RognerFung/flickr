const cors = require('cors')
const whitelist = ["http://127.0.0.1:3000", "http://127.0.0.1:4200"]
const corsOptionsDelegate = (req, next) => {
    let corsOptions
    if (whitelist.includes(req.header('Origin'))) corsOptions = {origin: true}
    else corsOptions = {origin: false}
    next(null, corsOptions)
}
exports.cors = cors()
exports.corsWithOptions = cors(corsOptionsDelegate)