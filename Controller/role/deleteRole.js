import roleModel from "../../Model/role.js";

const deleteRole = async (req, res) => {
  try {
    const role = await roleModel.findByIdAndUpdate(req.params.roleId, {
      IsDeleted: true,
    });
    if (role === null) {
      throw new Error("invalid role id");
    }
    res.status(200).json(role);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export default deleteRole;
