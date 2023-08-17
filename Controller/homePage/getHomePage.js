import homePageModel from "../../Model/homePage.js";
const getHomepage = async (req, res) => {
  try {
    let homePage;
    if (req.params.homepageId) {
      homePage = await homePageModel
        .findById(req.params.homepageId)
        .populate("images.image_id");
    } else {
      homePage = await homePageModel
        .find()
        .populate("images.image_id")
        .sort({ order: 1 });
    }
    if (homePage !== null) {
      res.status(200).send(homePage);
    } else {
      throw new Error("invalid home page id");
    }
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export default getHomepage;
