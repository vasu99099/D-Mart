import homePageModel from "../../Model/homePage.js";

const deleteHomePage = async (req, res) => {
  try {

    const home = await homePageModel.findByIdAndRemove(req.params.homepageId);
    if (home === null) {
      throw new Error("invalid homepage id");
    }
    res.status(200).json(home);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export default deleteHomePage;
