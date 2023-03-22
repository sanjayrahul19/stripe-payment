const mongoose = require("mongoose");
import chalkRainbow from "chalk-rainbow";
const url = "mongodb://localhost/stripe-payment";
mongoose.set("strictQuery", true);

export const connectDB = async () => {
  try {
    const con = await mongoose.connect(url);
    console.log(chalkRainbow(`mongoDB connected:${con.connection.host}`));
  } catch (err) {
    console.log(err);
  }
};
