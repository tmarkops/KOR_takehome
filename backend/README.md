To start backend:

1. make sure Docker daemon is running
2. ```bash
      npm i
   ```
3. start the server: 
   ```bash
      npm run start-dev
   ```
4. start another terminal session for the next steps
5. give executable permission to the script file:
    ```bash
      chmod +x ./scripts/get_db_url.sh 
    ```
6. 
    ```bash
    npm run migrate up
    ```



While developing:

To create a migration:
```bash
    npm run migrate create [migration name]
 ```

To generate Kysely types based on current db schema
```bash
   npm run gen
```


API Documentation:

Endpoints
1. Get All Users
   - Endpoint: GET /users
   - Description: Fetches all users from the database.
   - Response: Returns an array of user objects.
2. Create User
   - Endpoint: POST /users
   - Description: Creates a new user with the provided username if it doesn't already exist.
   - Request Body: { "username": "exampleUsername" }
   - Response: Returns a success message along with the created user object.
3. Get Status Updates by User ID
   - Endpoint: GET /users/status/:userId
   - Description: Fetches status updates for a specific user.
   - Response: Returns an array of status update objects.
4. Update User Status
   - Endpoint: PUT /users/status
   - Description: Updates the status for a specific user and creates corresponding notifications.
   - Request Body: { "userId": 1, "status": "newStatus" }
   - Response: Returns a success message.
5. Get Friends by User ID
   - Endpoint: GET /friends/:userId
   - Description: Fetches friends for a specific user.
   - Response: Returns an array of friend objects.
6. Create Friend Request
   - Endpoint: POST /friends/request/create
   - Description: Creates a new friend request between two users.
   - Request Body: { "senderUserId": 1, "receiverUserId": 2 }
   - Response: Returns a success message along with the updated friend request object.
7. Respond to Friend Request
   - Endpoint: POST /friends/request/respond
   - Description: Responds to a friend request with either "accept" or "decline".
   - Request Body: { "senderUserId": 1, "receiverUserId": 2, "answer": "accept" }
   - Response: Returns the updated friend request object.
8. Get Outgoing Friend Requests
   - Endpoint: GET /friends/request/outgoing/:userId
   - Description: Fetches outgoing friend requests for a specific user.
   - Response: Returns an array of outgoing friend request objects.
9. Get Notifications by User ID
   - Endpoint: GET /notifications/:userId
   - Description: Fetches notifications for a specific user.
   - Response: Returns an array of notification objects.
10. Get Incoming Friend Requests
    - Endpoint: GET /friends/request/incoming/:userId
    - Description: Fetches incoming friend requests for a specific user.
    -Response: Returns an array of incoming friend request objects.