import PickupPointModel from "../../Model/PickupPoint.js";
import adminUserModel from "../../Model/adminUser.model.js";
import { bcryptStr } from "../authentication/bcrypt.js";
import { sendMail } from "../authentication/emailSend.js";
import { storeEmailTemplete } from "../emailTemplete/storeregistration.Templete.js";

export const getPickupPoint = async (req, res) => {
  try {
    // set start and limit of data for pagination

    let start = parseInt(req.query.start) || 0;
    let limit = req.query.limit || 0;

    // get pickup point of particular store
    if (req.params.store_id) {
      const pickup = await PickupPointModel.find({
        store_id: req.params.store_id,
      })
        .populate("store_id")
        .sort("-createdAt");
      res.status(200).json(pickup);
    } else {
      // get all pickup point by single store and  all store and filter them
      const query = { isDeleted: false };
      let no_of_record = 0;

      // get store's pickup point
      if (req.body.store_id) {
        query.store_id = req.body.store_id;
      }
      if (req.body.pickup_id) {
        query._id = req.body.pickup_id;
        delete query.store_id;
      }

      // get particular pickup point
      if (req.params.pickUpId) {
        query._id = req.params.pickUpId;
      }
      // search by pickup point name
      if (req.query.text) {
        query.name = new RegExp(req.query.text, "i");
      }
      if (start === 0) {
        // count total nomber of records in the database
        no_of_record = await PickupPointModel.find(query).count();
      }
      const pickup = await PickupPointModel.find(query)
        .populate({ path: "store_id", populate: "city state" })
        .skip(start)
        .limit(limit)
        .sort("-updatedAt");

      res.status(200).json({ pickup, no_of_record });
    }
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
export const postPickupPoint = async (req, res) => {
  try {
    const pickup = await new PickupPointModel(req.body);
    await pickup.save();

    req.body.Role = "64c3accf390dc7f6afeee333";
    req.body.pickup_id = pickup._id;
    // create password and bcrypt password
    const password =
      "TV" + req.body.name.slice(0, 4) + "@$" + req.body.Phone.slice(6);

    req.body.Password = await bcryptStr(password);

    // save user information
    const adminUser = await new adminUserModel(req.body);
    await adminUser.save();

    // send mail after create user as pickup point admin
    const emailTemplete = storeEmailTemplete(req.body.Email, password);
    sendMail(req.body.Email, "credentials Details", emailTemplete);

    res.status(200).send(pickup);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
export const updatePickUpPoint = async (req, res) => {
  try {
    const pickup = await PickupPointModel.findOneAndUpdate(
      { store_id: req.body.store_id, _id: req.params.pickup_id },
      req.body,
      { runValidators: true, new: true }
    );
    if (pickup === null) {
      throw new Error("invalid addreess id");
    }
    res.status(200).json(pickup);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export const deletePickUpPoint = async (req, res) => {
  try {
    // soft delete
    const pickup = await PickupPointModel.findByIdAndUpdate(
      req.params.pickup_id,
      { isDeleted: true }
    );
    if (pickup === null) {
      throw new Error("invalid pickup id");
    }
    res.status(200).json(pickup);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
