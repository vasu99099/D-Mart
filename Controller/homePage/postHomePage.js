import homePageModel from "../../Model/homePage.js";
import uploadFile from "../s3Bucket/uploadFile.js";
const postHomePage = async (req, res) => {
  try {
    const pathList = req.body.path;
    if (req.files.images.length === undefined) {
      req.files.images = [req.files.images];
    }
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    req.files.images.forEach((i) => {
      if (!allowedExtensions.exec(i.name)) {
        throw new Error("invalid file format");
      }
    });
    const imageList = req.files.images.map(async (image, index) => {
      const uploadPath =
        "homepage/" + new Date().getMilliseconds() + image.name;
      const Image_id = await uploadFile(
        "dmart-4082",
        uploadPath,
        image.data,
        "banner",
        "Homepage"
      );

      return { image_id: Image_id, path: pathList[index] };
    });

    req.body.images = await Promise.all(imageList);

    req.body.createdBy = req.body.user_id;

    if (!req.body.order) {
      const order = (await homePageModel.count()) + 1;
      req.body.order = order;
    }
    const homePage = await new homePageModel(req.body);
    await homePage.save();
    res.status(200).send(homePage);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export default postHomePage;
