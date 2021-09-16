"use strict";
const Route = use("Route");

// push notifications

Route.group(() => {
  Route.post(
    "/create_new_push_notification",
    "Admin/PushNotificationController.create_new_push_notification"
  );
  Route.post(
    "/update_push_notification",
    "Admin/PushNotificationController.update_push_notification"
  );
  Route.post(
    "/delete_push_notification",
    "Admin/PushNotificationController.delete_push_notification"
  );
  Route.get(
    "/get_all_push_notification",
    "Admin/PushNotificationController.get_all_push_notification"
  );
  Route.get(
    "/get_all_push_notification_single/:id",
    "Admin/PushNotificationController.get_all_push_notification_single"
  );
}).prefix("/app/admin/push-notification").middleware(["admin"]);
