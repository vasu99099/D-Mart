import registerationCustomerModel from "../../Model/registration/registerationCustomer.js";
import verifyToken from "../Authentication/verifyToken.js";
import generateToken from "../Authentication/generateToken.js";
import joi from "joi";

const registerCustomer = async (req, res) => {
  try {
    if (req.cookies.OTP === undefined) {
      throw new Error("OTP time Out");
    } else {
      const sendOTP = verifyToken(req.cookies.OTP);
      const recieveOTP = req.body.OTP;
      if (recieveOTP == parseInt(sendOTP.OTP)) {
        console.log(recieveOTP, parseInt(sendOTP.OTP));
        const exist = await registerationCustomerModel.find({
          Phone: parseInt(sendOTP.Phone),
        });
        let cookievalue;
        if (exist.length == 0) {
          const customer = await new registerationCustomerModel({
            Phone: parseInt(sendOTP.Phone),
            preferStore: sendOTP.store_id,
          });
          const data = await customer.save();
          cookievalue = data._id;
        } else {
          cookievalue = exist[0]._id;
        }

        res.cookie("user_id", generateToken({ user_id:cookievalue }, "2h"), {
          maxAge: 31536000000,
          httpOnly: true,
        });
        res.status(200).json({ message: "signed in successfully" });
      } else {
        res.status(401).send({ message: "OTP invalid" });
      }
    }
    //   if (req.body.Phone === undefined) {
    //     throw new Error("undefined value for phone Number");
    //   }
    //   if (!MobileNumberValidator({ Phone: req.body.Phone.toString() })) {
    //     throw new Error("invalid mobile number");
    //   } else {
    //     let customer, data;
    //     req.body.OTP = await sendSMSOTP();
    //     const exist = await registerationCustomerModel.find({
    //       Phone: req.body.Phone,
    //     });
    //     if (exist.length > 0) {
    //       data = await registerationCustomerModel.findOneAndUpdate(
    //         { Phone: req.body.Phone },
    //         { OTP: req.body.OTP },
    //         { new: true }
    //       );
    //     } else {
    //       customer = await new registerationCustomerModel(req.body);
    //       data = await customer.save();
    //     }
    //     res.status(200).send(data);
    //   }
  } catch (e) {
    res.status(401).send({
      message: e.message,
    });
  }
};

export default registerCustomer;
