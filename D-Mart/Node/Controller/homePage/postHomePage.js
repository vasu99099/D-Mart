import homePageModel from "../../Model/HomePage/HomePage.js";
import uploadFile from "../s3Bucket/uploadFile.js";
const postHomePage = async (req, res) => {
  try {
    const pathList = req.body.path.split(",");
    
    if (!req.files.length==undefined) {
        req.files.images = [req.files.images];
    }
    const imageList = (req.files.length!=undefined?req.files.images:[req.files.images]).map(async (image, index) => {
      const uploadPath =
        "homepage/" + new Date().getMilliseconds() + image.name;
      const Image_id = await uploadFile(
        "dmart-4082",
        uploadPath,
        image.data,
        req.body.title,
        req.body.alt
      );

      return { image_id: Image_id, path: pathList[index] };
    });

    req.body.images = await Promise.all(imageList);

    req.body.createdBy = req.body.user_id;

    console.log(req.body);
    const homePage = await new homePageModel(req.body);
    await homePage.save();
    res.status(200).send(homePage);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export default postHomePage;
