'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LanguageSchema extends Schema {
  up() {
    this.create('languages', (table) => {
      table.increments()
      table.string('lang_name')
      table.integer('is_active').defaultTo(1)
      table.timestamps()
    })
  }

  down() {
    this.drop('languages')
  }
}

module.exports = LanguageSchema
