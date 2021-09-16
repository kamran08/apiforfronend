'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TrainingSchema extends Schema {
  up () {
    this.create('trainings', (table) => {
      table.increments()
      table.string('training_title')
      table.string('training_desc')
      table.string('training_url')
      table.integer('is_active').defaultTo(1)
      table.timestamps()
    })
  }

  down () {
    this.drop('trainings')
  }
}

module.exports = TrainingSchema
