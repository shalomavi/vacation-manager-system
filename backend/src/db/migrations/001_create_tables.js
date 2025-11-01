export async function up (knex) {
  await knex.schema.createTable('users', (t) => {
    t.increments('id').primary()
    t.string('name').notNullable()
    t.string('role').notNullable().defaultTo('requester') // consider enum later
    t.string('password').notNullable() // store hashed passwords in production
  })

  await knex.schema.createTable('vacation_requests', (t) => {
    t.increments('id').primary()
    t.integer('user_id').unsigned().notNullable().index()
    t.date('start_date').notNullable()
    t.date('end_date').notNullable()
    t.text('reason')
    t.enu('status', ['pending', 'approved', 'rejected']).defaultTo('pending')
    t.text('comments')
    t.timestamp('created_at').defaultTo(knex.fn.now())
    t.foreign('user_id').references('users.id').onDelete('CASCADE')
  })

  // Add a DB-level check that end_date is not before start_date (Postgres)
  // For databases that don't support raw check easily, you can skip this.
  await knex.raw(`
    ALTER TABLE vacation_requests
    ADD CONSTRAINT chk_dates CHECK (end_date >= start_date)
  `)
}

export async function down (knex) {
  await knex.schema.dropTableIfExists('vacation_requests')
  await knex.schema.dropTableIfExists('users')
}