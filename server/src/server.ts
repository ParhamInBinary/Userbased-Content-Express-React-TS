import mongoose from "mongoose";
import { app } from "./app";

async function main() {
  const password = 'Av6YaDXK7RH9QcFh';
  
  await mongoose.connect(
    `mongodb+srv://Pameli:${password}@express-user-api.7dbfca0.mongodb.net/test`
    // "mongodb://127.0.0.1:27017/WallOfPosts" FOR LOCALHOST
  );
  console.log("Connected to Database");

  app.listen(3000, () => {
    console.log("Server is running: http://localhost:3000");
  });
}

main().catch(console.error);
