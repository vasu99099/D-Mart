import cartModel from "../../Model/cart.js";
import userModel from "../../Model/user.js";
import { verifyBcrypt } from "../Authentication/bcrypt.js";
import generateToken from "../Authentication/jwt.Token.js";

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
        let exist = await userModel.findOne({
          Phone: req.body.Phone,
        });
        console.log(exist)
        if (exist === null) {
          if (req.body.user_id) {
            console.log(req.body.user_id)
            exist = await userModel.findOneAndUpdate(
              { _id: req.body.user_id },
              {
                isLogined: true,
                Phone: req.body.Phone,
                preferStore: req.body.store_id,
              },
              { runValidators: true, new: true }
            );
          } else {
            console.log("here is")

            const customer = await new userModel({
              Phone: req.body.Phone,
              preferStore: req.body.store_id,
              isLogined: true,
            });
            await customer.save();
            exist = customer;
          }
          cookievalue = exist._id;
        } else {
          if (req.body.user_id) {
            const product = await cartModel.updateMany(
              { user_id: req.body.user_id },
              { user_id: exist._id }
            );
          }
          await userModel.findByIdAndRemove(req.body.user_id);
          cookievalue = exist._id;
        }
        res.cookie("user_id", generateToken({ user_id: cookievalue }, "2m"), {
          maxAge: 86400000,
          httpOnly: false,
        });
        res.clearCookie("OTP");
        console.log(exist, "exist");
        res.status(200).json(exist);
      } else {
        res.status(401).send({ message: "OTP invalid" });
      }
    }
  } catch (e) {
    console.log(e.message);

    res.status(401).send({
      message: e.message,
    });
  }
};

//update profile
export const updateuserProfile = async (req, res) => {
  try {
    console.log(req.body);
    let customer;
    if (req.body.Phone) {
      if (req.body.OTP) {
        const verify = await verifyBcrypt(req.body.OTP, req.cookies.OTP);
        if (verify) {
          console.log("verify");
          customer = await userModel.findByIdAndUpdate(
            req.body.user_id,
            req.body,
            { runValidators: true, new: true }
          );
        } else {
          res.status(401).send({ message: "OTP invalid" });
        }
      } else {
        throw new Error("Mobile number cannot be updated");
      }
    } else {
      customer = await userModel.findByIdAndUpdate(req.body.user_id, req.body, {
        runValidators: true,
        new: true,
      });
    }
    res.status(200).send(customer);
  } catch (e) {
    res.status(401).send({
      message: e.message,
    });
  }
};
export default signIn;
