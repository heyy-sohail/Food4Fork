const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        food: { type: mongoose.Schema.Types.ObjectId, ref: "Food", required: true },
        name: String,
        price: Number,
        quantity: { type: Number, required: true },
        healthScore: Number,
      },
    ],
    totalAmount: { type: Number, required: true },
    deliveryAddress: {
      street: String,
      city: String,
      pincode: String,
    },
    status: {
      type: String,
      enum: ["placed", "confirmed", "preparing", "out_for_delivery", "delivered", "cancelled"],
      default: "placed",
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "online"],
      default: "cod",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    deliveryTime: { type: Number, default: 40 },
    budgetUsed: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
