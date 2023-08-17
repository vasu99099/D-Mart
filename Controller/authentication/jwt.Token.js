import jwt from "jsonwebtoken";

/**
 *this function generate token from plain json object
 * @param data -it take a json object as parameter
 * @param  exp - it take a expiration time of token --by default it's value is 4 hours
 * @returns  it return Token using jwt
 */
const generateToken = (data, exp = "24h") => {
  const privateKey = process.env.SECRET_KEY;
  const algorithm = process.env.ALGORITHM;
  const token = jwt.sign(data, privateKey, {
    algorithm: algorithm,
    expiresIn: exp,
  });
  return token;
};

/**
 * This function verify token
 * @param {string} token
 * @returns {boolean || json Object} -this function return decode data if token is valid otherwise return false
 */
export const verifyToken = (token) => {
  const privateKey = process.env.SECRET_KEY;
  const algorithm = process.env.ALGORITHM;
  try {
    const decode = jwt.verify(token, privateKey, {
      algorithm: algorithm,
    });
    return decode;
  } catch (e) {
    return false;
  }
};

export default generateToken;
