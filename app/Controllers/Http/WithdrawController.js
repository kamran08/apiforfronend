"use strict";

const moment = require("moment");
const Withdraw = use("App/Models/Withdraw");
const Log = use("App/Models/Log");
const { validate } = use("Validator");

class WithdrawController {
  async create_new_widrow({ response, request, auth }) {
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
      account_holder_name: "required|string",
    };
    const validation = await validate(request.body, rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let user = await auth.getUser();

    let ob = {
      user_id: user.id,
      withdraw_amount: request.body.withdraw_amount,
      withdraw_status: request.body.withdraw_status,
      gateway_id: request.body.gateway_id,
      currency_id: request.body.currency_id,
      withdraw_email: request.body.withdraw_email,
      withdraw_account_id: request.body.withdraw_account_id,
      withdraw_mobile: request.body.withdraw_mobile,
      account_no: request.body.account_no,
      swift_code: request.body.swift_code,
      account_holder_name: request.body.account_holder_name,
    };
    try {
      let d = await Withdraw.create(ob);
      d = d.toJSON();
      await Log.create({
        method_name: "POST",
        request: "/app/create_new_widrow",
        response: JSON.stringify(d),
        user_id: await auth.getUser().id,
      });
      return response.status(200).json({
        data: d,
        status: "success",
      });
    } catch (error) {
      await Log.create({
        method_name: "POST",
        request: "/app/create_new_widrow",
        response: JSON.stringify({
          message: "Invalid request",
          status: "fail",
        }),
        user_id: await auth.getUser().id,
      });
      return response.status(401).json({
        message: "Invalid request",
        status: "fail",
      });
    }
  }

  async get_all_widrow({ request, response, auth }) {
    let data = request.all();
    let page = data.page ? data.page : 1;

    let pageSize = data.pageSize ? data.pageSize : 20;
    let user = await auth.getUser();

    return Withdraw.query()
      .where("user_id", user.id)
      .with("currency")
      .with("gateway")
      .with("user")
      .orderBy("id", "desc")
      .paginate(page, pageSize);
  }

  async get_all_widrow_single({ params, response, auth }) {
    try {
      let user = await auth.getUser();

      let data = await Withdraw.query()
        .where("user_id", user.id)
        .with("currency")
        .with("gateway")
        .with("user")
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

module.exports = WithdrawController;
