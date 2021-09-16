'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PaymentGatewaySchema extends Schema {
  up () {
    this.create('payment_gateways', (table) => {
      table.increments()
      table.string('gateway_name')
      table.integer('currency_id')
      table.string('gateway_img')
      table.integer('is_active').defaultTo(1).comment('0=inactive,1=active')
      table.timestamps()
    })
  }

  down () {
    this.drop('payment_gateways')
  }
}

module.exports = PaymentGatewaySchema
