const { Router } = require("express");
const showRouter = Router();
// const { Show } = require("../models/Show");
// const { User } = require("../models/User");
const { User, Show } = require("../models");

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

showRouter.put("/:sid/watched", async (req, res) => {
  const theShowId = req.params.sid;
  const theShow = await Show.findByPk(theShowId);
  theShow.update(req.body);

  res.send(theShow);
});

showRouter.put("/:sid/updates", async (req, res) => {
  const theShowId = req.params.sid;
  const theShow = await Show.findByPk(theShowId);
  theShow.update(req.body);

  res.send(theShow);
});

showRouter.delete("/:sid", async (req, res) => {
  const showId = req.params.sid;
  const theShow = await Show.findByPk(showId);

  await Show.destroy({ where: { id: showId } });
  res.send(theShow);
});
//////////////
module.exports = showRouter;
