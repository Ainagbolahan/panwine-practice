const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const ConnectToDB = async () => {
  try {
    console.log(process.env.DB_URL);
    await mongoose.connect(process.env.DB_URL);
    console.log("connected to DB");
  } catch (err) {
    console.log(err);
    console.log("Issues connecting to db " + err.messsage);
  }
};

const appStarter = (port) => {
  console.log("connected to db" + port);
  ConnectToDB();
};

module.exports = { ConnectToDB, appStarter };
module.exports.ConnectToDB = ConnectToDB;
