import addressModel from "../../Model/address.js";

export const getAddress = async (req, res) => {
  try {
    const address = await addressModel
      .find({ user_id: req.body.user_id })
      .populate("city state");
    res.status(200).json(address);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export const postAddress = async (req, res) => {
  try {
    const address = await new addressModel(req.body);
    await address.save();
    res.status(200).send(address);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const addreess = await addressModel.findOneAndUpdate(
      { user_id: req.body.user_id, _id: req.params.addressId },
      req.body,
      { runValidators: true, new: true }
    );

    if (addreess === null) {
      throw new Error("invalid addreess id");
    }
    res.status(200).json(addreess);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const address = await addressModel.findByIdAndRemove(req.params.addressId);
    if (address === null) {
      throw new Error("invalid brand id");
    }
    res.status(200).json(address);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
