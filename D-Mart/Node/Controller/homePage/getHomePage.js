
import homePageModel from "../../Model/HomePage/HomePage.js";
const getHomepage = async (req, res) => {
  try {
   const  homePage = await homePageModel.find().populate("images.image_id").sort({order:1});
    res.status(200).send(homePage);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export default getHomepage;
