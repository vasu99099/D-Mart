import { PutObjectCommand } from "@aws-sdk/client-s3";

import { S3Client } from "@aws-sdk/client-s3";
import mime from "mime";
import ImageModel from "../../Model/image.js";
const REGION = "ap-south-1";

const uploadFile = async (bucket, fname, BODY, title, alt) => {

  const s3Client = new S3Client({
    region: REGION,
    credentials: {
      accessKeyId: process.env.ACCESSKEYID,
      secretAccessKey: process.env.SECRETACCESS_KEY,
    },
  });

  const type = mime.getType(fname);
  
  try {
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: fname,
      ContentType: type,
      Body: BODY,
    });
    await s3Client.send(command);

    const objUrl = `https://${bucket}.s3.ap-south-1.amazonaws.com/${fname}`;

    const image = await new ImageModel({ url: objUrl, title: title, alt: alt });
    const image_Id = await image.save();
    return image_Id._id;
  } catch (err) {
    console.log("Error", err);
  }
};

export default uploadFile;
