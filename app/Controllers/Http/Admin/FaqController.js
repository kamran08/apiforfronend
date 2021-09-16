"use strict";
const moment = require("moment");
const Faq = use("App/Models/Faq");
const { validate } = use("Validator");

class FaqController {
  async create_new_faq({ response, request }) {
    const rules = {
      faq_question: "required|string",
      faq_answer: "required|string",
      is_active: "required|number",
    };
    const validation = await validate(request.body,  rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let ob = {
      faq_question: request.body.faq_question,
      faq_answer: request.body.faq_answer,
      is_active: request.body.is_active,
    };
    try {
      let d = await Faq.create(ob);
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
  async update_faq({ response, request }) {
    const rules = {
      id: "required|number",
      faq_question: "required|string",
      faq_answer: "required|string",
      is_active: "required|number",
    };
    const validation = await validate(request.body,  rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let ob = {
      id: request.body.id,
      faq_question: request.body.faq_question,
      faq_answer: request.body.faq_answer,
      is_active: request.body.is_active,
    };
    let temp = await Faq.query().where("id", ob.id).update(ob);
    if (temp) {
      let assedata = await Faq.query().where("id", ob.id).first();
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
  async delete_faq({ response, request }) {
    const rules = {
      id: "required|number",
    };
    const validation = await validate(request.body,  rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let temp = await Faq.query().where("id", request.body.id).delete();
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
