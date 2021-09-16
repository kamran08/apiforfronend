'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Bonus extends Model {

     currency() {
        return this.belongsTo('App/Models/Currency','bonus_currency_id','id')
     }
}

module.exports = Bonus
