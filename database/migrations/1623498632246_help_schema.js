'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HelpSchema extends Schema {
  up() {
    this.create('helps', (table) => {
      table.increments()
      table.string('help_language')
      table.string('help_country_flag')
      table.string('help_description')
      table.string('help_phone')
      table.string('help_email')
      table.integer('is_active').defaultTo(1)
      table.timestamps()
    })
  }

  down() {
    this.drop('helps')
  }
}

module.exports = HelpSchema
