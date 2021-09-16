"use strict";
const Route = use("Route");

// language_labels related data
Route.group(() => {
  Route.post(
    "/app/admin/create_new_language_labels",
    "Admin/LanguageLabelController.create_new_language_labels"
  );
  Route.post(
    "/app/admin/update_language_labels",
    "Admin/LanguageLabelController.update_language_labels"
  );
  Route.post(
    "/app/admin/delete_language_labels",
    "Admin/LanguageLabelController.delete_language_labels"
  );
  Route.get(
    "/app/admin/get_all_language_labels",
    "Admin/LanguageLabelController.get_all_language_labels"
  );
  Route.get(
    "/app/admin/get_all_language_labels_single/:id",
    "Admin/LanguageLabelController.get_all_language_labels_single"
  );
}).middleware(["admin"]);
