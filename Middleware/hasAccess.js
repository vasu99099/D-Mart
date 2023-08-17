import { verifyToken } from "../Controller/authentication/jwt.Token.js";
import adminUserModel from "../Model/adminUser.model.js";
import roleModel from "../Model/role.js";

const hasAccess = async (req, res, next) => {
  const privateKey = process.env.SECRET_KEY;
  const algorithm = process.env.ALGORITHM;
  try {
    const token = req.cookies.user_id;
    if (token === undefined) {
      throw new Error("Token not found");
    }
    /* it's verify token and if it is valid then return decode data else return false */
    const decode = verifyToken(token);

    // if token expired
    if (decode === false) {
      throw new Error("session expired");
    } else {
      /** get user details from database using user_id which is decoded from token */
      const user = await adminUserModel.findOne({
        _id: decode.user_id,
      });

      // get base url from request and remove trailing slash
      const baseurl = req.baseUrl.slice(1);

      /* if user not found then throw error */
      if (user === null) {
        res.status(404).send({ message: "unauthorized user" });
      } else {
        /* based on base url  */
        switch (baseurl) {
          case "profile" || "role":
            // for access profile and role , user must be super admin
            if (user.Role.toString() === "647824f9e03df92bf37f5bf7") {
              req.body.user_id = user._id;
              next();
            }
            break;
          case "track":
            // tracking can be access by any user excluding customers
            if (user.Role.toString() !== "647824eee03df92bf37f5bf5") {
              req.body.user_id = user._id;
              next();
            }
            break;
          default:
            /* This function is responsible for 
            validating whether a user has the necessary permissions to access a
            specific route. It takes in the `user` object, which contains
            information about the user's role, and the `req` object, which
            contains information about the HTTP request being made.  It return Boolean*/

            const valid = await validateRoute(user, req);
            if (valid) {
              req.body.user_id = user._id;
              next();
            } else {
              throw new Error("invalid user");
            }
            break;
        }
      }
    }
  } catch (e) {
    if (e.message === "Token not found") {
      res.status(401).send({ message: e.message });
    } else {
      res.status(401).send({ message: "Invalid user" });
    }
  }
};

const validateRoute = async function (user, req) {
  try {
    let valid = false;
    /*  It is retrieving the permissions associated with the user's role. */
    const permissions = await roleModel.findOne({ _id: user.Role });
    /* it is extracting the base URL from the request object 
    (`req.baseUrl`) and removing the first character from it using the `slice()` method. */

    let baseUrl = req.baseUrl.slice(1);

    /* it is changing the value of `baseUrl` to "mainDashboard". This is likely done to handle a specific case where the base URL needs to be
    modified for some functionality or routing purposes. */
    if (baseUrl === "dashboard") {
      baseUrl = "mainDashboard";
    }

    if (permissions[baseUrl]) {
      /* It is checking if the HTTP request method is a
      GET request. If it is, then it checks the permissions associated with the base URL (`baseUrl`)
      and determines if the user has the necessary permissions to perform certain actions. */
      if (permissions[baseUrl] === true) {
        valid = true;
      } else if (req.method === "GET") {
        /**  method is GET then user must have either edit or delete permission */
        if (
          permissions[baseUrl].delete === true ||
          permissions[baseUrl].edit === true
        ) {
          valid = true;
        }
        // for which has only read permissions
        if (permissions[baseUrl] === true) {
          valid = true;
        }
      } else if (req.method === "PUT") {
        /**  method is PUT then user must have either edit permission */
        if (permissions[baseUrl].edit === true) {
          valid = true;
        }
      } else if (
        /** for any other method both permission is needed */
        permissions[baseUrl].edit === true &&
        permissions[baseUrl].delete === true
      ) {
        valid = true;
      }
    } else {
      valid = false;
    }

    /* if user role is admin then find thier store id and put it into request object */
    if (valid && user.Role.toString() === "647824c4e03df92bf37f5bf3") {
      req.body.store_id = user.store_id;
    }
    /* if user role is pickup then find thier store id and pickup point id and put it into request object */
    if (valid && user.Role.toString() === "64c3accf390dc7f6afeee333") {
      req.body.store_id = user.store_id;
      req.body.pickup_id = user.pickup_id;
    }
    return valid;
  } catch (e) {
    throw new Error(e.message);
  }
};
export default hasAccess;
