const express = require("express");
const router = express.Router();

const { mentor } = require("../dBModel/db");

router.get("/", async (req, res) => {
  console.log("get all mentors");
  try {
    const data = await mentor.find();
    res.send(data);
  } catch (e) {
    console.log(e, "error");
    res.status(400).send(e);
  }
});

router.post("/create", async (req, res) => {
  console.log("mentor create Successfully");
  try {
    const data = await mentor.create({
      name: req.body.name,
      email: req.body.email,
      expertise: req.body.expertise,
      studentsAssigned: req.body.studentsAssigned,
    });
    res.send(data);
  } catch (e) {
    console.log(e, "error");
    res.status(400).send("Error");
  }
});

router.get("/:id", async (req, res) => {
  console.log("show all students for particular mentor");
  try {
    const ment = await mentor
      .findById(req.params.id)
      .populate("studentsAssigned", "name");
    res.send(ment);
  } catch (e) {
    console.log(e, "error");
    res.status(500).send("error in for 1 mentor get all students");
  }
});
module.exports = router;
