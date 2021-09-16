"use strict";

const moment = require("moment");
const DemoUser = use("App/Models/DemoUser");
const { validate } = use("Validator");
class DemoUserController {
  async create_new_demouser({ response, request }) {
    const rules = {
      user_name: "required|string",
      user_currency_id: "required|number",
      sounds: "required|number",
      deal_result_dialog: "required|number",
    };
    const validation = await validate(request.body,  rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let ob = {
      user_name: request.body.user_name,
      user_currency_id: request.body.user_currency_id,
      sounds: request.body.sounds,
      deal_result_dialog: request.body.deal_result_dialog,
    };
    try {
      let d = await DemoUser.create(ob);
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
  async update_demouser({ response, request }) {
    const rules = {
      id: "required|number",
      user_name: "required|string",
      user_currency_id: "required|number",
      sounds: "required|number",
      deal_result_dialog: "required|number",
    };
    const validation = await validate(request.body,  rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let ob = {
      id: request.body.id,
      user_name: request.body.user_name,
      user_currency_id: request.body.user_currency_id,
      sounds: request.body.sounds,
      deal_result_dialog: request.body.deal_result_dialog,
    };
    let temp = await DemoUser.query().where("id", ob.id).update(ob);
    if (temp) {
      let assedata = await Asset.query().where("id", ob.id).first();
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
  async delete_demouser({ response, request }) {
    const rules = {
      id: "required|number",
    };
    const validation = await validate(request.body,  rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let temp = await DemoUser.query().where("id", request.body.id).delete();
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

  async get_all_demouser({ request, response }) {
    let data = request.all();
    let page = data.page ? data.page : 1;

    let pageSize = data.pageSize ? data.pageSize : 20;

    return DemoUser.query().orderBy("id", "desc").paginate(page, pageSize);
  }
  async get_all_demouser_single({ params, response }) {
    try {
      let data = await DemoUser.query().where("id", params.id).first();
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

module.exports = DemoUserController;
