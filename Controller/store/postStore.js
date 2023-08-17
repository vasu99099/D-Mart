import adminUserModel from "../../Model/adminUser.model.js";
import storeModel from "../../Model/store.js";
import userModel from "../../Model/user.js";
import { bcryptStr } from "../authentication/bcrypt.js";
import { sendMail } from "../authentication/emailSend.js";
import { storeEmailTemplete } from "../emailTemplete/storeregistration.Templete.js";
import { createProfile } from "../registraionAndLogin/userProfile.js";

const postStore = async (req, res) => {
  try {
    req.body.createdBy = req.body.user_id;
    req.body.Role = "647824c4e03df92bf37f5bf3";
    const store = await new storeModel(req.body);
    await store.save();

    // create user for that store
    // const customer = await new userModel({ ...req.body, isLogined: true });
    // await customer.save();
    req.body.store_id = store._id;
    const password =
      "TV" + req.body.store_name.slice(0, 4) + "@$" + req.body.Phone.slice(6);

    req.body.Password = await bcryptStr(password);
    const adminUser = await new adminUserModel(req.body);
    await adminUser.save();
    const emailTemplete = storeEmailTemplete(req.body.Email, password);
    sendMail(req.body.Email, "credentials Details", emailTemplete);
    res.status(200).send(store);
  } catch (e) {

    res.status(404).json({ message: e.message });
  }
};

export default postStore;
