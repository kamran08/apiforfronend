'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WithdrawSchema extends Schema {
  up() {
    this.create('withdraws', (table) => {
      table.increments()
      table.integer('user_id')
      table.string('withdraw_amount')
      table.integer('withdraw_status').comment('0=Pending,1=Approved,2=Rejected')
      table.integer('gateway_id')
      table.integer('currency_id')
      table.string('withdraw_email').comment('For PayPal, Stripe')
      table.string('withdraw_account_id').comment('For Bitcoin')
      table.string('withdraw_mobile').comment('For Paytm')
      table.string('account_no').comment('For Bank Transfer')
      table.string('swift_code')
      table.string('account_holder_name')
      table.timestamps()
    })
  }

  down() {
    this.drop('withdraws')
  }
}

module.exports = WithdrawSchema
