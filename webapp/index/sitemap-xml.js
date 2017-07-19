'use strict'
const router = require('express').Router()
const debug = require('debug')('NC:sitemap.xml-router')
const moment = require('moment')

debug('Loading the sitemap.xml router.')
module.exports = (app, config) => {
  router.get('/', (req, res) => {
    res.set('Content-Type', 'text/xml')
      .send(sitemapXml(req, router))
      .end()
  })

  const sitemapXml = (req, router) => {
    /*
    * Eventually, this function will generate the sitemap.xml file
    * from the passed express router object.  But for now, just
    * send a simple empty version.
    */
    let protocol = req.protocol
    let siteName = req.hostname
    let lastUpdated = moment().format()
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${protocol}://${siteName}</loc>
    <lastmod>${lastUpdated}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${protocol}://${siteName}/about</loc>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>${protocol}://${siteName}/accounts</loc>
  </url>
  <url>
    <loc>${protocol}://${siteName}/signup</loc>
  </url>
  <url>
    <loc>${protocol}://${siteName}/login</loc>
  </url>
</urlset>
`
  }

  return router
}
