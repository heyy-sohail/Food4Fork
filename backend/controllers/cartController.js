const User = require("../models/User");

// @GET /api/cart
const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("cart.food");
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @POST /api/cart/add
const addToCart = async (req, res) => {
  try {
    const { foodId, quantity = 1 } = req.body;
    const user = await User.findById(req.user._id);
    const existingIndex = user.cart.findIndex(
      (item) => item.food.toString() === foodId
    );
    if (existingIndex >= 0) {
      user.cart[existingIndex].quantity += quantity;
    } else {
      user.cart.push({ food: foodId, quantity });
    }
    await user.save();
    const updated = await User.findById(req.user._id).populate("cart.food");
    res.json(updated.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @PUT /api/cart/update
const updateCartItem = async (req, res) => {
  try {
    const { foodId, quantity } = req.body;
    const user = await User.findById(req.user._id);
    const idx = user.cart.findIndex((i) => i.food.toString() === foodId);
    if (idx === -1) return res.status(404).json({ message: "Item not in cart" });
    if (quantity <= 0) {
      user.cart.splice(idx, 1);
    } else {
      user.cart[idx].quantity = quantity;
    }
    await user.save();
    const updated = await User.findById(req.user._id).populate("cart.food");
    res.json(updated.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @DELETE /api/cart/remove/:foodId
const removeFromCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.cart = user.cart.filter((i) => i.food.toString() !== req.params.foodId);
    await user.save();
    const updated = await User.findById(req.user._id).populate("cart.food");
    res.json(updated.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @DELETE /api/cart/clear
const clearCart = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { cart: [] });
    res.json([]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
