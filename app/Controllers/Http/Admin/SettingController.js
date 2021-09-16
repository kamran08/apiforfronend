"use strict";

const Setting = use("App/Models/Setting");
const { validate } = use("Validator");

class SettingController {
  async create_new_setting({ response, request }) {
    const rules = {
      bonus_terms_conditions: "required|string",
      payment_info_policy: "required|string",
      refund_policy: "required|string",
      terms_conditions: "required|string",
      is_active: "required|number",
    };
    const validation = await validate(request.body,  rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let ob = {
      bonus_terms_conditions: request.body.bonus_terms_conditions,
      payment_info_policy: request.body.payment_info_policy,
      refund_policy: request.body.refund_policy,
      terms_conditions: request.body.terms_conditions,
      is_active: request.body.is_active,
    };
    try {
      let d = await Setting.create(ob);
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

  async update_setting({ response, request }) {
    const rules = {
      bonus_terms_conditions: "required|string",
      payment_info_policy: "required|string",
      refund_policy: "required|string",
      terms_conditions: "required|string",
      is_active: "required|number",
    };
    const validation = await validate(request.body,  rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let ob = {
      bonus_terms_conditions: request.body.bonus_terms_conditions,
      payment_info_policy: request.body.payment_info_policy,
      refund_policy: request.body.refund_policy,
      terms_conditions: request.body.terms_conditions,
      is_active: request.body.is_active,
    };
    let temp = await Setting.query().where("id", ob.id).update(ob);
    if (temp) {
      let assedata = await Setting.query().where("id", ob.id).first();
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

  async delete_setting({ response, request }) {
    const rules = {
      id: "required|number",
    };
    const validation = await validate(request.body,  rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let temp = await Setting.query().where("id", request.body.id).delete();
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

  async get_all_setting({ request, response }) {
    let data = request.all();
    let page = data.page ? data.page : 1;

    let pageSize = data.pageSize ? data.pageSize : 20;
    return Setting.query().orderBy("id", "desc").paginate(page, pageSize);
  }

  async get_all_setting_single({ params, response }) {
    try {
      let data = await Setting.query().where("id", params.id).first();
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

module.exports = SettingController;
