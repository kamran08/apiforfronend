"use strict";
const PushNotification = use("App/Models/PushNotification");
const { validate } = use("Validator");

class PushNotificationController {
  async create_new_push_notification({ response, request }) {
    const rules = {
      message: "required|string",
      sub_title: "required|string",
      title: "required|string",
      is_active: "required|number",
    };
    const validation = await validate(request.body,  rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let ob = {
      message: request.body.message,
      sub_title: request.body.sub_title,
      title: request.body.title,
      is_active: request.body.is_active,
    };
    try {
      let d = await PushNotification.create(ob);
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

  async update_push_notification({ response, request }) {
    const rules = {
      message: "required|string",
      sub_title: "required|string",
      title: "required|string",
      is_active: "required|number",
    };
    const validation = await validate(request.body,  rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let ob = {
      message: request.body.message,
      sub_title: request.body.sub_title,
      title: request.body.title,
      is_active: request.body.is_active,
    };
    let temp = await PushNotification.query().where("id", ob.id).update(ob);
    if (temp) {
      let assedata = await PushNotification.query().where("id", ob.id).first();
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

  async delete_push_notification({ response, request }) {
    const rules = {
      id: "required|number",
    };
    const validation = await validate(request.body,  rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let temp = await PushNotification.query()
      .where("id", request.body.id)
      .delete();
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

  async get_all_push_notification({ request, response }) {
    let data = request.all();
    let page = data.page ? data.page : 1;

    let pageSize = data.pageSize ? data.pageSize : 20;
    return PushNotification.query()
      .orderBy("id", "desc")
      .paginate(page, pageSize);
  }

  async get_all_push_notification_single({ params, response }) {
    try {
      let data = await PushNotification.query().where("id", params.id).first();
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

module.exports = PushNotificationController;
