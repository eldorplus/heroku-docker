'use strict'

const router = require('express').Router()
const debug = require('debug')('NC:accounts-router')

debug('loading the node-core account router.')
module.exports = (config) => {
  return router
}
