"use strict";

const Setting = use("App/Models/Setting");
const { validate } = use("Validator");

class SettingController {
  async get_all_setting({ request, response }) {
    let data = request.all();
    let page = data.page ? data.page : 1;

    let pageSize = data.pageSize ? data.pageSize : 20;
    return Setting.query().orderBy("id", "desc").paginate(page, pageSize);
  }

  async get_all_setting_single({ params, response }) {
    try {
      let data = await Setting.query().where("id", params.id).first();
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

module.exports = SettingController;
