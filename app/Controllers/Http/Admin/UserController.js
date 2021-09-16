"use strict";

const moment = require("moment");
const Admin = use("App/Models/Admin");
const User = use("App/Models/User");
const { validate } = use("Validator");
class UserController {
  async getAllUsers({ request, response }) {
    return response.status(200).json({
      user: User.all(),
    });
  }

  async updateUser({ request, response }) {
    const rules = {
      user_first_name: "required|string",
      user_last_name: "required|string",
      user_fcm_token: "required|string",
      user_auth_token: "required|string",
      user_email: "required|email|unique:users,user_email",
      user_password: "required|string",
      user_profile_pic: "required|string",
      user_mobile: "required|string",
      user_gender: "required|string",
      user_country: "required|string",
      user_city: "required|string",
      user_postal_code: "required|string",
      user_address: "required|string",
      user_dob: "required|string",
      user_bonus: "required|string",
      kyc_id: "required|string",
      sounds: "required|string",
      deal_result_dialog: "required|string",
    };
    const validation = await validate(request.body, rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let uid = await auth.getUser().id;
    await User.where("id", uid).update({
      user_first_name: request.body.user_first_name,
      user_last_name: request.body.user_last_name,
      user_fcm_token: request.body.user_fcm_token,
      user_auth_token: request.body.user_auth_token,
      user_email: request.body.user_email,
      user_password: request.body.user_password,
      user_profile_pic: request.body.user_profile_pic,
      user_mobile: request.body.user_mobile,
      user_gender: request.body.user_gender,
      user_country: request.body.user_country,
      user_city: request.body.user_city,
      user_postal_code: request.body.user_postal_code,
      user_address: request.body.user_address,
      user_dob: request.body.user_dob,
      is_active: 1,
      user_currency_id: request.body.user_currency_id,
      user_bonus: request.body.user_bonus,
      kyc_id: request.body.kyc_id,
      sounds: request.body.sounds,
      deal_result_dialog: request.body.deal_result_dialog,
    });

    let userData = await User.query().where("id", uid).first();
    return response.status(200).json({
      user: userData,
      status: "success",
    });
  }

  async deleteUser({ request, response }) {
    const rules = {
      id: "required|number",
    };
    const validation = await validate(request.body, rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let temp = await User.query().where("id", request.body.id).delete();
    if (temp) {
      return response.status(200).json({
        message: "User deleted successfully",
        status: "success",
      });
    }
    return response.status(401).json({
      message: "Invalid request",
      status: "fail",
    });
  }
}

module.exports = UserController;
