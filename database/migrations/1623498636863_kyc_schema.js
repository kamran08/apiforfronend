'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class KycSchema extends Schema {
  up() {
    this.create('kycs', (table) => {
      table.increments()
      table.string('kyc_doc')
      table.integer('kyc_status').comment('0=Pending, 1=Approved, 2=Rejected')
      table.timestamps()
    })
  }

  down() {
    this.drop('kycs')
  }
}

module.exports = KycSchema
