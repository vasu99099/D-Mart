import stateModel from "../../Model/state/state.js";

const getState = async (req, res) => {
  try {
    let state;
    if (req.params.stateId) {
        state = await stateModel.findById(req.params.stateId);
      if(state==null) {
        throw new Error('state not found')
      }
    } else {
        state = await stateModel.find();
    }
    res.status(200).send(state);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export default getState;
