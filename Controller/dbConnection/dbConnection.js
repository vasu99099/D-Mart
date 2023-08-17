import mongoose from "mongoose";
const dbConnect = () => {
  try {
    mongoose
      .connect(process.env.Mongo_CONNECTION)
      .then(() => console.log("Databse connection successful"));
  } catch (e) {
    console.log(e);
  }
};

export default dbConnect;
