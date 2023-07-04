import brandModel from "../../Model/brand/brand.js";

const updateBrand = async (req, res) => {
  try {
    
    const brand = await brandModel.findByIdAndUpdate(
      req.params.brandId,
      req.body,
      { runValidators: true, new: true }
    );
    if (brand === null) {
        throw new Error("invalid brand id");
      }
    res.status(200).json(brand);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export default updateBrand;
