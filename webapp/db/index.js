'use strict'
const mongoose = require('mongoose')
// const Schema = mongoose.Schema
const debug = require('debug')('NC:mongoose')

debug('Setting up the mongoose mongodb connection.')
module.exports = (c) => {
  // const uri = `mongodb://${c.m.username}:${c.m.password}@${c.m.host}:${c.m.port}/${c.m.db}`
  const uri = `mongodb://${c.m.host}:${c.m.port}/${c.m.db}`
  const opts = {
    useMongoClient: 'true'
  }
  debug(`mongodb connection string: ${uri}`)
  debug(`mongodb connection options: ${opts}`)
  mongoose.connect(uri, opts)
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error: '))

  return mongoose
}
