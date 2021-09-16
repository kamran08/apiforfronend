'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LanguageLabelSchema extends Schema {
  up () {
    this.create('language_labels', (table) => {
      table.increments()
      table.string('lang_label')
      table.string('lang_english')
      table.string('lang_gujarati')
      table.timestamps()
    })
  }

  down () {
    this.drop('language_labels')
  }
}

module.exports = LanguageLabelSchema
