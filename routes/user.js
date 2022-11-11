const { Router } = require("express");
const userRouter = Router();

const { User } = require("../models/User");

userRouter.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.send(users);
});

///////////
module.exports = userRouter;
