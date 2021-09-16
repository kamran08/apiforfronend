"use strict";
const PaymentGateway = use("App/Models/PaymentGateway");
const { validate } = use("Validator");
class PaymentGatewayController {


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
