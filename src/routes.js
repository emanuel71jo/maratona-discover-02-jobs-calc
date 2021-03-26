const express = require("express");
const routes = express.Router();

const views = __dirname + "/views/";

const profile = {
  name: "João Emanuel",
  avatar: "https://avatars.githubusercontent.com/u/38570356?v=4",
  "monthly-budget": 3000,
  "days-per-week": 5,
  "hours-per-day": 5,
  "vacation-per-year": 4,
};

routes.get("/", (_, res) => res.render(views + "index"));
routes.get("/job", (_, res) => res.render(views + "job"));
routes.get("/job/edit", (_, res) => res.render(views + "job-edit"));
routes.get("/profile", (_, res) => res.render(views + "profile", { profile }));

module.exports = routes;
