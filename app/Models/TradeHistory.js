"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class TradeHistory extends Model {
  asset() {
    return this.belongsTo("App/Models/Asset");
  }

  demoUser() {
    return this.belongsTo("App/Models/DemoUser", "user_id");
  }

  user() {
    return this.belongsTo("App/Models/User");
  }
}

module.exports = TradeHistory;
