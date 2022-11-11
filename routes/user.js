const { Router } = require("express");
const userRouter = Router();
// const { Show } = require("../models/Show");
// const { User } = require("../models/User"); Do not import from their own files when relationship is established in index!
const { User, Show } = require("../models");
///////////

userRouter.get("/", async (req, res) => {
  const users = await User.findAll();
  res.send(users);
}); // checked

userRouter.get("/:uid", async (req, res) => {
  const user = await User.findByPk(req.params.uid);
  res.status(200).send({ user }); //cannot send int back
}); // checked

userRouter.get("/:uid/shows", async (req, res) => {
  const user = await User.findByPk(req.params.uid); // why null?
  console.log(user.toJSON());
  const shows = await Show.findAll({ where: { userId: user.id } });
  res.status(200).send({ shows });
}); //checked

userRouter.put("/:uid/shows/:sid", async (req, res) => {
  const myUserId = req.params.uid;
  const showId = req.params.sid;

  console.log(myUserId, showId);

  const theShow = await Show.findByPk(showId);
  const theUser = await User.findByPk(myUserId);

  await theUser.addShow(theShow);
  console.log(req.body);
  res.status(200).send({ theUser });
}); //checked

///////////
module.exports = userRouter;
