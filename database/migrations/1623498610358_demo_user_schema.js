'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DemoUserSchema extends Schema {
  up() {
    this.create('demo_users', (table) => {
      table.increments()
      table.string('user_name').defaultTo('Demo')
      table.integer('user_currency_id').comment('Default=USD')
      table.integer('sounds')
      table.integer('deal_result_dialog')
      table.timestamps()
    })
  }

  down() {
    this.drop('demo_users')
  }
}

module.exports = DemoUserSchema
