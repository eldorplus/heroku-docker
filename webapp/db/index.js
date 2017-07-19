'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const debug = require('debug')('NC:mongoose')

module.export = (c) => {
  const uri = `mongodb://${c.m.username}:${c.m.password}@${c.m.host}:${c.m.port}/${c.m.db}`
  const options = {
    foo: 'bar'
  }
  debug(`mongodb connection string: ${uri}`)
  mongoose.connect(uri, options)
}
