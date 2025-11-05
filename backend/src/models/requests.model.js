import db from '../db/knex.js'

export default class VacationRequest {
  constructor(data) {
    Object.assign(this, data)
  }

  static async create(payload) {
    const insert = {
      user_id: payload.user_id,
      start_date: payload.start_date,
      end_date: payload.end_date,
      reason: payload.reason || '',
      status: payload.status || 'pending',
      comments: payload.comments || '',
    }
    const [row] = await db('vacation_requests').insert(insert).returning('*')
    return new VacationRequest(row)
  }

  static async findAll(opts = {}) {
    let q = db('vacation_requests')
    if (opts.where) q = q.where(opts.where)
    if (opts.orderBy) q = q.orderBy(...opts.orderBy)
    const rows = await q.select('*')
    return rows.map(r => new VacationRequest(r))
  }

  static async findByPk(id) {
    const row = await db('vacation_requests').where({ id }).first()
    return row ? new VacationRequest(row) : null
  }

  static async findAllWithUserNames(opts = {}) {
    let q = db('vacation_requests')
      .select('vacation_requests.*', 'users.name as user_name')
      .join('users', 'vacation_requests.user_id', 'users.id');

    if (opts.where) q = q.where(opts.where);
    
    if (opts.orderBy) q = q.orderBy(...opts.orderBy);

    const rows = await q;
    
    return rows.map(r => new VacationRequest(r))
  }

  async save() {
    const update = {
      user_id: this.user_id,
      start_date: this.start_date,
      end_date: this.end_date,
      reason: this.reason,
      status: this.status,
      comments: this.comments,
    }
    const [row] = await db('vacation_requests').where({ id: this.id }).update(update).returning('*')
    if (row) Object.assign(this, row)
    return this
  }
}

export class User {
  constructor(data) {
    Object.assign(this, data)
  }

  static async create(payload) {
    const insert = {
      name: payload.name,
      password: payload.password,
      role: payload.role || 'requester',
    }
    const [row] = await db('users').insert(insert).returning('*')
    return new User(row)
  }
}