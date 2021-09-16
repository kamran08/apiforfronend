"use strict";

const moment = require("moment");
const Deposit = use("App/Models/Deposit");
const Log = use("App/Models/Log");
const { validate } = use("Validator");
class DepositController {
  async create_new_deposite({ response, request }) {
    const rules = {
      user_id: "required|number",
      deposit_amount: "required|string",
      gateway_id: "required|number",
      transaction_id: "required|number",
      transaction_response: "required|string",
      deposit_currency_id: "required|number",
      deposit_bonus: "required|string",
      is_active: "required|number",
    };
    const validation = await validate(request.body, rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let ob = {
      user_id: request.body.user_id,
      deposit_amount: request.body.deposit_amount,
      gateway_id: request.body.gateway_id,
      transaction_id: request.body.transaction_id,
      transaction_response: request.body.transaction_response,
      deposit_currency_id: request.body.deposit_currency_id,
      deposit_bonus: request.body.deposit_bonus,
      is_active: request.body.is_active,
    };
    try {
      let d = await Deposit.create(ob);
      d = d.toJSON()

      await Log.create({
        method_name: "POST",
        request: "/app/create_new_deposite",
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
          request: "/app/create_new_deposite",
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

  async update_deposite({ response, request, auth }) {
    let user = await auth.getUser();
    const rules = {
      id: "required|number",
      deposit_amount: "required|string",
      gateway_id: "required|number",
      transaction_id: "required|number",
      transaction_response: "required|string",
      deposit_currency_id: "required|number",
      deposit_bonus: "required|string",
      is_active: "required|number",
    };
    const validation = await validate(request.body, rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let ob = {
      id: request.body.id,
      deposit_amount: request.body.deposit_amount,
      gateway_id: request.body.gateway_id,
      transaction_id: request.body.transaction_id,
      transaction_response: request.body.transaction_response,
      deposit_currency_id: request.body.deposit_currency_id,
      deposit_bonus: request.body.deposit_bonus,
      is_active: request.body.is_active,
    };
    let temp = await Deposit.query()
      .where("id", ob.id)
      .where("user_id", user.id)
      .update(ob);
    if (temp) {
      let assedata = await Deposit.query().where("id", ob.id).first();
      assedata = assedata.toJSON()

      await Log.create({
        method_name: "POST",
        request: "/app/update_deposite",
        response: JSON.stringify(assedata),
        user_id: await auth.getUser().id,
      });

      return response.status(200).json({
        data: assedata,
        status: "success",
      });
    }
      await Log.create({
          method_name: "POST",
          request: "/app/update_deposite",
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

  async get_all_deposite({ request, response, auth }) {
    let data = request.all();
    let page = data.page ? data.page : 1;

    let pageSize = data.pageSize ? data.pageSize : 20;
    let user = await auth.getUser();

    return Deposit.query()
      .where("user_id", user.id)
      .with("user")
      .with("getway")
      .with("transection")
      .with("currency")
      .orderBy("id", "desc")
      .paginate(page, pageSize);
  }

  async get_all_deposite_single({ params, response, auth }) {
    try {
      let user = await auth.getUser();

      let data = await Deposit.query()
        .where("user_id", user.id)
        .with("user")
        .with("getway")
        .with("transection")
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

module.exports = DepositController;
