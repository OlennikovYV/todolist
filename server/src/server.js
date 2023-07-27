const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const router = require("./routes");
const sequelize = require("./models");
const initData = require("./data");

const PORT = process.env.PORT || 3001;
const app = express();

sequelize.sync({ force: true }).then(() => initData());

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "files")));

// Монтирование маршрутов
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
