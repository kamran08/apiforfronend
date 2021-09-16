"use strict";
const News = use("App/Models/News");
const { validate } = use("Validator");
class NewsController {
  async create_new_news({ response, request }) {
    const rules = {
      news_desc: "required|string",
      news_title: "required|string",
      video_url: "required|string",
      is_active: "required|number",
    };
    const validation = await validate(request.body,  rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let ob = {
      news_desc: request.body.news_desc,
      news_title: request.body.news_title,
      video_url: request.body.video_url,
      is_active: request.body.is_active,
    };
    try {
      let d = await News.create(ob);
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

  async update_news({ response, request }) {
    const rules = {
      news_desc: "required|string",
      news_title: "required|string",
      video_url: "required|string",
      is_active: "required|number",
    };
    const validation = await validate(request.body,  rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let ob = {
      news_desc: request.body.news_desc,
      news_title: request.body.news_title,
      video_url: request.body.video_url,
      is_active: request.body.is_active,
    };
    let temp = await News.query().where("id", ob.id).update(ob);
    if (temp) {
      let assedata = await News.query().where("id", ob.id).first();
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

  async delete_news({ response, request }) {
    const rules = {
      id: "required|number",
    };
    const validation = await validate(request.body,  rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let temp = await News.query().where("id", request.body.id).delete();
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
