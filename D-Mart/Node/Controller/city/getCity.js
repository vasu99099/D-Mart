import cityModel from "../../Model/city/city.js";

const getCity = async (req, res) => {
  try {
    let city;
    if (req.params.cityId) {
      city = await cityModel.findById(req.params.cityId);
      if(city==null) {
        throw new Error('city not found')
      }
    } else {
      city = await cityModel.find();
    }
    res.status(200).send(city);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export default getCity;
