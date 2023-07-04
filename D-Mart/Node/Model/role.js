import mongoose from "mongoose";

const schema = mongoose.Schema;

const roleSchema = new schema({
  role: {
    type: String,
    minlength: [3, "Minimum length of role should be greater than 3 character"],
    required: [true, "role name is required"],
  },
});

const roleModel = new mongoose.model("role", roleSchema);

export default roleModel;
