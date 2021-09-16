"use strict";
const TradeHistory = use("App/Models/TradeHistory");
const { validate } = use("Validator");
class TradeHistoryController {
  async create_new_trade_history({ response, request }) {
    const rules = {
      asset_id: "required",
      bid_price: "required|string",
      bid_time: "required|string",
      expiry_price: "required|string",
      expiry_time: "required|string",
      total_earning: "required|string",
      trade_status: "required|string",
      trade_type: "required|string",
      trading_amount: "required|string",
      user_type: "required|string",
      user_id: "required",
    };
    const validation = await validate(request.body,  rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let ob = {
      asset_id: request.body.asset_id,
      bid_price: request.body.bid_price,
      bid_time: request.body.bid_time,
      expiry_price: request.body.expiry_price,
      expiry_time: request.body.expiry_time,
      total_earning: request.body.total_earning,
      trade_status: request.body.trade_status,
      trade_type: request.body.trade_type,
      trading_amount: request.body.trading_amount,
      user_type: request.body.user_type,
      user_id: request.body.user_id,
    };
    try {
      let d = await TradeHistory.create(ob);
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

  async update_trade_history({ response, request }) {
    const rules = {
      asset_id: "required",
      bid_price: "required|string",
      bid_time: "required|string",
      expiry_price: "required|string",
      expiry_time: "required|string",
      total_earning: "required|string",
      trade_status: "required|string",
      trade_type: "required|string",
      trading_amount: "required|string",
      user_type: "required|string",
      user_id: "required",
    };
    const validation = await validate(request.body,  rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let ob = {
      asset_id: request.body.asset_id,
      bid_price: request.body.bid_price,
      bid_time: request.body.bid_time,
      expiry_price: request.body.expiry_price,
      expiry_time: request.body.expiry_time,
      total_earning: request.body.total_earning,
      trade_status: request.body.trade_status,
      trade_type: request.body.trade_type,
      trading_amount: request.body.trading_amount,
      user_type: request.body.user_type,
      user_id: request.body.user_id,
    };
    let temp = await TradeHistory.query().where("id", ob.id).update(ob);
    if (temp) {
      let assedata = await TradeHistory.query().where("id", ob.id).first();
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

  async delete_trade_history({ response, request }) {
    const rules = {
      id: "required|number",
    };
    const validation = await validate(request.body,  rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let temp = await TradeHistory.query().where("id", request.body.id).delete();
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

  async get_all_trade_history({ request, response }) {
    let data = request.all();
    let page = data.page ? data.page : 1;

    let pageSize = data.pageSize ? data.pageSize : 20;
    let res = TradeHistory.query()
      .with("asset")
      .with("demoUser")
      .with("user")
      .orderBy("id", "desc")
      .paginate(page, pageSize);

    for (let i of res.data) {
      if (i.type == 1) {
        delete i.user;
      } else delete i.demoUser;
    }

    return res;
  }

  async get_all_trade_history_single({ params, response }) {
    try {
      let data = await TradeHistory.query()
        .with("asset")
        .with("demoUser")
        .with("user")
        .where("id", params.id)
        .first();

      if (data.type == 1) {
        delete data.user;
      } else delete data.demoUser;

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

module.exports = TradeHistoryController;
