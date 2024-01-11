const mongoose = require("mongoose");

//connection
mongoose.connect(process.env.mongo_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "react_native",
});

//schema:

const userSchema = new mongoose.Schema({
  email: String,
  name: { type: String },
  secret: { type: String },
});

const User = new mongoose.model("User", userSchema);

module.exports = {
  User,
};
