import stateModel from "../../Model/state/state.js";

const deleteState = async (req, res) => {
  try {
    const state = await stateModel.findByIdAndRemove(req.params.stateId);
    if (state === null) {
      throw new Error("invalid state id");
    }
    res.status(200).json(state);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export default deleteState;
