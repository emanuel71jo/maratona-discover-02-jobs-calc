const Job = require("../models/Job");
const Profile = require("../models/Profile");
const JobUtils = require("../utils/jobUtils");

module.exports = {
  index(req, res) {
    const profile = Profile.get();
    const jobs = Job.get();

    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length,
    };

    let freeHours = profile["hours-per-day"];

    const jobsUpdated = jobs.map((job) => {
      const remaining = JobUtils.remainingDays(job);
      const status = remaining <= 0 ? "done" : "progress";

      statusCount[status] += 1;
      if (status === "progress") freeHours -= Number(job["daily-hours"]);

      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hour"]),
      };
    });

    return res.render("index", {
      jobs: jobsUpdated,
      profile,
      statusCount,
      freeHours,
    });
  },
};
