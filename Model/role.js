import mongoose from "mongoose";

const schema = mongoose.Schema;

const roleSchema = new schema(
  {
    role_name: {
      type: String,
      minlength: [
        3,
        "Minimum length of role should be greater than 3 character",
      ],
      required: [true, "role name is required"],
    },
    IsDeleted: {
      type: Boolean,
      default: false,
    },
    mainDashboard: {
      type: Boolean,
      default: false,
    },
    homepage: {
      type: Boolean,
      default: false,
    },
    store: {
      edit: {
        type: Boolean,
        default: false,
      },
      delete: {
        type: Boolean,
        default: false,
      },
    },
    product: {
      edit: {
        type: Boolean,
        default: false,
      },
      delete: {
        type: Boolean,
        default: false,
      },
    },
    state: {
      edit: {
        type: Boolean,
        default: false,
      },
      delete: {
        type: Boolean,
        default: false,
      },
    },
    city: {
      edit: {
        type: Boolean,
        default: false,
      },
      delete: {
        type: Boolean,
        default: false,
      },
    },
    brand: {
      edit: {
        type: Boolean,
        default: false,
      },
      delete: {
        type: Boolean,
        default: false,
      },
    },
    category: {
      edit: {
        type: Boolean,
        default: false,
      },
      delete: {
        type: Boolean,
        default: false,
      },
    },
    pickup: {
      edit: {
        type: Boolean,
        default: false,
      },
      delete: {
        type: Boolean,
        default: false,
      },
    },
    role: {
      edit: {
        type: Boolean,
        default: false,
      },
      delete: {
        type: Boolean,
        default: false,
      },
    },
    storeproduct: {
      edit: {
        type: Boolean,
        default: false,
      },
      delete: {
        type: Boolean,
        default: false,
      },
    },
    order: {
      edit: {
        type: Boolean,
        default: false,
      },
      delete: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true }
);

const roleModel = new mongoose.model("role", roleSchema);

export default roleModel;
