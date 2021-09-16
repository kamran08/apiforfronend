"use strict";
const Route = use("Route");


Route.get("/app/get_all_asset", "AssetController.get_all_asset");
Route.get("/app/get_all_asset_single/:id","AssetController.get_all_asset_single");

Route.get("/app/get_all_bonus", "BonusController.get_all_bonus");
Route.get("/app/get_all_bonus_single/:id","BonusController.get_all_bonus_single");

Route.get("/app/get_all_currency", "CurrencyController.get_all_currency");
Route.get("/app/get_all_currency_single/:id","CurrencyController.get_all_currency_single");

Route.get("/app/get_all_faq", "FaqController.get_all_faq");
Route.get("/app/get_all_faq_single/:id", "FaqController.get_all_faq_single");

Route.get("/app/get_all_help", "HelpController.get_all_help");
Route.get("/app/get_all_help_single/:id", "HelpController.get_all_help_single");

Route.group(() => {
  Route.get("/get_all_news", "NewsController.get_all_news");
  Route.get("/get_all_news_single/:id", "NewsController.get_all_news_single");
}).prefix("/app/news");

Route.group(() => {
  Route.get(
    "/app/get_all_language_labels",
    "LanguageLabelController.get_all_language_labels"
  );
  Route.get(
    "/app/get_all_language_labels_single/:id",
    "LanguageLabelController.get_all_language_labels_single"
  );
});

Route.group(() => {
  Route.get("/app/get_all_language", "LanguageController.get_all_language");
  Route.get(
    "/app/get_all_language_single/:id",
    "LanguageController.get_all_language_single"
  );
});

Route.group(() => {
  Route.get(
    "/get_all_payment_gateway",
    "PaymentGatewayController.get_all_payment_gateway"
  );
  Route.get(
    "/get_all_payment_gateway_single/:id",
    "PaymentGatewayController.get_all_payment_gateway_single"
  );
}).prefix("/app/payment-getway");

Route.group(() => {
  Route.get("/get_all_setting", "SettingController.get_all_setting");
  Route.get(
    "/get_all_setting_single/:id",
    "SettingController.get_all_setting_single"
  );
}).prefix("/app/setting");

Route.group(() => {
  Route.get("/get_all_training", "TrainingController.get_all_training");
  Route.get(
    "/get_all_training_single/:id",
    "TrainingController.get_all_training_single"
  );
}).prefix("/app/training");

