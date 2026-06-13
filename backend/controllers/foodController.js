const Food = require("../models/Food");

// @GET /api/food - Get all foods with optional filters
const getFoods = async (req, res) => {
  try {
    const { category, search, minHealth, maxPrice, veg, sortBy } = req.query;
    let query = { isAvailable: true };

    if (category && category !== "All") query.category = category;
    if (veg === "true") query.isVeg = true;
    if (minHealth) query.healthScore = { $gte: Number(minHealth) };
    if (maxPrice) query.price = { $lte: Number(maxPrice) };
    if (search) query.$text = { $search: search };

    let foods = Food.find(query);

    if (sortBy === "price_asc") foods = foods.sort({ price: 1 });
    else if (sortBy === "price_desc") foods = foods.sort({ price: -1 });
    else if (sortBy === "health") foods = foods.sort({ healthScore: -1 });
    else if (sortBy === "rating") foods = foods.sort({ rating: -1 });
    else foods = foods.sort({ createdAt: -1 });

    const result = await foods;
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @GET /api/food/budget?amount=XXX - Get foods under budget
const getFoodsByBudget = async (req, res) => {
  try {
    const { amount } = req.query;
    if (!amount) return res.status(400).json({ message: "Budget amount required" });

    const foods = await Food.find({
      price: { $lte: Number(amount) },
      isAvailable: true,
    }).sort({ healthScore: -1, price: 1 });

    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @GET /api/food/categories
const getCategories = async (req, res) => {
  try {
    const categories = await Food.distinct("category");
    res.json(["All", ...categories]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @GET /api/food/:id
const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: "Food not found" });
    res.json(food);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getFoods, getFoodsByBudget, getCategories, getFoodById };
