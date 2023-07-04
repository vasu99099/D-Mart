import storeModel from "../../Model/store/store.js";

const getStore = async (req, res) => {
  console.log("hello user");

  try {
    let store;
    if (req.params.storeId) {
      store = await storeModel.findById(req.params.storeId);
      if (store == null) {
        throw new Error("store not found");
      }
    } else {
      store = await storeModel.find().populate('state').populate('city')
    }
    res.status(200).send(store);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export default getStore;
