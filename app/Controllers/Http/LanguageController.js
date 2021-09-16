"use strict";
const moment = require("moment");
const Language = use("App/Models/Language");
const { validate } = use("Validator");
const Database = use("Database");
class LanguageController {

  async get_all_language({ request, response }) {
    let data = request.all();
    let page = data.page ? data.page : 1;

    let pageSize = data.pageSize ? data.pageSize : 20;

    return Language.query().orderBy("id", "desc").paginate(page, pageSize);
  }

  async get_all_language_single({ params, response }) {
    try {
      let data = await Language.query().where("id", params.id).first();
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

module.exports = LanguageController;
