"use strict";
const Route = use("Route");

// setting

Route.group(() => {
  Route.post("/create_new_training", "Admin/TrainingController.create_new_training");
  Route.post("/update_training", "Admin/TrainingController.update_training");
  Route.post("/delete_training", "Admin/TrainingController.delete_training");
  Route.get("/get_all_training", "Admin/TrainingController.get_all_training");
  Route.get(
    "/get_all_training_single/:id",
    "Admin/TrainingController.get_all_training_single"
  );
}).prefix("/app/admin/training").middleware(["admin"]);
