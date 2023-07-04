import ProductModel from "../../Model/product/product.js";
import uploadFile from "../s3Bucket/uploadFile.js";
const postProduct = async (req, res) => {
  try {
    if (req.files.Images.length == undefined) {
      req.files.Images = [req.files.Images];
    }
    const imageList = req.files.Images.map(async (image, index) => {
      console.log(index);
      const uploadPath = "product/" + new Date().getMilliseconds() + image.name;
      const Image_id = await uploadFile(
        "dmart-4082",
        uploadPath,
        image.data,
        req.body.title,
        req.body.alt
      );
      console.log(Image_id);
      return Image_id;
    });

    req.body.Images = await Promise.all(imageList);
    const product = await new ProductModel(req.body);
    await product.save();
    res.status(200).send(product);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export default postProduct;
