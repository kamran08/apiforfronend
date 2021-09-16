"use strict";
const Route = use("Route");

// settings

Route.group(() => {
  Route.post("/create_new_setting", "Admin/SettingController.create_new_setting");
  Route.post("/update_setting", "Admin/SettingController.update_setting");
  Route.post("/delete_setting", "Admin/SettingController.delete_setting");
  Route.get("/get_all_setting", "Admin/SettingController.get_all_setting");
  Route.get(
    "/get_all_setting_single/:id",
    "Admin/SettingController.get_all_setting_single"
  );
}).prefix("/app/admin/setting").middleware(["admin"]);
