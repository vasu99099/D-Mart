import trackModel from "../../Model/track.model.js";

const postTrack = async (req, res) => {
  try {
    const track = await new trackModel(req.body);
    await track.save();
    res.status(200).send(track);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export const getTrack = async (req, res) => {
  try {
    let track;
    if (req.params.trackId) {
      track = await trackModel.findById(req.params.trackId);
      if (track == null) {
        throw new Error("track not found");
      }
    } else {
      track = await trackModel.find();
    }
    res.status(200).send(track);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export const updateTrack = async (req, res) => {
  try {
    const track = await trackModel.findByIdAndUpdate(
      req.params.trackId,
      req.body,
      { runValidators: true, new: true }
    );
    if (track === null) {
      throw new Error("invalid track id");
    }
    res.status(200).json(track);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export const deleteTrack = async (req, res) => {
  try {
    const track = await trackModel.findByIdAndRemove(req.params.trackId);
    if (track === null) {
      throw new Error("invalid track id");
    }
    res.status(200).json(track);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export default postTrack;
