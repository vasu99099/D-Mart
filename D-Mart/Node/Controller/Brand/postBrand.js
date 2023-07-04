import brandModel from "../../Model/brand/brand.js";



const postBrand = async (req, res) => {
  try {
    const brand = await new brandModel(req.body);
    await brand.save();
    res.status(200).send(brand);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};







export default postBrand;