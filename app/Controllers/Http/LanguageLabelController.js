"use strict";
const moment = require("moment");
const Language = use("App/Models/Language");
const LanguageLabel = use("App/Models/LanguageLabel");
const { validate } = use("Validator");
const Database = use("Database");

class LanguageLabelController {

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
