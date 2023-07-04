import PickupPointModel from "../../Model/PickupPoint.js";

export const getPickupPoint = async (req, res) => {
  try {
    const pickup = await PickupPointModel.find({
      store_id: req.params.pickup_id,
    });
    res.status(200).json(pickup);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
export const postPickupPoint = async (req, res) => {
    try {
      console.log(req.body);

      const pickup = await new PickupPointModel(req.body);
      await pickup.save();
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
    const pickup = await PickupPointModel.findByIdAndRemove(
      req.params.pickup_id
    );
    if (pickup === null) {
      throw new Error("invalid brand id");
    }
    res.status(200).json(pickup);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
