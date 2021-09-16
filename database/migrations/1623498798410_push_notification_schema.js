'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PushNotificationSchema extends Schema {
  up () {
    this.create('push_notifications', (table) => {
      table.increments()
      table.string('title')
      table.string('sub_title')
      table.string('message')
      table.integer('is_active').defaultTo(1).comment('0=inactive,1=active')
      table.timestamps()
    })
  }

  down () {
    this.drop('push_notifications')
  }
}

module.exports = PushNotificationSchema
