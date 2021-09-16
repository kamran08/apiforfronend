'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AssetSchema extends Schema {
  up () {
    this.create('assets', (table) => {
      table.increments()
      table.integer('asset_category');
      table.string('asset_name');
      table.string('asset_from').comment('fsym');
      table.string('asset_to').comment('tsyms');
      table.string('profit_percentage').comment('Return %');
      table.string('asset_img');
      table.integer('is_active').defaultTo(1);
      table.timestamps()
    })
  }

  down () {
    this.drop('assets')
  }
}

module.exports = AssetSchema
