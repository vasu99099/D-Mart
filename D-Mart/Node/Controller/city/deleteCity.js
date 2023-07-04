import cityModel from "../../Model/city/city.js";

const deleteCity = async (req, res) => {
  try {
    const city = await cityModel.findByIdAndRemove(req.params.cityId);
    if (city === null) {
      throw new Error("invalid city id");
    }
    res.status(200).json(city);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export default deleteCity;
