const authController = require("./auth.controllers");
const notFoundController = (req, res) => {
  try {
    res.status(404).json({ message: "page not found" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};
module.exports = {
  authController,
  notFoundController,
};
