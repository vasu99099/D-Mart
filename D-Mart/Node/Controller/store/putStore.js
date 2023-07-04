import storeModel from "../../Model/store/store.js";

const updateStore = async (req, res) => {
  try {
    const store = await storeModel.findByIdAndUpdate(
      req.params.storeId,
      req.body,
      { runValidators: true, new: true }
    );
    if (store === null) {
      throw new Error("invalid store id");
    }
    res.status(200).json(store);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export default updateStore;
