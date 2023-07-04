import registerationCustomerModel from "../../Model/registration/registerationCustomer.js";

const verifyUser = (data) => {
  const user = registerationCustomerModel.find({ _id: data });
  if (user !== null) {
    return true;
  } else {
    return false;
  }
};

export default verifyUser;
