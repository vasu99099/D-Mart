import { request } from "express";
import homePageModel from "../../Model/homePage.js";
import uploadFile from "../s3Bucket/uploadFile.js";
import mongoose from "mongoose";

const updateHomePage = async (req, res) => {
  

  try {
    const pathList = req.body.path;
    let imageList = [];
    if (req.files) {
      if (req.files.images.length === undefined) {
        req.files.images = [req.files.images];
      }
      imageList = req.files.images.map(async (image, index) => {
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
    }
    const imagesTmp = await Promise.all(imageList);
    if (req.body.images) {
      const tmpImage = [];

      req.body.images.map((imgId, index) => {
        tmpImage.push({
          image_id: new mongoose.Types.ObjectId(imgId),
          path: pathList[index],
        });
      });
      req.body.images = [...imagesTmp, ...tmpImage];
    }



    const homePage = await homePageModel.findByIdAndUpdate(
      req.params.homepageId,
      req.body
    );
    res.status(200).send(homePage);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export default updateHomePage;
