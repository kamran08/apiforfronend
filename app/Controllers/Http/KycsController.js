"use strict";
const moment = require("moment");
const Kyc = use("App/Models/Kyc");
const Log = use("App/Models/Log");
const { validate } = use("Validator");

class KycsController {
  async update_kyc({ response, request, auth }) {
    const rules = {
      id: "required|number",
      kyc_doc: "required|string",
      kyc_status: "required|number",
    };
    const validation = await validate(request.body, rules);
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
      assedata = assedata.toJSON()
      await Log.create({
        method_name: "POST",
        request: "/app/update_kyc",
        response: JSON.stringify(assedata),
        user_id: await auth.getUser().id,
      });

      return response.status(200).json({
        data: assedata,
        status: "success",
      });
    }

    await Log.create({
      method_name: "POST",
      request: "/app/update_kyc",
      response: JSON.stringify({
        message: "Invalid request",
        status: "fail",
      }),
      user_id: await auth.getUser().id,
    }); 
    return response.status(401).json({
      message: "Invalid request",
      status: "fail",
    });
  }

  async get_all_kyc({ request, response, auth }) {
    let data = request.all();
    let page = data.page ? data.page : 1;

    let pageSize = data.pageSize ? data.pageSize : 20;

    return Kyc.query().orderBy("id", "desc").paginate(page, pageSize);
  }

  async get_all_kyc_single({ params, response, auth }) {
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
