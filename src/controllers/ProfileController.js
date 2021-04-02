const Profile = require("../models/Profile");

module.exports = {
  index(req, res) {
    return res.render("profile", { profile: Profile.get() });
  },
  update(req, res) {
    const data = req.body;

    const weeksPerYear = 52;

    const weekPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;

    const weekTotalHours = data["hours-per-day"] * data["days-per-week"];

    const monthlyTotalHours = weekTotalHours * weekPerMonth;

    data["value-hour"] = data["monthly-budget"] / monthlyTotalHours;

    Profile.update(data);

    return res.redirect("/profile");
  },
};
