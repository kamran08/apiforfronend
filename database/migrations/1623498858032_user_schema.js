'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('user_first_name')
      table.string('user_last_name')
      table.string('user_email').unique()
      table.string('user_password')
      table.string('user_fcm_token')
      table.string('user_auth_token')
      table.string('user_profile_pic')
      table.string('user_mobile')
      table.string('user_gender')
      table.string('user_country')
      table.string('user_city')
      table.string('user_postal_code')
      table.string('user_address')
      table.string('user_dob')
      table.integer('is_active')
      table.integer('user_currency_id').comment('Default=USD')
      table.integer('user_bonus').comment('0=No, 1=Yes')
      table.integer('kyc_id')
      table.integer('sounds')
      table.integer('deal_result_dialog')
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
