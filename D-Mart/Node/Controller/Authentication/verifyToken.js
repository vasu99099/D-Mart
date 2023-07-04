import jwt from "jsonwebtoken";
const verifyToken = (token) => {
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

export default verifyToken;
