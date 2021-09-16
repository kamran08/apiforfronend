"use strict";
const Log = use("App/Models/Log");
const { validate } = use("Validator");
class LogController {
  async create_new_log({ response, request }) {
    const rules = {
      method_name: "required|string",
      request: "required|string",
      response: "required|string",
      user_id: "required",
    };
    const validation = await validate(request.body,  rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let ob = {
      method_name: request.body.method_name,
      request: request.body.request,
      response: request.body.response,
      user_id: request.body.user_id,
    };
    try {
      let d = await Log.create(ob);
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

  async delete_log({ response, request }) {
    const rules = {
      id: "required|number",
    };
    const validation = await validate(request.body,  rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let temp = await Log.query().where("id", request.body.id).delete();
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

  async get_all_log({ request, response }) {
    let data = request.all();
    let page = data.page ? data.page : 1;

    let pageSize = data.pageSize ? data.pageSize : 20;
    return Log.query().orderBy("id", "desc").paginate(page, pageSize);
  }

  async get_all_log_single({ params, response }) {
    try {
      let data = await Currency.query().where("id", params.id).first();
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

module.exports = LogController;
