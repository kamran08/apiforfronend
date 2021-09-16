"use strict";
const Route = use("Route");

// push notifications
// need middleware
Route.group(() => {
  Route.get(
    "/get_all_push_notification",
    "PushNotificationController.get_all_push_notification"
  );
  Route.get(
    "/get_all_push_notification_single/:id",
    "PushNotificationController.get_all_push_notification_single"
  );
})
  .prefix("/app/push-notification")
  .middleware(["loggedIn"]);
