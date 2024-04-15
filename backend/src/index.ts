import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import {
  createFriendRequest,
  createUser,
  getAllUsers,
  getFriendsByUserId,
  getIncomingFriendRequests,
  getOutgoingFriendRequests,
  getUserByUsername,
} from "./util/db_functions";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.SERVER_PORT || 3001;
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Origin",
      "X-Requested-With",
      "Accept",
      "x-client-key",
      "x-client-token",
      "x-client-secret",
      "Authorization",
    ],
    credentials: true,
  }),
);

app.get("/users", async (req: Request, res: Response) => {
  const users = await getAllUsers();
  res.status(200).send(users);
});

app.post(
  "/users",
  async (req: Request<{ username: string }>, res: Response) => {
    try {
      const { username } = req.body;
      const existingUser = await getUserByUsername(username);
      if (existingUser !== undefined) {
        return res.status(201).send({
          success: true,
          message: "Login successful",
          user: existingUser,
        });
      }

      const newUser = await createUser(username);

      return res.status(201).send({
        success: true,
        message: "User created successfully",
        user: newUser[0],
      });
    } catch (error) {
      // Send an error response if user creation fails
      res.status(500).send({
        success: false,
        message: "Error creating user",
        error: (error as Error).message,
      });
    }
  },
);

app.get("/friends/:userId", async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      res.status(400).send({
        success: false,
        message: "UserId not provided",
      });
    }
    const friends = await getFriendsByUserId(parseInt(userId));
    return res.status(201).send({
      success: true,
      message: "Success getting friends",
      friends: friends,
    });
  } catch (error) {
    // Send an error response if user creation fails
    res.status(500).send({
      success: false,
      message: "Error getting friends",
      error: (error as Error).message,
    });
  }
});

app.post(
  "/friends/request/create",
  async (
    req: Request<{ senderUserId: number; receiverUserId: number }>,
    res: Response,
  ) => {
    try {
      const { senderUserId } = req.body;
      const { receiverUserId } = req.body;

      const receiverUser = await createFriendRequest({
        senderUserId: senderUserId,
        receiverUserId: receiverUserId,
      });
      return res.status(201).send({
        success: true,
        message: "Friend request created",
        user: receiverUser,
      });
    } catch (error) {
      // Send an error response if user creation fails
      res.status(500).send({
        success: false,
        message: "Error creating friend request",
        error: (error as Error).message,
      });
    }
  },
);

app.get(
  "/friends/request/outgoing/:userId",
  async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      if (!userId) {
        res.status(400).send({
          success: false,
          message: "UserId not provided",
        });
      }
      const outgoingRequests = await getOutgoingFriendRequests(
        parseInt(userId),
      );
      return res.status(201).send(outgoingRequests);
    } catch (error) {
      // Send an error response if user creation fails
      res.status(500).send({
        success: false,
        message: "Error getting outgoing friend requests",
        error: (error as Error).message,
      });
    }
  },
);

app.get(
  "/friends/request/incoming/:userId",
  async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      if (!userId) {
        res.status(400).send({
          success: false,
          message: "UserId not provided",
        });
      }
      const incomingRequests = await getIncomingFriendRequests(
        parseInt(userId),
      );
      return res.status(200).send(incomingRequests);
    } catch (error) {
      // Send an error response if user creation fails
      res.status(500).send({
        success: false,
        message: "Error getting incoming friend requests",
        error: (error as Error).message,
      });
    }
  },
);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
