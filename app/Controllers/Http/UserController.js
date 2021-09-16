"use strict";

const moment = require("moment");
const User = use("App/Models/User");
const { validate } = use("Validator");
const jwt_decode = require("jwt-decode");
const Log = use("App/Models/Log");

class UserController {
  async createUser({ response, request, auth }) {
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

    let user1 = await User.query()
      .where("user_email", request.body.user_email)
      .first();

    if (user1) {
      return response.status(401).json({
        message: "This email has been taken",
        status: "Authorization is required or has been failed",
      });
    }

    const user = await User.create({
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

    let accessToken = await auth.generate(user);
    user = user.toJSON();
    await Log.create({
      method_name: "POST",
      request: "/app/createUser",
      response: JSON.stringify(user),
      user_id: user.id,
    });
    return response.status(200).json({
      user: user,
      accessToken: accessToken.token,
    });
  }

  async login({ response, request, auth }) {
    const rules = {
      user_email: "required|email",
      user_password: "required|string",
    };
    const validation = await validate(request.body, rules);
    if (validation.fails()) {
      return response.status(401).json({
        message: "Invalid Credentials",
        status: "Authorization is required or has been failed",
      });
    }

    let user = await User.query()
      .where("user_email", request.body.user_email)
      .first();
    if (!user) {
      return response.status(401).json({
        message: "This email is not valid",
        status: "fail",
      });
    }
    let ob;

    try {
      ob = await auth
        .query()
        .attempt(request.body.user_email, request.body.user_password);

      user = user.toJSON();
      await Log.create({
        method_name: "POST",
        request: "/app/login",
        response: JSON.stringify({
          user: user,
          accessToken: ob.token,
          tokenDecode: jwt_decode(ob.token),
        }),
        user_id: user.id,
      });

      return response.status(200).json({
        user: user,
        accessToken: ob.token,
        tokenDecode: jwt_decode(ob.token),
      });
      //  return ob
    } catch (error) {
      await Log.create({
        method_name: "POST",
        request: "/app/login",
        response: JSON.stringify({
          message: "Invalid Credentials",
          status: "fail",
        }),
        user_id: user.id,
      });
      return response.status(401).json({
        message: "Invalid Credentials",
        status: "fail",
      });
    }
    // let accessToken = await auth.getUser(user);
  }

  async updateUser({ response, request, auth }) {
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
    userData = userData.toJSON();
    await Log.create({
      method_name: "POST",
      request: "/app/update_user",
      response: JSON.stringify({
        user: userData,
        status: "success",
      }),
      user_id: userData.id,
    });
    return response.status(200).json({
      user: userData,
      status: "success",
    });
  }
}

module.exports = UserController;
