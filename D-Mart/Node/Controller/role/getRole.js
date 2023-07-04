import roleModel from "../../Model/role/role.js";

const getRole = async (req, res) => {
  try {
    let role;
    if (req.params.roleId) {
      role = await roleModel.findById(req.params.roleId);
      if(role==null) {
        throw new Error('role not found')
      }
    } else {
      role = await roleModel.find();
    }
    res.status(200).send(role);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export default getRole;
