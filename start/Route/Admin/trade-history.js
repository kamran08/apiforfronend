"use strict";
const Route = use("Route");

// trade histories

Route.group(() => {
  Route.post(
    "/create_new_trade_history",
    "Admin/TradeHistoryController.create_new_trade_history"
  );
  Route.post(
    "/update_trade_history",
    "Admin/TradeHistoryController.update_trade_history"
  );
  Route.post(
    "/delete_trade_history",
    "Admin/TradeHistoryController.delete_trade_history"
  );
  Route.get(
    "/get_all_trade_history",
    "Admin/TradeHistoryController.get_all_trade_history"
  );
  Route.get(
    "/get_all_trade_history_single/:id",
    "Admin/TradeHistoryController.get_all_trade_history_single"
  );
}).prefix("/app/admin/trade-history").middleware(["admin"]);
