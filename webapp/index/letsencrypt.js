'use strict'
const router = require('express').Router()
const debug = require('debug')('NC:letsencrypt-router')

debug('Loading the letsencrypt acme-challenge router.')
module.exports = (args) => {
  // const config = args.config
  // const db = args.db
  router.get('/acme-challenge/:authorizer', (req, res) => {
    res.set('Content-Type', 'text/plain')
      .send('Hello Cerbot.  I have been expecting you...') /* default test acme-challenge response */
      // .send('') /* node-core-app.com */
      // .send('') /* api.node-core-app.com */
      // .send('') /* www.node-core-app.com */
      // .send('') /* seismod.com */
      // .send('') /* www.seismod.com */
      // .send('') /* api.seismod.com */
      // .send('') /* applicationminder.com */
      // .send('') /* www.applicationminder.com */
      // .send('') /* duffys-irishwake.com */
      // .send('') /* www.duffys-irishwake.com */
      // .send('') /* coffeetweets.com */
      // .send('') /* www.coffeetweets.com */
      .end()
  })

  return router
}
