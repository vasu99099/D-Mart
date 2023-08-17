import storeModel from "../../Model/store.js";

const getStore = async (req, res) => {
  // await storeModel.updateMany({ isDeleted: false });
  try {
    let store;
    if (req.params.storeId) {
      store = await storeModel
        .findById(req.params.storeId)
        .populate("state")
        .populate("city");
      if (store == null) {
        throw new Error("store not found");
      }
    } else {
      store = await storeModel
        .find({ isDeleted: false })
        .populate("state")
        .populate("city");
    }
    res.status(200).send(store);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export default getStore;
