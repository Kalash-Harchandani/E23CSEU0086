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

# Stage 2

## Answer

I would use MySQL for the notification system because the data is structured and relational.
The system mainly needs two entities:
- users
- notifications
A user can have multiple notifications, so the notifications table will contain a userId field acting as a foreign key.

Each notification would contain fields like:
- id
- userId
- title
- message
- isRead
- createdAt
- link

The isRead field helps in tracking unread notifications for users.

To improve query performance, I would add indexes on:
- userId
- createdAt
- isRead

These indexes would help in quickly fetching notifications for a user, sorting latest notifications and filtering unread notifications efficiently
For scalability, notifications should be fetched using pagination instead of loading everything at once.
Example:
GET /api/notifications?page=1&limit=10

Later Redis can also be introduced for caching recent notifications and reducing load on MySQL.
Old notifications can be archived or deleted periodically to keep the database lightweight and efficient.
Overall, this design keeps the system simple, scalable and easy to maintain.


# Stage 3
## Answer

If the notification table becomes very large, fetching notifications without optimization can become slow because the database may scan a huge amount of data. It can become expensive when millions of notifications exist.

To optimize performance, I would first add indexing on:
- userId
- createdAt
- isRead

This helps the database quickly locate required notifications instead of scanning the entire table.Database partitioning can also be introduced based on creation date to improve performance for very large datasets.

I would also avoid selecting unnecessary columns and only fetch fields required by the frontend.

Overall, indexing, pagination, partitioning together can significantly improve performance for large-scale notification systems.


# Stage 4
## Answer

To scale the notification system, both vertical scaling and horizontal scaling can be used, but I would prefer horizontal scaling for a large-scale system.

Vertical scaling means increasing server resources such as RAM, CPU.This works initially but has hardware limitations and becomes expensive after a point.Horizontal scaling is more suitable because multiple backend servers can be added as traffic increases.

A load balancer can distribute requests evenly across servers so no single server becomes overloaded.

For real-time notifications, multiple WebSocket servers can also run behind the load balancer.

I would also use Redis caching for recent notifications, unread notifications and frequently accessed data
This reduces repeated database queries and improves response time significantly.

Overall, horizontal scaling combined with load balancing and Redis caching provides better scalability and reliability for a notification system with very high traffic.

# Stage 5
## Answer

If a very large number of notifications need to be sent, I would use asynchronous processing with queues like RabbitMQ or Kafka.

Notifications would first enter the queue, and worker services would process them separately.

I have not implemented these technologies yet personally, but I understand how they fit into scalable systems for handling traffic spikes, reducing server load and improving reliability.