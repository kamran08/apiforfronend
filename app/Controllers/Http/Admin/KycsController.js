"use strict";
const moment = require("moment");
const Kyc = use("App/Models/Kyc");
const { validate } = use("Validator");

class KycsController {
  async create_new_kyc({ response, request }) {
    const rules = {
      kyc_doc: "required|string",
      kyc_status: "required|number",
    };
    const validation = await validate(request.body,  rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let ob = {
      kyc_doc: request.body.kyc_doc,
      kyc_status: request.body.kyc_status,
    };
    try {
      let d = await Kyc.create(ob);
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
  async update_kyc({ response, request }) {
    const rules = {
      id: "required|number",
      kyc_doc: "required|string",
      kyc_status: "required|number",
    };
    const validation = await validate(request.body,  rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let ob = {
      id: request.body.id,
      kyc_doc: request.body.kyc_doc,
      kyc_status: request.body.kyc_status,
    };
    let temp = await Kyc.query().where("id", ob.id).update(ob);
    if (temp) {
      let assedata = await Kyc.query().where("id", ob.id).first();
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
  async delete_kyc({ response, request }) {
    const rules = {
      id: "required|number",
    };
    const validation = await validate(request.body,  rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let temp = await Kyc.query().where("id", request.body.id).delete();
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

  async get_all_kyc({ request, response }) {
    let data = request.all();
    let page = data.page ? data.page : 1;

    let pageSize = data.pageSize ? data.pageSize : 20;

    return Kyc.query().orderBy("id", "desc").paginate(page, pageSize);
  }
  async get_all_kyc_single({ params, response }) {
    try {
      let data = await Kyc.query().where("id", params.id).first();
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

module.exports = KycsController;
