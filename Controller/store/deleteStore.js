import storeModel from "../../Model/store.js";

const deleteStore = async (req, res) => {
  try {
    const store = await storeModel.findByIdAndUpdate(req.params.storeId, {
      isDeleted: true,
    });
    if (store === null) {
      throw new Error("invalid Store id");
    }
    res.status(200).json({message:"Store Deleted successfully"});
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export default deleteStore;
