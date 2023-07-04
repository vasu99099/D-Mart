import categoryModel from "../../../Model/category/category.js";
import uploadFile from "../../s3Bucket/uploadFile.js";
const postCategory = async (req, res) => {
  try {
    if (req.files) {
      const image = req.files.image;
      const uploadPath =
        "category/" + new Date().getMilliseconds() + image.name;
      const Image_id = await uploadFile(
        "dmart-4082",
        uploadPath,
        image.data,
        req.body.title,
        req.body.alt
      );
      req.body.image = Image_id;
    }
    req.body.createdBy=req.body.user_id;
    console.log(req.body)
    const category = await new categoryModel(req.body);
    await category.save();
    res.status(200).send(category);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export default postCategory;
