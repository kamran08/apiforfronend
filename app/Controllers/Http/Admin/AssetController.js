"use strict";

const moment = require("moment");
const Asset = use("App/Models/Asset");
const { validate } = use("Validator");

class AssetController {
  async create_new_asset({ response, request }) {
    const rules = {
      asset_category: "required|number",
      asset_name: "required|string",
      asset_from: "required|string",
      profit_percentage: "required|string",
      asset_img: "required|string",
      is_active: "required|number",
    };
    const validation = await validate(request.body,  rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let ob = {
      asset_category: request.body.asset_category,
      asset_name: request.body.asset_name,
      asset_from: request.body.asset_from,
      profit_percentage: request.body.profit_percentage,
      asset_img: request.body.asset_img,
      is_active: request.body.is_active,
    };
    try {
      let d = await Asset.create(ob);
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
  async update_asset({ response, request }) {
    const rules = {
      id:"required|number",
      asset_category: "required|number",
      asset_name: "required|string",
      asset_from: "required|string",
      profit_percentage: "required|string",
      asset_img: "required|string",
      is_active: "required|number",
    };
    const validation = await validate(request.body,  rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let ob = {
      id: request.body.id,
      asset_category: request.body.asset_category,
      asset_name: request.body.asset_name,
      asset_from: request.body.asset_from,
      profit_percentage: request.body.profit_percentage,
      asset_img: request.body.asset_img,
      is_active: request.body.is_active,
    };
    let temp = await Asset.query().where("id", ob.id).update(ob);
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
  async delete_asset(response, request) {
    const rules = {
      id: "required|number",
    };
    const validation = await validate(request.body,  rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let temp = await Asset.query().where("id", request.body.id).delete();
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
