const Job = require("../models/Job");
const Profile = require("../models/Profile");
const JobUtils = require("../utils/jobUtils");

module.exports = {
  create(req, res) {
    return res.render("job");
  },
  save(req, res) {
    const jobs = Job.get();
    const jobId = jobs[jobs.length - 1].id || 0;

    Job.set({
      id: jobId + 1,
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      created_at: Date.now(),
    });

    return res.redirect("/");
  },
  show(req, res) {
    const { id } = req.params;

    const job = Job.get().find((job) => Number(job.id) === Number(id));

    if (!job) return res.send("Job not found");

    job.budget = JobUtils.calculateBudget(job, Profile.get()["value-hour"]);

    return res.render("job-edit", {
      job,
    });
  },
  update(req, res) {
    const { id } = req.params;

    const jobs = Job.get();

    const job = jobs.find((job) => Number(job.id) === Number(id));

    if (!job) return res.send("Job not found");

    const updatedJob = {
      ...job,
      name: req.body.name,
      "total-hours": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"],
    };

    Job.update(
      jobs.map((job) => {
        if (Number(id) === Number(job.id)) return updatedJob;
        return job;
      })
    );

    return res.redirect("/job/" + id);
  },
  delete(req, res) {
    const { id } = req.params;

    Job.delete(id);

    return res.redirect("/");
  },
};
