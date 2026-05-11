# Stage 1

## Answer

The notification system should support fetching notifications, creating notifications, marking notifications as read, deleting notifications, and real-time notification delivery.

APIs:

1. GET /api/notifications

Response

{
  "success": true,
  "notifications": [
    {
      "id": "notif_101",
      "userId": "user_1",
      "title": "Placement Update",
      "message": "Amazon hiring challenge",
      "isRead": false,
      "createdAt": "2026-05-11T10:00:00Z",
      "link": "/placements/amazon"
    }
  ]
}

2. POST /api/notifications

Request Body

{
  "userId": "user_1",
  "title": "Placement Update",
  "message": "Microsoft hiring drive",
  "link": "/placements/microsoft"
}

Response

{
  "success": true,
  "message": "Notification created"
}

3. PATCH /api/notifications/:id/read

Response

{
  "success": true
}

4. DELETE /api/notifications/:id

Response

{
  "success": true
}

Notification Schema

{
  "id": "string",
  "userId": "string",
  "title": "string",
  "message": "string",
  "isRead": "boolean",
  "createdAt": "timestamp",
  "link": "string"
}

For real-time notification delivery, WebSockets can be used. When the user logs into the application, the frontend establishes a socket connection with the server. The server stores the active socket connection. Whenever a notification is created, the server first stores it in the database and then instantly pushes it to the connected client through the socket connection. This allows users to receive notifications without refreshing the page.MySQL can be used as the primary database because notification data is structured and relational. Redis can later be added for caching frequently accessed notifications and reducing database load.This design provides clean REST APIs, real-time notification delivery, scalable notification handling, and proper notification management.