import jwt from "jsonwebtoken";
const generateToken = (data, exp = "24h") => {
  console.log(exp);

  const privateKey = process.env.SECRET_KEY;
  const algorithm = process.env.ALGORITHM;
  console.log(data);
  const token = jwt.sign(data, privateKey, {
    algorithm: algorithm,
    expiresIn: exp,
  });

  return token;
};

export default generateToken;
