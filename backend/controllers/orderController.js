const Order = require("../models/Order");
const Food = require("../models/Food");

// @POST /api/orders
const placeOrder = async (req, res) => {
  try {
    const { items, deliveryAddress, paymentMethod } = req.body;
    if (!items || items.length === 0)
      return res.status(400).json({ message: "No items in order" });

    // Calculate total from DB prices (never trust client)
    let totalAmount = 0;
    const orderItems = [];
    for (const item of items) {
      const food = await Food.findById(item.food);
      if (!food) return res.status(404).json({ message: `Food ${item.food} not found` });
      totalAmount += food.price * item.quantity;
      orderItems.push({
        food: food._id,
        name: food.name,
        price: food.price,
        quantity: item.quantity,
        healthScore: food.healthScore,
      });
    }

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalAmount,
      deliveryAddress,
      paymentMethod: paymentMethod || "cod",
      budgetUsed: totalAmount,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @GET /api/orders/myorders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.food", "name image category")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @GET /api/orders/:id
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.food");
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { placeOrder, getMyOrders, getOrderById };
