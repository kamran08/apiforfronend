"use strict";
const Training = use("App/Models/Training");
const { validate } = use("Validator");
class TrainingController {
  async create_new_training({ response, request }) {
    const rules = {
      training_desc: "required|string",
      training_title: "required|string",
      training_url: "required|string",
      is_active: "required|number",
    };
    const validation = await validate(request.body, rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let ob = {
      training_desc: request.body.training_desc,
      training_title: request.body.training_title,
      training_url: request.body.training_url,
      is_active: request.body.is_active,
    };
    try {
      let d = await Training.create(ob);
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

  async update_training({ response, request }) {
    const rules = {
      id: "required|number",
      training_desc: "required|string",
      training_title: "required|string",
      training_url: "required|string",
      is_active: "required|number",
    };
    const validation = await validate(request.body, rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let ob = {
      id: request.body.id,
      training_desc: request.body.training_desc,
      training_title: request.body.training_title,
      training_url: request.body.training_url,
      is_active: request.body.is_active,
    };
    let temp = await Training.query().where("id", ob.id).update(ob);
    if (temp) {
      let assedata = await Training.query().where("id", ob.id).first();
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

  async delete_training({ response, request }) {
    const rules = {
      id: "required|number",
    };
    const validation = await validate(request.body, rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let temp = await Training.query().where("id", request.body.id).delete();
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

  async get_all_training({ request, response }) {
    let data = request.all();
    let page = data.page ? data.page : 1;

    let pageSize = data.pageSize ? data.pageSize : 20;
    return Training.query().orderBy("id", "desc").paginate(page, pageSize);
  }

  async get_all_training_single({ params, response }) {
    try {
      let data = await Training.query().where("id", params.id).first();
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

module.exports = TrainingController;
