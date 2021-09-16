'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BonusSchema extends Schema {
  up() {
    this.create('bonuses', (table) => {
      table.increments()
      table.string('bonus_name')
      table.string('bonus_amount').comment('Amount for calculation')
      table.string('bonus_percentage').comment('(%)')
      table.integer('bonus_currency_id')
      table.integer('bonus_first_transaction').defaultTo(1).comment('0=No, 1=Yes')
      table.timestamps()
    })
  }

  down() {
    this.drop('bonuses')
  }
}

module.exports = BonusSchema
