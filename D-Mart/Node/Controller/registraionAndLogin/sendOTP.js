import sendSMSOTP from "../Authentication/sendSMS.js";
import generateToken from "../Authentication/generateToken.js";
import joi from "joi";
const MobileNumberValidator = (mobile) => {
  const schema = joi.object({
    Phone: joi
      .string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),
  });
  const { error, result } = schema.validate(mobile);
  if (error) {
    return false;
  } else {
    return true;
  }
};

const sendOTP = async (req, res) => {
  try {
    const Phone = req.body.Phone;
    const store_id = req.body.Store;
    console.log(store_id);
    if (Phone === undefined) {
      throw new Error("undefined value for phone Number");
    }
    if (!MobileNumberValidator({ Phone: Phone.toString() })) {
      throw new Error("invalid mobile number");
    } else {
      //change phone number here
      // const OTP = await sendSMSOTP(phone);
      const OTP = await sendSMSOTP(9909966437);
      const cookieval = generateToken({ OTP, Phone, store_id }, "2m");
      res.cookie("OTP", cookieval, { maxAge: 120000, httpOnly: true });
      res.status(200).send({ message: "OTP sent successfully" });
    }
  } catch (e) {
    res.status(401).send({
      message: e.message,
    });
  }
};
export default sendOTP;
