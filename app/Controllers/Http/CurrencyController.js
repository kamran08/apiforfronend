"use strict";
const moment = require("moment");
const Currency = use("App/Models/Currency");
const { validate } = use("Validator");
class AuthController {

  async get_all_currency({ request, response }) {
    let data = request.all();
    let lastId = data.lastId ? data.lastId : "";

    let limt = data.limt ? data.limt : 20;
    if (lastId) {
      return Currency.query()
        .where("id", "<", lastId)
        .orderBy("id", "desc")
        .limit(limt)
        .fetch();
    }

    return Currency.query().orderBy("id", "desc").limit(limt).fetch();
  }

  async get_all_currency_single({ params, response }) {
    try {
      let data = await Currency.query().where("id", params.id).first();
      return response.status(200).json({
        data: data,
        status: data ? "success" : "fail",
      });
    } catch (error) {
      return response.status(401).json({
        message: "Invalid request",
        status: "fail",
      });
    }
  }
}

module.exports = AuthController;
