"use strict";
const News = use("App/Models/News");
const { validate } = use("Validator");
class NewsController {

  async get_all_news({ request, response }) {
    let data = request.all();
    let page = data.page ? data.page : 1;

    let pageSize = data.pageSize ? data.pageSize : 20;
    return News.query().orderBy("id", "desc").paginate(page, pageSize);
  }

  async get_all_news_single({ params, response }) {
    try {
      let data = await News.query().where("id", params.id).first();
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

module.exports = NewsController;
