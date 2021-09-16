"use strict";

const moment = require("moment");
const Bonus = use("App/Models/Bonus");
const { validate } = use("Validator");

class BonusController {
  async create_new_bonus({ response, request }) {
    const rules = {
      bonus_name: "required|string",
      bonus_amount: "required|string",
      bonus_percentage: "required|string",
      bonus_currency_id: "required|number",
      bonus_first_transaction: "required|number",
    };
    const validation = await validate(request.body,  rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let ob = {
      bonus_name: request.body.bonus_name,
      bonus_amount: request.body.bonus_amount,
      bonus_percentage: request.body.bonus_percentage,
      bonus_currency_id: request.body.bonus_currency_id,
      bonus_first_transaction: request.body.bonus_first_transaction,
    };
    try {
      let d = await Bonus.create(ob);
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
  async update_bonus({ response, request }) {
    const rules = {
      id: "required|number",
      bonus_name: "required|string",
      bonus_amount: "required|string",
      bonus_percentage: "required|string",
      bonus_currency_id: "required|number",
      bonus_first_transaction: "required|number",
    };
    const validation = await validate(request.body,  rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let ob = {
      id: request.body.id,
      bonus_name: request.body.bonus_name,
      bonus_amount: request.body.bonus_amount,
      bonus_percentage: request.body.bonus_percentage,
      bonus_currency_id: request.body.bonus_currency_id,
      bonus_first_transaction: request.body.bonus_first_transaction,
    };
    let temp = await Bonus.query().where("id", ob.id).update(ob);
    if (temp) {
      let assedata = await Bonus.query().where("id", ob.id).first();
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
  async delete_bonus({ response, request }) {
    const rules = {
      id: "required|number",
    };
    const validation = await validate(request.body,  rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let temp = await Bonus.query().where("id", request.body.id).delete();
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

  async get_all_bonus({ request, response }) {
    let data = request.all();
    let page = data.page ? data.page : 1;

    let pageSize = data.pageSize ? data.pageSize : 20;
    return Bonus.query()
      .with("currency")
      .orderBy("id", "desc")
      .paginate(page, pageSize);
  }
  async get_all_bonus_single({ params, response }) {
    try {
      let data = await Bonus.query()
        .with("currency")
        .where("id", params.id)
        .first();
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

module.exports = BonusController;
