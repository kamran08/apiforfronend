"use strict";

const moment = require("moment");
const Asset = use("App/Models/Asset");
const { validate } = use("Validator");

class AssetController {


  async get_all_asset({ request, response }) {
    let data = request.all();
    let page = data.page ? data.page : 1;

    let pageSize = data.pageSize ? data.pageSize : 20;
    return Asset.query().orderBy("id", "desc").paginate(page, pageSize);
  }
  async get_all_asset_single({ params, response }) {
    try {
      let data = await Asset.query().where("id", params.id).first();
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

module.exports = AssetController;
