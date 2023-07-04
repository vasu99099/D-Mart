import brandModel from "../../Model/brand/brand.js";

const getBrand = async (req, res) => {
  try {
    let brand;
    if (req.params.brandId) {
      brand = await brandModel.findById(req.params.brandId);
      if(brand==null) {
        throw new Error('Brand not found')
      }
    } else {
      brand = await brandModel.find();
    }
    res.status(200).send(brand);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export default getBrand;
