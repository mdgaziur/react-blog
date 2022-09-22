const express = require('express');
const Meta = require('html-metadata-parser');

const router = express.Router();

const FetchUrl = router.get('/', async (req, res) => {
    let link = req.query.url.toString() || 'https://example.com';
    Meta.parser(link, (error, metadata) => {
        if(error) {
            res.json({
                success: 0,
                error: error
            });
        } else {
            res.json({
                success: 1,
                meta: {
                    title: metadata.og.title || metadata.meta.title,
                    description: metadata.og.description || metadata.meta.title,
                    site_name: metadata.og.site_name || metadata.meta.site_name,
                    image: {
                        url: metadata.og.image
                    }
                }
            });
        }
        res.end();
    })
})

module.exports = FetchUrl;