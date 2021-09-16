"use strict";
const moment = require("moment");
const Language = use("App/Models/Language");
const LanguageLabel = use("App/Models/LanguageLabel");
const { validate } = use("Validator");
const Database = use("Database");

class LanguageLabelController {
  async create_new_language_labels({ response, request }) {
    let lang = await Language.all();
    lang = lang.toJSON();
    const rules = {
      lang_label: "required|string",
    };
    for (let i of lang) {
      i.lang_name = i.lang_name.toLowerCase();
      rules[`lang_${i.lang_name}`] = "required|string";
    }

    const validation = await validate(request.body, rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    try {
      let d = await LanguageLabel.create(request.body);
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
  async update_language_labels({ response, request }) {
    let lang = await Language.all();
    lang = lang.toJSON();
    const rules = {
      id: "required|number",
      lang_label: "required|string",
    };
    for (let i of lang) {
      i.lang_name = i.lang_name.toLowerCase();
      rules[`lang_${i.lang_name}`] = "required|string";
    }

    const validation = await validate(request.body, rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    
    let temp = await LanguageLabel.query().where("id", request.body.id).update(ob);
    if (temp) {
      let assedata = await LanguageLabel.query().where("id", request.body.id).first();
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
  async delete_language_labels({ response, request }) {
    const rules = {
      id: "required|number",
    };
    const validation = await validate(request.body, rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let temp = await LanguageLabel.query()
      .where("id", request.body.id)
      .delete();
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
  async get_all_language_labels({ request, response }) {
    let data = request.all();
    let page = data.page ? data.page : 1;

    let pageSize = data.pageSize ? data.pageSize : 20;

    return LanguageLabel.query().orderBy("id", "desc").paginate(page, pageSize);
  }
  async get_all_language_labels_single({ params, response }) {
    try {
      let data = await LanguageLabel.query().where("id", params.id).first();
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

module.exports = LanguageLabelController;
