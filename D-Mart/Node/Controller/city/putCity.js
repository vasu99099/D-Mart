import cityModel from "../../Model/city/city.js";

const updateCity = async (req, res) => {
  try {
    const city = await cityModel.findByIdAndUpdate(
      req.params.cityId,
      req.body,
      { runValidators: true, new: true }
    );
    if (state === null) {
      throw new Error("invalid city id");
    }
    res.status(200).json(city);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export default updateCity;
