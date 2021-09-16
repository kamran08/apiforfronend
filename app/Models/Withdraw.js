'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Withdraw extends Model {
     currency() {
        return this.belongsTo('App/Models/Currency','currency_id','id')
     }
     gateway() {
        return this.belongsTo('App/Models/PaymentGateway','gateway_id','id')
     }
     user() {
        return this.belongsTo('App/Models/User','user_id','id')
     }
}

module.exports = Withdraw
