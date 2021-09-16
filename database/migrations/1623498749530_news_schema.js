'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NewsSchema extends Schema {
  up() {
    this.create('news', (table) => {
      table.increments()
      table.string('news_title')
      table.string('news_desc')
      table.string('video_url')
      table.integer('is_active').defaultTo(1).comment('0=inactive,1=active')
      table.timestamps()
    })
  }

  down() {
    this.drop('news')
  }
}

module.exports = NewsSchema
