const express = require('express')
const cors = require('./cors')
const router = express.Router()
const bodyParser = require('body-parser')
const https = require('https')
const parseString = require('xml2js').parseString
router.use(bodyParser.json())

router.route('/')
.get(cors.cors, async (req, res, next) => {

    https.get('https://api.flickr.com/services/feeds/photos_public.gne', (result) => {
        let xml = ''
    
        result.on('data', (chunk) => {
            xml += chunk
        })
    
        result.on('end', () => {
            parseString(xml, (err, result) => {
                console.dir(result)
                const resp = result.feed.entry.map(e => {
                    return {
                        title: e.title[0],
                        link: e.link.find(el => el.$.type.includes('image')).$.href,
                        published: e.published[0],
                        updated: e.updated[0],
                        author: e.author[0].name[0]
                    }
                })
                res.json(resp)
            })
        })
    })
})
.post(cors.cors, async (req, res, next) => {
    console.log(req.body)
    res.json({status:'success'})
})


module.exports = router