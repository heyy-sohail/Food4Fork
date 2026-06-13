const express = require("express");
const router = express.Router();
const { getFoods, getFoodsByBudget, getCategories, getFoodById } = require("../controllers/foodController");

router.get("/", getFoods);
router.get("/budget", getFoodsByBudget);
router.get("/categories", getCategories);
router.get("/:id", getFoodById);

module.exports = router;
