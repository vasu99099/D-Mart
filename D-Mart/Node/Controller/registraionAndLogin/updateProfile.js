import registerationCustomerModel from "../../Model/registration/registerationCustomer.js";

const updateuserProfile = async (req, res) => {
  try {
    if (req.pramas.customerId) {
      const customer = await registerationCustomerModel.findByIdAndUpdate(
        req.params.customerId,
        req.body,
        { runValidators: true, new: true }
      );
    } else {
      throw new Error("user not found");
    }
    res.status(200).send(customer);
  } catch (e) {
    res.status(401).send({
      message: e.message,
    });
  }
};

export default updateuserProfile;
