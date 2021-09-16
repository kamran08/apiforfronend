"use strict";

const moment = require("moment");
const Withdraw = use("App/Models/Withdraw");
const { validate } = use("Validator");

class WithdrawController {
  async create_new_widrow({ response, request }) {
    const rules = {
      user_id: "required|number",
      withdraw_amount: "required|string",
      withdraw_status: "required|number",
      gateway_id: "required|number",
      currency_id: "required|number",
      withdraw_email: "required|string",
      withdraw_account_id: "required|string",
      withdraw_mobile: "required|string",
      account_no: "required|string",
      swift_code: "required|string",
      account_holder_name: "required|string"
    };
    const validation = await validate(request.body,  rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let ob = {
      user_id: request.body.user_id,
      withdraw_amount: request.body.withdraw_amount,
      withdraw_status: request.body.withdraw_status,
      gateway_id: request.body.gateway_id,
      currency_id: request.body.currency_id,
      withdraw_email: request.body.withdraw_email,
      withdraw_account_id: request.body.withdraw_account_id,
      withdraw_mobile: request.body.withdraw_mobile,
      account_no: request.body.account_no,
      swift_code: request.body.swift_code,
      account_holder_name: request.body.account_holder_name
    };
    try {
      let d = await Withdraw.create(ob);
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
  async update_widrow({ response, request }) {
    const rules = {
       id: "required|number",
      user_id: "required|number",
      withdraw_amount: "required|string",
      withdraw_status: "required|number",
      gateway_id: "required|number",
      currency_id: "required|number",
      withdraw_email: "required|string",
      withdraw_account_id: "required|string",
      withdraw_mobile: "required|string",
      account_no: "required|string",
      swift_code: "required|string",
      account_holder_name: "required|string"
    };
    const validation = await validate(request.body,  rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let ob = {
      id: request.body.id,
      user_id: request.body.user_id,
      withdraw_amount: request.body.withdraw_amount,
      withdraw_status: request.body.withdraw_status,
      gateway_id: request.body.gateway_id,
      currency_id: request.body.currency_id,
      withdraw_email: request.body.withdraw_email,
      withdraw_account_id: request.body.withdraw_account_id,
      withdraw_mobile: request.body.withdraw_mobile,
      account_no: request.body.account_no,
      swift_code: request.body.swift_code,
      account_holder_name: request.body.account_holder_name
    };
    let temp = await Withdraw.query().where("id", ob.id).update(ob);
    if (temp) {
      let assedata = await Withdraw.query().where("id", ob.id).first();
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
  async delete_widrow(response, request) {
    const rules = {
      id: "required|number",
    };
    const validation = await validate(request.body,  rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let temp = await Withdraw.query().where("id", request.body.id).delete();
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

  async get_all_widrow({ request, response }) {
    let data = request.all();
    let page = data.page ? data.page : 1;

    let pageSize = data.pageSize ? data.pageSize : 20;
    return Withdraw.query().with('currency').with('gateway').with('user').orderBy("id", "desc").paginate(page, pageSize);
  }
  async get_all_widrow_single({ params, response }) {
    try {
      let data = await Withdraw.query().with('currency').with('gateway').with('user').where("id", params.id).first();
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

module.exports = WithdrawController;
