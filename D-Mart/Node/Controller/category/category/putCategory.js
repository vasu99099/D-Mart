import categoryModel from "../../../Model/category/category.js";
import uploadFile from "../../s3Bucket/uploadFile.js";
const updateCategory = async (req, res) => {
  try {
    req.body.modifyBy = req.body.user_id;
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
    const category = await categoryModel.findByIdAndUpdate(
      req.params.categoryId,
      req.body,
      { runValidators: true, new: true }
    );
    if (category === null) {
      throw new Error("invalid brand id");
    }
    res.status(200).json(category);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export default updateCategory;
