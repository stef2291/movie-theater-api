const { Router } = require("express");
const showRouter = Router();
const { Show } = require("../models/Show");
const { User } = require("../models/User");
/////////

showRouter.get("/", async (req, res) => {
  const shows = await Show.findAll();
  res.send(shows);
});

showRouter.get("/:uid", async (req, res) => {
  const show = await Show.findByPk(req.params.uid);
  res.send(show);
});

showRouter.get("/genres/:genre", async (req, res) => {
  const g = req.params.genre;
  console.log(g);
  const selectedGenre = await Show.findAll({ where: { genre: g } });

  res.send(selectedGenre);
});

showRouter.put("/:sid/watched", async (req, res) => {});
//////////////
module.exports = showRouter;
