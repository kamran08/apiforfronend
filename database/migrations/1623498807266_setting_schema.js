'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SettingSchema extends Schema {
  up () {
    this.create('settings', (table) => {
      table.increments()
      table.string('terms_conditions')
      table.string('refund_policy')
      table.string('payment_info_policy')
      table.string('bonus_terms_conditions')
      table.timestamps()
    })
  }

  down () {
    this.drop('settings')
  }
}

module.exports = SettingSchema
