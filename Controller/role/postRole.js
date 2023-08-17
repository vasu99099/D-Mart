import roleModel from "../../Model/role.js";

const postRole = async (req, res) => {
  try {
    const role = await new roleModel(req.body);
    await role.save();
    res.status(200).send(role);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export default postRole;
