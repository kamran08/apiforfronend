'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TradeHistorySchema extends Schema {
  up() {
    this.create('trade_histories', (table) => {
      table.increments()
      table.integer('asset_id')
      table.string('trading_amount').comment('Amount Invested')
      table.dateTime('bid_time')
      table.text('bid_price')
      table.dateTime('expiry_time')
      table.text('expiry_price')
      table.integer('trade_type').comment('1= Up, 2= Down')
      table.integer('user_id')
      table.integer('user_type').comment('1=Demo, 2=Real')
      table.string('total_earning')
      table.integer('trade_status').comment('0= Pending, 1= Confirmed, 2= Cancelled')
      table.timestamps()
    })
  }

  down() {
    this.drop('trade_histories')
  }
}

module.exports = TradeHistorySchema
