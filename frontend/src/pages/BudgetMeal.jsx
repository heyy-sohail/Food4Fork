import React, { useState } from "react";
import axios from "axios";
import FoodCard from "../components/food/FoodCard";
import { FiTarget, FiArrowRight, FiTrendingUp } from "react-icons/fi";
import "./BudgetMeal.css";

const API_URL = import.meta.env.VITE_API_URL || "/api";

const QUICK_BUDGETS = [100, 150, 200, 300, 500];

const BudgetMeal = () => {
  const [budget, setBudget] = useState("");
  const [foods, setFoods] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputBudget, setInputBudget] = useState("");

  const handleSearch = async (amount) => {
    const b = amount || budget;
    if (!b || isNaN(b) || Number(b) <= 0) return;
    setLoading(true);
    setSearched(true);
    setInputBudget(b);
    try {
      const { data } = await axios.get(`${API_URL}/food/budget?amount=${b}`);
      setFoods(data);
    } catch {
      setFoods([]);
    } finally {
      setLoading(false);
    }
  };

  const avgHealth = foods.length
    ? (foods.reduce((s, f) => s + f.healthScore, 0) / foods.length).toFixed(1)
    : 0;

  return (
    <div className="budget-page page-enter">
      <div className="budget-hero">
        <div className="container">
          <div className="budget-hero-icon">🎯</div>
          <h1>Budget Meal Finder</h1>
          <p>
            Enter your budget and we'll show every dish you can order.
            <br />Sorted by healthiness — so you always eat smart.
          </p>

          <div className="budget-input-wrap">
            <div className="budget-input-box">
              <span className="rupee">₹</span>
              <input
                type="number"
                placeholder="Enter your budget..."
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                min="1"
              />
              <button
                className="btn-primary find-btn"
                onClick={() => handleSearch()}
                disabled={!budget || loading}
              >
                Find Meals <FiArrowRight />
              </button>
            </div>

            <div className="quick-budgets">
              <span>Quick pick:</span>
              {QUICK_BUDGETS.map((b) => (
                <button
                  key={b}
                  className={`quick-btn ${inputBudget == b ? "active" : ""}`}
                  onClick={() => { setBudget(b); handleSearch(b); }}
                >
                  ₹{b}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {searched && (
        <div className="container budget-results">
          {loading ? (
            <div className="loading-center"><div className="spinner" /></div>
          ) : (
            <>
              {/* Stats bar */}
              <div className="budget-stats">
                <div className="bstat">
                  <span className="bstat-value">{foods.length}</span>
                  <span className="bstat-label">Dishes Available</span>
                </div>
                <div className="bstat">
                  <span className="bstat-value">₹{inputBudget}</span>
                  <span className="bstat-label">Your Budget</span>
                </div>
                <div className="bstat">
                  <span className="bstat-value" style={{ color: avgHealth >= 7 ? "var(--green)" : avgHealth >= 4 ? "var(--yellow)" : "var(--red)" }}>
                    {avgHealth}/10
                  </span>
                  <span className="bstat-label">Avg Health Score</span>
                </div>
                {foods.length > 0 && (
                  <div className="bstat">
                    <span className="bstat-value">₹{Math.min(...foods.map(f => f.price))}</span>
                    <span className="bstat-label">Lowest Price</span>
                  </div>
                )}
              </div>

              <div className="budget-tip">
                <FiTrendingUp size={16} />
                <span>Results are sorted by health score (highest first) to encourage better choices! 🌿</span>
              </div>

              {foods.length === 0 ? (
                <div className="empty-state">
                  <span>💸</span>
                  <h3>No dishes under ₹{inputBudget}</h3>
                  <p>Try increasing your budget a bit!</p>
                </div>
              ) : (
                <div className="food-grid">
                  {foods.map((food) => (
                    <FoodCard key={food._id} food={food} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {!searched && (
        <div className="container budget-landing">
          <div className="how-it-works">
            <h2>How it works</h2>
            <div className="steps">
              <div className="step">
                <div className="step-num">1</div>
                <h3>Enter Budget</h3>
                <p>Type how much you want to spend in ₹</p>
              </div>
              <div className="step-arrow">→</div>
              <div className="step">
                <div className="step-num">2</div>
                <h3>We Filter</h3>
                <p>We show every dish priced within your budget</p>
              </div>
              <div className="step-arrow">→</div>
              <div className="step">
                <div className="step-num">3</div>
                <h3>Eat Smart</h3>
                <p>Results sorted by health score for smarter choices</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetMeal;
