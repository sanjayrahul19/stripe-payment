import express from "express";
import { connectDB } from "./config/db";
import { router } from "./router/router";
import chalkRainbow from "chalk-rainbow";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

connectDB();

app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(chalkRainbow("Server is up and running"));
});
