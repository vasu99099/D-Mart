import cityModel from "../../Model/city.js";

const getCity = async (req, res) => {
  try {
    let city;
    if (req.params.stateId) {
      city = await cityModel
        .find({ state_id: req.params.stateId, isDeleted: { $ne: true } })
        .populate("state_id");

      if (city == null) {
        throw new Error("city not found");
      }
    } else {
      city = await cityModel
        .find({ isDeleted: { $ne: true } })
        .populate("state_id");
    }
    res.status(200).send(city);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export default getCity;
