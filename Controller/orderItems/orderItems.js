import orderItemModel from "../../Model/orderItem.model.js";

export const getAllOrderItems = async (req, res) => {
  try {
    let orders;
    if (req.params.orderId) {
      orders = await orderItemModel
        .find({ order_id: req.params.orderId })
        .populate([
          {
            path: "order_id",
            populate: [
              { path: "Pickup" },
              { path: "address", populate: { path: "city state" } },
            ],
          },
          {
            path: "product_id",
            populate: { path: "Images" },
          },
          {
            path: "storeProduct_Id",
          },
        ]);
    } else {
      orders = await orderItemModel
        .find({
          user_id: req.body.user_id,
        })
        .populate([
          { path: "order_id", populate: { path: "address" } },
          {
            path: "product_id",
            populate: { path: "Images" },
          },
          {
            path: "storeProduct_Id",
          },
        ])
        .sort("-createdAt");
    }

    res.status(200).json(orders);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
