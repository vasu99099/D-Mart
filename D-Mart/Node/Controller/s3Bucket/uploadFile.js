import { PutObjectCommand } from "@aws-sdk/client-s3";

import { S3Client } from "@aws-sdk/client-s3";
import mime from "mime";
const REGION = "ap-south-1";
const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: "AKIARHLQE363WCDGWFUM",
    secretAccessKey: "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",
  },
});
import ImageModel from "../../Model/Images/image.js";
const uploadFile = async (bucket, fname, BODY, title, alt) => {
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
