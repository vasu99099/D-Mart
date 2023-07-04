import stateModel from "../../Model/state/state.js";

const postState = async (req, res) => {
  try {
    const state = await new stateModel(req.body);
    await state.save();
    res.status(200).send(state);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export default postState;
