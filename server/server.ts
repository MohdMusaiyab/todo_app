import express from "express";
import userRoutes from "./routes/user";
import taskRoutes from "./routes/task";
import bodyParser from "body-parser";
import { dbConnect } from "./config/db";
import cors from "cors";


const app = express();

app.use(cors());
app.use(bodyParser.json());
//Routes for the User
app.use("/user", userRoutes);
//Routes for the Task
app.use("/task", taskRoutes);

// Call for Connecting to the Database
const main = async () => {
  await dbConnect();
};
main();
// Listening to the Port
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
