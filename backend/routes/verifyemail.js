const express = require("express");
const router = express.Router();
const { User } = require("../db/index");
const { getToken, getUser } = require("../auth/token");

router.get("/", async (req, res) => {
  console.log("from verifyemail");
  res.render("infoForm");
});

router.post("/", async (req, res) => {
  console.log(req.body);
  var user_already = await User.findOne({ email: req.body.email });
  if (user_already) res.status(409).json({ message: "User already exists" });
  else {
    const user = new User(req.body);
    await user.save();
    res.json({ message: "User created successfully" });
  }
});

router.post("/verifytoken", (req, res) => {
  const token = req.body.token;
  const jwtemail = getUser(token);

  // console.log(token, jwtemail);

  if (jwtemail == "invalid token") res.json({ message: "unverified" });
  else res.json({ message: "verified", email: jwtemail.user });
});

router.post("/getuser", async (req, res) => {
  console.log("in getuser");
  console.log(req.body);
  var user_exist = await User.findOne({ email: req.body.email });
  if (user_exist) res.json(user_exist);
  else res.status(409).json({ message: "User doesnt exist" });
});

module.exports = router;
