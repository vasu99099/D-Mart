import sendSMSOTP from "../authentication/sendSMS.js";
import joi from "joi";
import { bcryptStr } from "../authentication/bcrypt.js";
import adminUserModel from "../../Model/adminUser.model.js";

/** mobile number validation
 * @param mobile -take a mobile number as a string
 * @returns This function will return a boolean if valid then true else false
 */
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

// send OTP to user and store OTP in cookiesin encrypted form
const sendOTP = async (req, res) => {
  try {
    const Phone = req.body.Phone;
    const store_id = req.body.Store;
    if (Phone === undefined) {
      throw new Error("undefined value for phone Number");
    }
    if (!MobileNumberValidator({ Phone: Phone.toString() })) {
      throw new Error("invalid mobile number");
    } else {
      //change phone number here
      const checkUserIsnotAdmin = await adminUserModel.findOne({
        Phone: req.body.Phone,
      });
      if (checkUserIsnotAdmin === null) {
        // const OTP = await sendSMSOTP(phone);
        const OTP = await sendSMSOTP(9909966437);
        console.log(OTP);
        const cookieval = await bcryptStr(OTP);

        res.cookie("OTP", cookieval, { maxAge: 1200000, httpOnly: true });
        res.status(200).send({ message: "OTP sent successfully" });
      } else {
        res.status(404).send({
          message: "You can't create a account as admin Phone number",
        });
      }
    }
  } catch (e) {
    res.status(401).send({
      message: e.message,
    });
  }
};
export default sendOTP;
