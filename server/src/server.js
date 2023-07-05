const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const db = require("./models");
const initData = require("./data");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync({ force: true }).then(() => initData());

app.get("/", (req, res) => {
  res.json({ message: `Server running on port ${PORT}` });
});

require("./routes/auth.routes")(app);
require("./routes/task.routes")(app);
require("./routes/user.routes")(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
