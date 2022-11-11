const express = require("express");
const { db } = require("./db");
const showRouter = require("./routes/show");
const userRouter = require("./routes/user");
const app = express();

app.use(express.json());
app.use("/user", userRouter);
app.use("/show", showRouter);
///////////
app.listen(3000, async () => {
  await db.sync();
  console.log("Listening on port 3000");
});
