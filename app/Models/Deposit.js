'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Deposit extends Model {
    user() {
        return this.belongsTo('App/Models/User','user_id','id')
     }
    getway() {
        return this.belongsTo('App/Models/PaymentGateway','gateway_id','id')
     }
    transection() {
        return this.belongsTo('App/Models/TradeHistory','transaction_id','id')
     }
     currency() {
        return this.belongsTo('App/Models/Currency','deposit_currency_id','id')
     }
}

module.exports = Deposit
