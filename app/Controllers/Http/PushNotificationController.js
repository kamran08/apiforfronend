"use strict";
const PushNotification = use("App/Models/PushNotification");
const { validate } = use("Validator");

class PushNotificationController {
  async get_all_push_notification({ request, response, auth }) {
    let data = request.all();
    let page = data.page ? data.page : 1;

    let pageSize = data.pageSize ? data.pageSize : 20;
    return PushNotification.query()
      .orderBy("id", "desc")
      .paginate(page, pageSize);
  }

  async get_all_push_notification_single({ params, response, auth }) {
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
