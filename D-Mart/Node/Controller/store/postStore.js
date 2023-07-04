import storeModel from "../../Model/store/store.js";

const postStore = async (req, res) => {
  try {
    const brand = await new storeModel(req.body);
    await brand.save();
    res.status(200).send(brand);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export default postStore;
