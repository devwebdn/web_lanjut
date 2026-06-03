import express from "express";

import {
  tambahuser,
  login,
} from "../controllers/user.controllers.js";

import {
  authenticateToken,
} from "../middleware/VerifyTokens.js";

const routerUser = express.Router();

routerUser.post("/", tambahuser);

routerUser.post("/login", login);

routerUser.get(
  "/dashboard",
  authenticateToken,
  (req, res) => {
    res.send(
      "Welcome to Dashboard"
    );
  }
);

export default routerUser;