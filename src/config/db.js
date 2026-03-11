const mongoose = require("mongoose");

async function connectToDB() {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Database connected successfully!");
    })
    .catch((error) => {
      console.log("Database connection error", error);
    });
}
module.exports = connectToDB;
