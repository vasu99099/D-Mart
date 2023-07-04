import storeModel from "../../Model/store/store.js";

const deleteStore = async (req, res) => {
  try {
    const store = await storeModel.findByIdAndRemove(req.params.storeId);
    if (store === null) {
      throw new Error("invalid Store id");
    }
    res.status(200).json(store);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export default deleteStore;
