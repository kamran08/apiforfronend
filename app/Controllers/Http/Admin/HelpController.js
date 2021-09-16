"use strict";
const moment = require("moment");
const Help = use("App/Models/Help");
const { validate } = use("Validator");
class HelpController {
  async create_new_help({ response, request }) {
    const rules = {
      help_language: "required|string",
      help_country_flag: "required|string",
      help_description: "required|string",
      help_phone: "required|string",
      help_email: "required|string",
      is_active: "required|number",
    };
    const validation = await validate(request.body,  rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let ob = {
      help_language: request.body.help_language,
      help_country_flag: request.body.help_country_flag,
      help_description: request.body.help_description,
      help_phone: request.body.help_phone,
      help_email: request.body.help_email,
      is_active: request.body.is_active,
    };
    try {
      let d = await Help.create(ob);
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
  async update_help({ response, request }) {
    const rules = {
      id: "required|number",
      help_language: "required|string",
      help_country_flag: "required|string",
      help_description: "required|string",
      help_phone: "required|string",
      help_email: "required|string",
      is_active: "required|number",
    };
    const validation = await validate(request.body,  rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let ob = {
      id: request.body.id,
      help_language: request.body.help_language,
      help_country_flag: request.body.help_country_flag,
      help_description: request.body.help_description,
      help_phone: request.body.help_phone,
      help_email: request.body.help_email,
      is_active: request.body.is_active,
    };
    let temp = await Help.query().where("id", ob.id).update(ob);
    if (temp) {
      let assedata = await Help.query().where("id", ob.id).first();
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
  async delete_help({ response, request }) {
    const rules = {
      id: "required|number",
    };
    const validation = await validate(request.body,  rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let temp = await Help.query().where("id", request.body.id).delete();
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

  async get_all_help({ request, response }) {
    let data = request.all();
    let page = data.page ? data.page : 1;

    let pageSize = data.pageSize ? data.pageSize : 20;

    return Help.query().orderBy("id", "desc").paginate(page, pageSize);
  }
  async get_all_help_single({ params, response }) {
    try {
      let data = await Help.query().where("id", params.id).first();
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

module.exports = HelpController;
