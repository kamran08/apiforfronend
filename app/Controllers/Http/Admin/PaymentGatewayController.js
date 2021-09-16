"use strict";
const PaymentGateway = use("App/Models/PaymentGateway");
const { validate } = use("Validator");
class PaymentGatewayController {
  async create_new_payment_gateway({ response, request }) {
    const rules = {
      currency_id: "required",
      gateway_img: "required|string",
      gateway_name: "required|string",
      is_active: "required|number",
    };
    const validation = await validate(request.body,  rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let ob = {
      currency_id: request.body.currency_id,
      gateway_img: request.body.gateway_img,
      gateway_name: request.body.gateway_name,
      is_active: request.body.is_active,
    };
    try {
      let d = await PaymentGateway.create(ob);
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

  async update_payment_gateway({ response, request }) {
    const rules = {
      currency_id: "required",
      gateway_img: "required|string",
      gateway_name: "required|string",
      is_active: "required|number",
    };
    const validation = await validate(request.body,  rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let ob = {
      currency_id: request.body.currency_id,
      gateway_img: request.body.gateway_img,
      gateway_name: request.body.gateway_name,
      is_active: request.body.is_active,
    };
    let temp = await PaymentGateway.query().where("id", ob.id).update(ob);
    if (temp) {
      let assedata = await PaymentGateway.query().where("id", ob.id).first();
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

  async delete_payment_gateway({ response, request }) {
    const rules = {
      id: "required|number",
    };
    const validation = await validate(request.body,  rules);
    if (validation.fails()) {
      return response.status(401).send(validation.messages());
    }
    let temp = await PaymentGateway.query()
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

  async get_all_payment_gateway({ request, response }) {
    let data = request.all();
    let page = data.page ? data.page : 1;

    let pageSize = data.pageSize ? data.pageSize : 20;
    return PaymentGateway.query()
      .with("currency")
      .orderBy("id", "desc")
      .paginate(page, pageSize);
  }

  async get_all_payment_gateway_single({ response, params }) {
    try {
      let data = await PaymentGateway.query()
        .with("currency")
        .where("id", params.id)
        .first();
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

module.exports = PaymentGatewayController;
