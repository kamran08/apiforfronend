"use strict";
const Admin = use("App/Models/Admin");
const { validate } = use("Validator");
const jwt_decode = require("jwt-decode");

class AuthController {
  async login({ response, auth, request }) {
    const rules = {
      admin_email: "required|email",
      admin_password: "required|string",
    };

    const validation = await validate(request.body, rules);
    if (validation.fails()) {
      return response.status(401).json({
        message: "Invalid Credentials",
        status: "Authorization is required or has been failed",
      });
    }

    let user = await Admin.query()
      .where("admin_email", request.body.admin_email)
      .first();
    if (!user) {
      return response.status(401).json({
        message: "Invalid Credentials",
        status: "fail",
      });
    }

    try {
      let ob = await auth
        .authenticator("admin")
        .attempt(request.body.admin_email, request.body.admin_password);
      if (ob && ob.token) {
        return response.status(200).json({
          user: user,
          accessToken: ob.token,
          tokenDecode: jwt_decode(ob.token),
        });
      }

      return ob;
    } catch (error) {
      return response.status(401).json({
        message: "Invalid Credentials",
        status: "fail",
      });
    }
  }
}

module.exports = AuthController;
