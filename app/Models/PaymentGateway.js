"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class PaymentGateway extends Model {
  currency() {
    return this.belongsTo("App/Models/Currency");
  }
}

module.exports = PaymentGateway;
