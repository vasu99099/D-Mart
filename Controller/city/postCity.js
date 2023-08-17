import cityModel from "../../Model/city.js";

const postCity = async (req, res) => {
  try {
    const city = await new cityModel(req.body);
    await city.save();
    res.status(200).send(city);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export default postCity;
