"use strict";
const Route = use("Route");

// news

Route.group(() => {
  Route.post("/create_new_news", "Admin/NewsController.create_new_news");
  Route.post("/update_news", "Admin/NewsController.update_news");
  Route.post("/delete_news", "Admin/NewsController.delete_news");
  Route.get("/get_all_news", "Admin/NewsController.get_all_news");
  Route.get("/get_all_news_single/:id", "Admin/NewsController.get_all_news_single");
}).prefix("/app/admin/news").middleware(["admin"]);
