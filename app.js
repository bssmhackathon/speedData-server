const express = require("express");
const { sequelize } = require("./models");
const app = express();

app.set("port", 3000);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결됨.");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const SpeedDataRouter = require("./routes/SpeedDataRouter");
app.use("/SpeedDataRouter", SpeedDataRouter);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});

app.get('/', (req, res) => {
  res.send('BSSMBALL API (PORT : 3000)');
});
