# Stage 1
## Answer

# Notification System Design

The notification system should support:

- fetching notifications
- creating notifications
- marking notifications as read
- deleting notifications
- real-time notification delivery

---

# API Design

## Fetch Notifications

```http
GET /api/notifications
```

### Response

```json
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
```

---

## Create Notification

```http
POST /api/notifications
```

### Request Body

```json
{
  "userId": "user_1",
  "title": "Placement Update",
  "message": "Microsoft hiring drive",
  "link": "/placements/microsoft"
}
```

### Response

```json
{
  "success": true,
  "message": "Notification created"
}
```

---

## Mark Notification as Read

```http
PATCH /api/notifications/:id/read
```

### Response

```json
{
  "success": true
}
```

---

## Delete Notification

```http
DELETE /api/notifications/:id
```

### Response

```json
{
  "success": true
}
```

---

# Notification Schema

```json
{
  "id": "string",
  "userId": "string",
  "title": "string",
  "message": "string",
  "isRead": "boolean",
  "createdAt": "timestamp",
  "link": "string"
}
```

---

# Real-Time Notification Design

I would use WebSockets for real-time notifications.

Flow:
1. User logs into the application.
2. Frontend establishes socket connection.
3. Server stores active socket connection.
4. Whenever a notification is created:
   - save notification in database
   - instantly send notification through socket
5. User receives notification without refreshing the page.

---

# Database Choice

I would use MySQL because notification data is structured and relational.

Later Redis can be added for caching frequently accessed notifications and reducing database load.

---

# Conclusion

This design provides:
- clean REST APIs
- real-time notification delivery
- scalable notification handling
- proper notification management