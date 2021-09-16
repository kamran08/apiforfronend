"use strict";
const moment = require("moment");
const Help = use("App/Models/Help");
const { validate } = use("Validator");
class HelpController {
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
