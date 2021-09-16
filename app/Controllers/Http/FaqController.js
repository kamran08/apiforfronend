"use strict";
const moment = require("moment");
const Faq = use("App/Models/Faq");
const { validate } = use("Validator");

class FaqController {
  async get_all_faq({ request, response }) {
    let data = request.all();
    let page = data.page ? data.page : 1;

    let pageSize = data.pageSize ? data.pageSize : 20;

    return Faq.query().orderBy("id", "desc").paginate(page, pageSize);
  }
  async get_all_faq_single({ params, response }) {
    try {
      let data = await Faq.query().where("id", params.id).first();
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

module.exports = FaqController;
