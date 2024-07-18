import express, { json } from "express";
import { config } from "dotenv";
import morgan from "morgan";

import { connectDb } from "./db/connectDb.js";
import signupRoute from "./routes/signup.route.js";
import loginRoute from "./routes/login.route.js";
import notesRoute from "./routes/notes.route.js";

config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/signup", signupRoute);
app.use("/login", loginRoute);

app.use("/notes", notesRoute);

// app.get("/", () => console.log("hello"));

const connectDbAndStartServer = () => {
  try {
    connectDb();
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
connectDbAndStartServer();
