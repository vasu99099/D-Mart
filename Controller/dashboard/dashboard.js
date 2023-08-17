import orderModel from "../../Model/order.model.js";
import orderItemModel from "../../Model/orderItem.model.js";
import storeModel from "../../Model/store.js";
import userModel from "../../Model/user.js";

export const getSaleCustomer = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tommorow = new Date(today);
    tommorow.setDate(tommorow.getDate() + 1);

    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      1
    );

    let query_users_today = { createdAt: { $gte: today, $lt: tommorow } },
      query_users_monthly = {
        createdAt: { $gte: firstDayOfMonth, $lt: lastDayOfMonth },
      },
      query_aggregation_today = [],
      query_aggregation_month = [];

    if (req.body.store_id) {
      query_users_today.preferStore = req.body.store_id;
      query_users_monthly.preferStore = req.body.store_id;
      query_aggregation_today.push({
        $match: {
          Order_date: {
            $gte: today,
            $lt: tommorow,
          },
          store_id: req.body.store_id,
        },
      });
      query_aggregation_month.push({
        $match: {
          Order_date: {
            $gte: firstDayOfMonth,
            $lt: lastDayOfMonth,
          },
          store_id: req.body.store_id,
        },
      });
    } else {
      query_aggregation_today.push({
        $match: {
          Order_date: {
            $gte: today,
            $lt: tommorow,
          },
        },
      });
      query_aggregation_month.push({
        $match: {
          Order_date: {
            $gte: firstDayOfMonth,
            $lt: lastDayOfMonth,
          },
        },
      });
    }

    query_aggregation_today.push({
      $group: {
        _id: null,
        orders: { $sum: 1 },
        total: { $sum: "$Total_amount" },
      },
    });
    query_aggregation_month.push({
      $group: {
        _id: null,
        orders: { $sum: 1 },
        total: { $sum: "$Total_amount" },
      },
    });

    const todaySales = await orderModel.aggregate(query_aggregation_today);
    const MonthSales = await orderModel.aggregate(query_aggregation_month);


    const usersToday = await userModel.count(query_users_today);
    const usersMonthly = await userModel.count(query_users_monthly);

    res.status(200).send({
      TodaySale: todaySales.length > 0 ? todaySales[0].total : 0,
      TodayOrders: todaySales.length > 0 ? todaySales[0].orders : 0,
      MonthlySale: MonthSales.length > 0 ? MonthSales[0].total : 0,
      MonthlyOrders: MonthSales.length > 0 ? MonthSales[0].orders : 0,
      TodayUsers: usersToday,
      MonthlyUsers: usersMonthly,
    });
  } catch (e) {
    res.status(404).send({ message: e.message });
  }
};

export const getCategoryChartData = async (req, res) => {
  try {
    // req.body.store_id=new mongoose.Types.ObjectId("64b4e828e0c1acd3b89f6af4")
    const productAggregate = [];

    if (req.body.store_id) {
      productAggregate.push(
        {
          $lookup: {
            from: "storeproducts",
            localField: "storeProduct_Id",
            foreignField: "_id",
            as: "data",
          },
        },
        {
          $unwind: {
            path: "$data",
          },
        },
        {
          $match: {
            "data.store_id": req.body.store_id,
          },
        }
      );
    }

    productAggregate.push(
      {
        $group: {
          _id: "$product_id",
          total: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "result",
        },
      },
      {
        $unwind: "$result",
      },
      {
        $lookup: {
          from: "categories",
          localField: "result.Category_id",
          foreignField: "_id",
          as: "result.Category_id",
        },
      },
      {
        $unwind: "$result.Category_id",
      },
      {
        $project: { Category_id: 1, _id: 1, total: 1, "result.Category_id": 1 },
      },
      { $sort: { total: -1 } },
      { $limit: 5 }
    );
    const products = await orderItemModel.aggregate(productAggregate);

    /** get order type diffrence in Pick up and HOme delivery start */
    const ordersDifferenceAggregate = [];
    if (req.body.store_id) {
      ordersDifferenceAggregate.push({
        $match: {
          store_id: req.body.store_id,
        },
      });
    }
    ordersDifferenceAggregate.push({
      $group: {
        _id: "$OrderType",
        orders: { $sum: 1 },
      },
    });
    const ordersDifference = await orderModel.aggregate(
      ordersDifferenceAggregate
    );
    /** get order type diffrence in Pick up and HOme delivery end */

    // get data of orders of week

    const orderOfWeek = await getWeekSaleDiffrence(req, res);

    res.send({ products, ordersDifference, orderOfWeek });
  } catch (e) {
    console.log(e.message);
    res.send({ message: e.message });
  }
};

export const getStoreProgress = async (req, res) => {
  try {
    const storeViseSale = await orderModel.aggregate([
      {
        $group: {
          _id: "$store_id",
          orders: { $sum: 1 },
        },
      },
    ]);
    const store = await storeModel.find({}, { store_name: 1, _id: 1 });

    const storeList = [...store];
    storeList.forEach((store, index) => {
      const exist = storeViseSale.find(
        (s) => s._id.toString() === store._id.toString()
      );
      const tmp = {};
      tmp._id = store._id;
      tmp.store_name = store.store_name;
      tmp.no_of_order = 0;

      if (exist) {
        tmp.no_of_order = exist.orders;
      }
      storeList[index] = tmp;
    });
    res.status(200).send(storeList); //
  } catch (e) {
    res.status(404).send({ message: e.message });
  }
};

export const getWeekSaleDiffrence = async (req, res) => {
  try {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const startDay = new Date(currentDate);
    startDay.setDate(currentDate.getDate() - currentDate.getDay());

    let startDayIso = startDay.toISOString();
    const orderPerDayAggregate = [];
    
    if (req.body.store_id) {
      orderPerDayAggregate.push({
        $match: {
          Order_date: {
            $gte: new Date(startDayIso),
          },
          store_id: req.body.store_id,
        },
      });
    } else {
      orderPerDayAggregate.push({
        $match: {
          Order_date: {
            $gte: new Date(startDayIso),
          },
        },
      });
    }

    orderPerDayAggregate.push(
      {
        $group: {
          _id: {
            year: { $year: "$Order_date" },
            month: { $month: "$Order_date" },
            day: { $dayOfMonth: "$Order_date" },
            dayOfWeek: { $dayOfWeek: "$Order_date" },
          },
          totalOrders: { $sum: 1 },
          totalAmount: { $sum: "$Total_amount" },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
          "_id.day": 1,
        },
      }
    );
    const order = await orderModel.aggregate(orderPerDayAggregate);
    return (order);
  } catch (e) {
    throw new Error("Error aggregating");
  }
};
