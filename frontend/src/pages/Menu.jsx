import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import FoodCard from "../components/food/FoodCard";
import { FiSearch, FiFilter, FiX } from "react-icons/fi";
import "./Menu.css";

const API_URL = import.meta.env.VITE_API_URL || "/api";

const SORT_OPTIONS = [
  { value: "", label: "Default" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "health", label: "Healthiest First" },
  { value: "rating", label: "Top Rated" },
];

const Menu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [sortBy, setSortBy] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const [minHealth, setMinHealth] = useState("");

  useEffect(() => {
    axios.get(`${API_URL}/food/categories`).then(({ data }) => setCategories(data));
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (category && category !== "All") params.set("category", category);
    if (sortBy) params.set("sortBy", sortBy);
    if (vegOnly) params.set("veg", "true");
    if (minHealth) params.set("minHealth", minHealth);
    if (search) params.set("search", search);

    axios
      .get(`${API_URL}/food?${params}`)
      .then(({ data }) => { setFoods(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [category, sortBy, vegOnly, minHealth]);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category && category !== "All") params.set("category", category);
    axios
      .get(`${API_URL}/food?${params}`)
      .then(({ data }) => { setFoods(data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setSortBy("");
    setVegOnly(false);
    setMinHealth("");
  };

  const hasFilters = category !== "All" || sortBy || vegOnly || minHealth;

  return (
    <div className="menu-page page-enter">
      <div className="menu-hero">
        <div className="container">
          <h1>Our Menu 🍽️</h1>
          <p>Discover {foods.length}+ dishes. Filter by health score, budget, and more.</p>
          <form className="search-bar" onSubmit={handleSearch}>
            <FiSearch size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search biryani, pizza, dosa..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="search-btn">Search</button>
          </form>
        </div>
      </div>

      <div className="container menu-body">
        {/* Categories */}
        <div className="category-scroll">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`cat-btn ${category === cat ? "active" : ""}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filters Bar */}
        <div className="filters-bar">
          <div className="filter-group">
            <FiFilter size={16} />
            <span>Filters:</span>
          </div>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="filter-select">
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          <select value={minHealth} onChange={(e) => setMinHealth(e.target.value)} className="filter-select">
            <option value="">All Health Scores</option>
            <option value="8">8+ (Healthy)</option>
            <option value="4">4+ (Moderate)</option>
            <option value="1">1+ (Any)</option>
          </select>

          <label className="veg-toggle">
            <input type="checkbox" checked={vegOnly} onChange={(e) => setVegOnly(e.target.checked)} />
            <span>Veg Only 🟢</span>
          </label>

          {hasFilters && (
            <button className="clear-filters" onClick={clearFilters}>
              <FiX size={14} /> Clear
            </button>
          )}
        </div>

        {/* Results */}
        {loading ? (
          <div className="loading-center"><div className="spinner" /></div>
        ) : foods.length === 0 ? (
          <div className="empty-state">
            <span>🍽️</span>
            <h3>No dishes found</h3>
            <p>Try adjusting your filters or search query</p>
            <button className="btn-outline" onClick={clearFilters}>Clear Filters</button>
          </div>
        ) : (
          <div className="food-grid">
            {foods.map((food) => (
              <FoodCard key={food._id} food={food} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
