import adminUserModel from "../../Model/adminUser.model.js";
import cartModel from "../../Model/cart.js";
import userModel from "../../Model/user.js";
import { verifyBcrypt } from "../authentication/bcrypt.js";
import generateToken from "../authentication/jwt.Token.js";

// sign in or SignUp user
const signIn = async (req, res) => {
  try {
    let cookievalue;
    if (req.cookies.OTP === undefined) {
      throw new Error("OTP time Out");
    } else {
      const recieveOTP = req.body.OTP;
      const verify = await verifyBcrypt(recieveOTP, req.cookies.OTP);
      if (verify) {
        let exist = await userModel
          .findOne({
            Phone: req.body.Phone,
          })
          .populate({ path: "Role" });
        if (exist === null) {
          if (req.body.user_id) {
            exist = await userModel
              .findOneAndUpdate(
                { _id: req.body.user_id },
                {
                  isLogined: true,
                  Phone: req.body.Phone,
                  preferStore: req.body.store_id,
                },
                { runValidators: true, new: true }
              )
              .populate({ path: "Role" });
          } else {
            const customer = await new userModel({
              Phone: req.body.Phone,
              preferStore: req.body.store_id,
              isLogined: true,
            }).populate("Role");
            await customer.save();
            exist = customer;
          }
          cookievalue = exist._id;
        } else {
          if (req.body.user_id) {
            const product = await cartModel
              .updateMany({ user_id: req.body.user_id }, { user_id: exist._id })
              .populate("Role");
          }
          await userModel.findByIdAndRemove(req.body.user_id);
          cookievalue = exist._id;
        }
        res.cookie("user_id", generateToken({ user_id: cookievalue }, "2h"), {
          maxAge: 86400000,
          httpOnly: false,
        });
        res.clearCookie("OTP");
        res.status(200).json(exist);
      } else {
        res.status(401).send({ message: "OTP invalid" });
      }
    }
  } catch (e) {
    res.status(401).send({
      message: e.message,
    });
  }
};

//update profile
export const updateuserProfile = async (req, res) => {
  try {
    let customer;
    if (req.body.Phone) {
      if (req.body.OTP) {
        const verify = await verifyBcrypt(req.body.OTP, req.cookies.OTP);
        if (verify) {
          customer = await userModel
            .findByIdAndUpdate(req.body.user_id, req.body, {
              runValidators: true,
              new: true,
            })
            .populate("Role");
        } else {
          res.status(401).send({ message: "OTP invalid" });
        }
      } else {
        throw new Error("Mobile number cannot be updated");
      }
    } else {
      customer = await userModel
        .findByIdAndUpdate(req.body.user_id, req.body, {
          runValidators: true,
          new: true,
        })
        .populate("Role");
    }
    res.status(200).send(customer);
  } catch (e) {
    res.status(401).send({
      message: e.message,
    });
  }
};

export const createProfile = async (req, res) => {
  try {
    const customer = await new userModel({ ...req.body, isLogined: true });
    await customer.save();
    res.status(200).send(customer);
  } catch (e) {
    res.status(401).send({ message: e.message });
  }
};
export const getUsers = async (req, res) => {
  try {
    let customer;
    // get a user by user-id
    if (req.params.userId) {
      customer = await userModel.findById(req.params.userId).populate("Role");
      res.status(200).send(customer);
    } else {
      // get all user which is logined

      //initialize start and limit
      let start = req.query.start || 0;
      let limit = req.query.limit || 10;
      let no_of_records = 0;

      //make a filter option dynamically
      const filter = { isLogined: true };
      //if role in query then filter by role

      if (req.query.role !== "undefined" && req.query.role !== undefined) {
        const role = { $in: req.query.role.split(",") };
        filter.Role = role;
      }
      //filtering text of first_name,Last_name and Phone_number
      const text = [
        { First_name: { $regex: new RegExp(req.query.text, "i") } },
        { Last_name: { $regex: new RegExp(req.query.text, "i") } },
        { Phone: { $regex: new RegExp(req.query.text, "i") } },
      ];

      //start equal to zero then count number of records available in database for pagination
      if (start == 0) {
        no_of_records = await userModel.count(filter).or(text);
      }

      // find users from database

      customer = await userModel
        .find(filter)
        .or(text)
        .populate("Role")
        .skip(start)
        .limit(limit);

      // no_of_records += await adminUserModel.count();
      // const admins = await adminUserModel.find().populate("Role");
      res.status(200).send({ customer: customer, no_of_records });
    }
  } catch (e) {
    res.status(401).send({ message: e.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndRemove(req.params.userId);
    res.status(200).send("delete successfully");
  } catch (e) {
    res.status(401).send({ message: e.message });
  }
};

export default signIn;
