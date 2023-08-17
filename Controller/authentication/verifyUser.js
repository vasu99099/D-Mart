import userModel from "../../Model/user.js";

/**
 * This function verifies if a user exists in the userModel database by their ID.
 * @param data - The parameter `data` is expected to be an `_id` value of a user in the database.
 * @returns The function `verifyUser` returns a boolean value (`true` or `false`) based on whether a
 * user with the given `_id` exists in the `userModel` collection. If a user is found, the function
 * returns `true`, otherwise it returns `false`.
 */
const verifyUser = async (data) => {
  const user = await userModel.findOne({ _id: data });
  if (user !== null) {
    return true;
  } else {
    return false;
  }
};

export default verifyUser;
