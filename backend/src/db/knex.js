import knexConfig from './knexfile.js'
import knex from 'knex'

const env = process.env.NODE_ENV || 'development'
const config = knexConfig[env] || knexConfig
const db = knex(config)

export default db
