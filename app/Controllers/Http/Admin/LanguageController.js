"use strict";
const moment = require("moment");
const Language = use("App/Models/Language");
const { validate } = use("Validator");
const Database = use("Database");
class LanguageController {
  async create_new_language({ response, request }) {
    const rules = {
      lang_name: "required|string",
      is_active: "required|number",
    };
    const validation = await validate(request.body, rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let ob = {
      lang_name: request.body.lang_name,
      is_active: request.body.is_active,
    };
    try {
      let d = await Language.create(ob);
      let column = d.lang_name.toLowerCase();
      await Database.raw(
        `ALTER TABLE language_labels ADD lang_${column} varchar(255)`
      );

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

  async update_language({ response, request }) {
    const rules = {
      id: "required|number",
      lang_name: "required|string",
      is_active: "required|number",
    };
    const validation = await validate(request.body, rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let ob = {
      id: request.body.id,
      lang_name: request.body.lang_name,
      is_active: request.body.is_active,
    };
    let old = await Language.query().where("id", ob.id).first();
    let temp = await Language.query().where("id", ob.id).update(ob);

    let column = ob.lang_name.toLowerCase();
    await Database.raw(
      `ALTER TABLE language_labels RENAME COLUMN lang_${old.lang_name} TO lang_${column}`
    );

    if (temp) {
      let assedata = await Language.query().where("id", ob.id).first();
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

  async delete_language({ response, request }) {
    const rules = {
      id: "required|number",
    };
    const validation = await validate(request.body, rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let old = await Language.query().where("id", request.body.id).first();
    let temp = await Language.query().where("id", request.body.id).delete();

    let column = old.lang_name.toLowerCase();
    await Database.raw(
      `ALTER TABLE language_labels DROP COLUMN lang_${column}`
    );

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
