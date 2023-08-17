import mongoose from "mongoose";

const schema = mongoose.Schema;

const userAdminSchema = new schema(
  {
    First_name: {
      type: String,
      minlength: [
        2,
        "Minimum length of name should be greater than 2 character",
      ],
    },
    Last_name: {
      type: String,
      minlength: [
        2,
        "Minimum length of name should be greater than 2 character",
      ],
    },
    Email: {
      type: String,
      validate: {
        validator: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        message: "please enter valid email",
      },
    },
    Password: {
      type: String,
      minlength: [
        5,
        "Minimum length of password should be greater than 5 character",
      ],
    },
    Phone: {
      type: String,
      unique: [true, "already registered"],
      validate: {
        validator: /^\d{10}$/,
        message: "please enter valid Phone number",
      },
    },
    Role: {
      type: schema.Types.ObjectId,
      ref: "role",
      required: true,
    },
    store_id: {
      type: schema.Types.ObjectId,
      ref: "store",
    },
    pickup_id: {
      type: schema.Types.ObjectId,
      ref: "pickupPoint",
    },
  },
  { timestamps: true }
);

const adminUserModel = new mongoose.model("adminUser", userAdminSchema);

export default adminUserModel;
