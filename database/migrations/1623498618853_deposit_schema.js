'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DepositSchema extends Schema {
  up() {
    this.create('deposits', (table) => {
      table.increments()
      table.integer('user_id')
      table.string('deposit_amount')
      table.integer('gateway_id').comment('Payment Gateway')
      table.integer('transaction_id')
      table.string('transaction_response')
      table.integer('deposit_currency_id')
      table.string('deposit_bonus')
      table.integer('is_active')
      table.timestamps()
    })
  }

  down() {
    this.drop('deposits')
  }
}

module.exports = DepositSchema
