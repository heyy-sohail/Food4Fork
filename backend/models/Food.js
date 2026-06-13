const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        "Burgers",
        "Pizza",
        "Biryani",
        "Chinese",
        "South Indian",
        "Healthy",
        "Desserts",
        "Beverages",
        "Snacks",
        "Salads",
      ],
    },
    image: { type: String, required: true },
    healthScore: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    // Nutritional info
    calories: { type: Number, default: 0 },
    protein: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 },
    fat: { type: Number, default: 0 },
    isVeg: { type: Boolean, default: true },
    isAvailable: { type: Boolean, default: true },
    restaurant: { type: String, required: true },
    preparationTime: { type: Number, default: 30 }, // in minutes
    rating: { type: Number, default: 4.0, min: 1, max: 5 },
    totalRatings: { type: Number, default: 0 },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

// Index for text search
foodSchema.index({ name: "text", description: "text", category: "text" });

module.exports = mongoose.model("Food", foodSchema);
