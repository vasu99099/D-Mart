import categoryModel from "../../../Model/category.js";

async function expandCategory(categoryId) {
  const category = await categoryModel
    .find({ _id: categoryId })
    .populate("image");

  if (category != null) {
    const expandedCategories = await Promise.all(
      category.map(async (data) => {
        let children = await categoryModel.find({ parent: data._id });
        let expandedchildren;
        if (children != null) {
          expandedchildren = await Promise.all(
            children.map(async (child) => {
              return await expandCategory(child._id);
            })
          );
        }
        return {
          category: data,
          children: [].concat(...expandedchildren),
        };
      })
    );
    return expandedCategories[0];
  } else {
    throw new Error("Couldn't find category");
  }
}

const getFilteredCategory = async (req, res) => {

  try {
    let filteredCategory;
    if (req.params.categoryId) {
      filteredCategory = await expandCategory(req.params.categoryId);
      if (filteredCategory == null) {
        throw new Error("category not found");
      }
    } else {
      filteredCategory = await categoryModel.find({ parent: null });
      filteredCategory = await Promise.all(
        filteredCategory.map(async (category) => {
          return await expandCategory(category._id);
        })
      );
    }
    res.status(200).send(filteredCategory);
  } catch (e) {
    res.status(204).json({ message: e.message });
  }
};

export default getFilteredCategory;
