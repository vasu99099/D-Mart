import bcrypt from "bcrypt";

/**
 *This function encrypt data using hashing algorithm
 * @param str - This function take a string type value as parameter
 * @returns - This function return encrypted data
 */
export const bcryptStr = async (str) => {
  const data = await bcrypt.hash(str, 10);
  return data;
};

/**
 *This function verify or compare data using hashing algorithm
 * @param str - This function take two parameter (plain stringvalue ,hashed stringvalue) as parameter
 * @returns - This function return boolean value if data is correct then return true else return false
 */
export const verifyBcrypt = async (str, hash) => {
  try {
    console.log("OTpBcrypt");
    console.log(hash,str)
    const result = await bcrypt.compare(str, hash);
    console.log(result, "r");
    return result;
  } catch (e) {
    return false;
  }
};
