import orderItemModel from "../../Model/orderItem.model.js";

export const getAllOrderItems = async (req, res) => {
  try {
    // req.body.user_id = "649919796981f472ac944aa7";
    const orders = await orderItemModel
      .find({
        user_id: req.body.user_id,
      })
      .populate([
        { path: "order_id" },
        {
          path: "product_id",
          populate: { path: "Images" },
        },
      ]);
    // const orders = await orderItemModel.aggregate([
    //   {
    //     $group: {
    //       _id: "$order_id",
    //       order: { $push: "$$ROOT" },
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "orders",
    //       localField: "_id",
    //       foreignField: "_id",
    //       as: "orderDeatils",
    //     },
    //   },
    //   {$unwind:{ path: "$order" }},
    //   {
    //     $lookup: {
    //       from: "Product",
    //       localField: "order.product_id",
    //       foreignField: "_id",
    //       as: "product",
    //     },
    //   },
    // ]);
    res.status(200).json(orders);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
