import ProductModel from "../../Model/product.js";
import uploadFile from "../s3Bucket/uploadFile.js";
const postProduct = async (req, res) => {
  try {
    if (req.files.Images.length == undefined) {
      req.files.Images = [req.files.Images];
    }
    if (req.body.Description) {
      req.body.Description = JSON.parse(req.body.Description);
    }
    // validate image format
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    req.files.Images.forEach((i) => {
      if (!allowedExtensions.exec(i.name)) {
        throw new Error("invalid file format");
      }
    });
    const imageList = req.files.Images.map(async (image, index) => {
      const uploadPath = "product/" + new Date().getMilliseconds() + image.name;
      const Image_id = await uploadFile(
        "dmart-4082",
        uploadPath,
        image.data,
        req.body.title,
        req.body.alt
      );
      return Image_id;
    });

    req.body.Images = await Promise.all(imageList);
    req.body.createdBy = req.body.user_id;
    const product = new ProductModel(req.body);
    await product.save();
    res.status(200).send(product);
  } catch (e) {
    res.status(403).json({ message: e.message });
  }
};

export default postProduct;
