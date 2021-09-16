"use strict";
const Route = use("Route");

// payment gateways

Route.group(() => {
  Route.post(
    "/create_new_payment_gateway",
    "Admin/PaymentGatewayController.create_new_payment_gateway"
  );
  Route.post(
    "/update_payment_gateway",
    "Admin/PaymentGatewayController.update_payment_gateway"
  );
  Route.post(
    "/delete_payment_gateway",
    "Admin/PaymentGatewayController.delete_payment_gateway"
  );
  Route.get(
    "/get_all_payment_gateway",
    "Admin/PaymentGatewayController.get_all_payment_gateway"
  );
  Route.get(
    "/get_all_payment_gateway_single/:id",
    "Admin/PaymentGatewayController.get_all_payment_gateway_single"
  );
}).prefix("/app/admin/payment-getway").middleware(["admin"]);
