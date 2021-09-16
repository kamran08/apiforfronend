"use strict";
const Training = use("App/Models/Training");
const { validate } = use("Validator");
class TrainingController {

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
