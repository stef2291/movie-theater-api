const { Router } = require("express");
const showRouter = Router();
// const { Show } = require("../models/Show");
// const { User } = require("../models/User");
const { User, Show } = require("../models");

const { body, validationResult } = require("express-validator");

/////////

showRouter.get("/", async (req, res) => {
  const shows = await Show.findAll();
  res.status(200).send({ shows });
}); //checked

showRouter.get("/:uid", async (req, res) => {
  const show = await Show.findByPk(req.params.uid);
  res.status(200).send({ show });
}); //checked

showRouter.get("/genres/:genre", async (req, res) => {
  const g = req.params.genre;
  console.log(g);
  const selectedGenre = await Show.findAll({ where: { genre: g } });

  res.status(200).send({ selectedGenre });
}); //checked

showRouter.put("/:sid/watched", body("rating").isInt(), async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() }); // server side validation isInt
  }

  const theShowId = req.params.sid;
  const theShow = await Show.findByPk(theShowId);
  theShow.update(req.body);

  res.status(200).send({ theShow });
});

showRouter.put(
  "/:sid/updates",
  body("status").isLength({ min: 5, max: 25 }),
  async (req, res) => {
    /////error handling
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() }); // server side validation nim/max
    }

    const theShowId = req.params.sid;
    const theShow = await Show.findByPk(theShowId);

    theShow.update(req.body);
    //   res.send(theShow);
    res.status(200).send({ theShow });
  }
);

showRouter.delete("/:sid", async (req, res) => {
  const showId = req.params.sid;
  const theShow = await Show.findByPk(showId);

  await Show.destroy({ where: { id: showId } });
  res.status(200).send({ theShow });
});
//////////////
module.exports = showRouter;
