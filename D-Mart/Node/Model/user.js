import mongoose from "mongoose";

const schema = mongoose.Schema;

const userSchema = new schema({
  First_name: {
    type: String,
    minlength: [3, "Minimum length of name should be greater than 3 character"],
  },
  Last_name: {
    type: String,
    minlength: [3, "Minimum length of name should be greater than 3 character"],
  },
  Email: {
    type: String,
    validate: {
      validator: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      message: "please enter valid email",
    },
  },

  // required: [true, "Phone Number is required"],
  Phone: {
    type: String,
    // unique: [true, "already registered"],
    validate: {
      validator: /^\d{10,12}$/,
      message: "please enter valid Phone number",
    },
  },
  Address: [
    {
      type: String,
    },
  ],
  Role: {
    type: schema.Types.ObjectId,
    ref: "role",
    required: true,
    default: "647824eee03df92bf37f5bf5",
  },
  preferStore: {
    type: schema.Types.ObjectId,
    ref: "store",
  },
  primaryAddress: {
    type: schema.Types.ObjectId,
    ref: "address",
  },
  isLogined: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const userModel = new mongoose.model("user", userSchema);

export default userModel;
