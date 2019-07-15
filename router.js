const express = require('express')
const cors = require('./cors')
const router = express.Router()
const bodyParser = require('body-parser')
const https = require('https')
router.use(bodyParser.json())

router.route('/')
//get public feed images list
.get(async (req, res, next) => {
    https.get('https://api.flickr.com/services/feeds/photos_public.gne?format=json', result => {
        let resultString = ''

        result.on('data', (data) => {
            resultString += data
        })

        result.on('end', () => {
            //result is a string started with 'jsonFlickrFeed(', followed by a json, end with a ')'. remove start and end to get the json
            const resultJson = JSON.parse(resultString.slice(15,-1))
            res.json(resultJson)
        })
    })
})
//get public feed images by input tags
.post(async (req, res, next) => {
    console.log(req.body)
    //replace space with comma
    const tags = req.body.tags.replace(/\s/g, ',')
    https.get(`https://api.flickr.com/services/feeds/photos_public.gne?tags=${tags}&format=json`, result => {
        let resultString = ''

        result.on('data', (data) => {
            resultString += data
        })

        result.on('end', () => {
            const resultJson = JSON.parse(resultString.slice(15,-1))
            res.json(resultJson)
        })
    })
})


module.exports = router