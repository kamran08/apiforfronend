"use strict";

const moment = require("moment");
const Bonus = use("App/Models/Bonus");
const { validate } = use("Validator");

class BonusController {
  async get_all_bonus({ request, response }) {
    let data = request.all();
    let page = data.page ? data.page : 1;

    let pageSize = data.pageSize ? data.pageSize : 20;
    return Bonus.query()
      .with("currency")
      .orderBy("id", "desc")
      .paginate(page, pageSize);
  }
  async get_all_bonus_single({ params, response }) {
    try {
      let data = await Bonus.query()
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

module.exports = BonusController;
