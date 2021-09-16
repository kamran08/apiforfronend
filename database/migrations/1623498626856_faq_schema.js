'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FaqSchema extends Schema {
  up() {
    this.create('faqs', (table) => {
      table.increments()
      table.string('faq_question')
      table.string('faq_answer')
      table.integer('is_active').defaultTo(1)
      table.timestamps()
    })
  }

  down() {
    this.drop('faqs')
  }
}

module.exports = FaqSchema
