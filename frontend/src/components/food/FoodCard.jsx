import React from "react";
import { FiStar, FiClock, FiPlus } from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import HealthBadge from "../common/HealthBadge";
import "./FoodCard.css";

const FoodCard = ({ food }) => {
  const { addToCart } = useCart();

  return (
    <div className="food-card">
      <div className="food-card-img-wrap">
        <img src={food.image} alt={food.name} className="food-card-img" loading="lazy" />
        <div className="food-card-badges">
          <span className={`badge ${food.isVeg ? "badge-veg" : "badge-nonveg"}`}>
            {food.isVeg ? "🟢 Veg" : "🔴 Non-Veg"}
          </span>
        </div>
        <div className="food-card-health">
          <HealthBadge score={food.healthScore} />
        </div>
      </div>

      <div className="food-card-body">
        <div className="food-card-meta">
          <span className="food-category">{food.category}</span>
          <span className="food-restaurant">📍 {food.restaurant}</span>
        </div>
        <h3 className="food-name">{food.name}</h3>
        <p className="food-desc">{food.description}</p>

        <div className="food-stats">
          <span className="food-rating">
            <FiStar fill="var(--accent)" stroke="var(--accent)" size={13} />
            {food.rating}
          </span>
          <span className="food-time">
            <FiClock size={13} /> {food.preparationTime} min
          </span>
          <span className="food-calories">🔥 {food.calories} kcal</span>
        </div>

        <div className="food-card-footer">
          <div className="food-price">
            <span className="price-symbol">₹</span>
            <span className="price-value">{food.price}</span>
          </div>
          <button
            className="add-btn"
            onClick={() => addToCart(food._id, food.name)}
          >
            <FiPlus size={18} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
