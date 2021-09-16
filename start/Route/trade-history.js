"use strict";
const Route = use("Route");

// trade histories

// need middleware
Route.group(() => {
  Route.post(
    "/create_new_trade_history",
    "TradeHistoryController.create_new_trade_history"
  );
  Route.get(
    "/get_all_trade_history",
    "TradeHistoryController.get_all_trade_history"
  );
  Route.get(
    "/get_all_trade_history_single/:id",
    "TradeHistoryController.get_all_trade_history_single"
  );
})
  .prefix("/app/trade-history")
  .middleware(["loggedIn"]);
