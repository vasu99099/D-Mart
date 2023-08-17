import stateModel from "../../Model/state.js";

const updateState = async (req, res) => {
  try {
    const state = await stateModel.findByIdAndUpdate(
      req.params.stateId,
      req.body,
      { runValidators: true, new: true }
    );
    if (state === null) {
      throw new Error("invalid state id");
    }
    res.status(200).json(state);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export default updateState;
