import ProductModel from "../../Model/product.js";
import uploadFile from "../s3Bucket/uploadFile.js";

const updateProduct = async (req, res) => {

  try {
    req.body.modifyBy = req.body.user_id;
    if (req.body.Description) {
      req.body.Description = JSON.parse(req.body.Description);
    }
    if (req.files) {
      if (req.files.Images.length == undefined) {
        req.files.Images = [req.files.Images];
      }
      const imageList = req.files.Images.map(async (image, index) => {
        const uploadPath =
          "product/" + new Date().getMilliseconds() + image.name;
        const Image_id = await uploadFile(
          "dmart-4082",
          uploadPath,
          image.data,
          req.body.title,
          req.body.alt
        );
        return Image_id;
      });

      const new_image = await Promise.all(imageList);
      let images;
      if (req.body.Images) {
        images = Array.isArray(req.body.Images)
          ? req.body.Images
          : [req.body.Images];
        if (req.body.titleImageschange === "true") {
          images.unshift(new_image[0]);
        } else {
          images = [...images, ...new_image];
        }
      } else {
        images = new_image;
      }
      req.body.Images = images;
    }

    const product = await ProductModel.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { runValidators: true, new: true }
    );
    if (product === null) {
      throw new Error("invalid product id");
    }
    res.status(200).json(product);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export default updateProduct;
