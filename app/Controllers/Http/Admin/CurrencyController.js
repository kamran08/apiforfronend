"use strict";
const moment = require("moment");
const Currency = use("App/Models/Currency");
const { validate } = use("Validator");
class AuthController {
  async create_new_currency({ response, request }) {
    const rules = {
      currency: "required|string",
      currency_symbol: "required|string",
    };
    const validation = await validate(request.body,  rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let ob = {
      currency: request.body.currency,
      currency_symbol: request.body.currency_symbol,
    };
    try {
      let d = await Currency.create(ob);
      return response.status(200).json({
        data: d,
        status: "success",
      });
    } catch (error) {
      return response.status(401).json({
        message: "Invalid request",
        status: "fail",
      });
    }
  }

  async update_currency({ response, request }) {
    const rules = {
      currency: "required|string",
      currency_symbol: "required|string",
    };
    const validation = await validate(request.body,  rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let ob = {
      currency: request.body.currency,
      currency_symbol: request.body.currency_symbol,
    };
    let temp = await Currency.query().where("id", ob.id).update(ob);
    if (temp) {
      let assedata = await Currency.query().where("id", ob.id).first();
      return response.status(200).json({
        data: assedata,
        status: "success",
      });
    }

    return response.status(401).json({
      message: "Invalid request",
      status: "fail",
    });
  }

  async delete_currency({ response, request }) {
    const rules = {
      id: "required|number",
    };
    const validation = await validate(request.body,  rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let temp = await Currency.query().where("id", request.body.id).delete();
    if (temp) {
      return response.status(200).json({
        message: "Item deleted successfully",
        status: "success",
      });
    }
    return response.status(401).json({
      message: "Invalid request",
      status: "fail",
    });
  }

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
