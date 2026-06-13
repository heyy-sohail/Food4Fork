import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiShield, FiDollarSign, FiStar } from "react-icons/fi";
import "./Home.css";

const CATEGORIES = [
  { name: "Biryani", emoji: "🍛", bg: "#ff6b3515" },
  { name: "Burgers", emoji: "🍔", bg: "#ffd16615" },
  { name: "Pizza", emoji: "🍕", bg: "#06d6a015" },
  { name: "South Indian", emoji: "🫓", bg: "#a78bfa15" },
  { name: "Healthy", emoji: "🥗", bg: "#06d6a015" },
  { name: "Desserts", emoji: "🍰", bg: "#ffd16615" },
  { name: "Chinese", emoji: "🍜", bg: "#ef476f15" },
  { name: "Beverages", emoji: "🥤", bg: "#38bdf815" },
];

const Home = () => {
  return (
    <div className="home page-enter">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-blob blob-1" />
          <div className="hero-blob blob-2" />
          <div className="hero-blob blob-3" />
        </div>
        <div className="container hero-content">
          <div className="hero-tag">🚀 Hyderabad's Smartest Food App</div>
          <h1 className="hero-title">
            Eat <span className="highlight">Healthy.</span>
            <br />Spend <span className="highlight">Smart.</span>
            <br />Waste <span className="highlight-green">Less.</span>
          </h1>
          <p className="hero-sub">
            Every dish is rated 0–10 for healthiness. Shop within your budget.
            Make better food choices, one meal at a time.
          </p>
          <div className="hero-actions">
            <Link to="/menu" className="btn-primary hero-cta">
              Explore Menu <FiArrowRight />
            </Link>
            <Link to="/budget" className="btn-outline hero-cta-sec">
              🎯 Find Budget Meals
            </Link>
          </div>
          <div className="hero-stats">
            <div className="stat"><span>500+</span><p>Dishes</p></div>
            <div className="stat-divider" />
            <div className="stat"><span>4.8★</span><p>Rating</p></div>
            <div className="stat-divider" />
            <div className="stat"><span>30 min</span><p>Avg Delivery</p></div>
          </div>
        </div>
      </section>

      {/* Health Score Explainer */}
      <section className="health-explainer container">
        <div className="section-label">🌿 Our Health Score System</div>
        <h2 className="section-title">We score every dish so you don't have to</h2>
        <p className="section-sub">Based on calories, protein, fat, carbs, and ingredients</p>
        <div className="score-cards">
          <div className="score-card red">
            <div className="score-range">0 – 3</div>
            <div className="score-emoji">🚨</div>
            <h3>Unhealthy</h3>
            <p>High in calories, fat, or sugar. Treat yourself occasionally!</p>
          </div>
          <div className="score-card yellow">
            <div className="score-range">4 – 7</div>
            <div className="score-emoji">⚠️</div>
            <h3>Moderate</h3>
            <p>Balanced options. Fine in moderation as part of a varied diet.</p>
          </div>
          <div className="score-card green">
            <div className="score-range">8 – 10</div>
            <div className="score-emoji">✅</div>
            <h3>Healthy</h3>
            <p>Nutrient-rich and low-calorie. Your body will thank you!</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section container">
        <div className="section-label">🍽️ Browse Categories</div>
        <h2 className="section-title">What are you craving?</h2>
        <div className="categories-grid">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              to={`/menu?category=${cat.name}`}
              className="category-tile"
              style={{ background: cat.bg }}
            >
              <span className="cat-emoji">{cat.emoji}</span>
              <span className="cat-name">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="features container">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon" style={{ background: "rgba(255,107,53,0.12)", color: "var(--primary)" }}>
              <FiShield size={28} />
            </div>
            <h3>Health Score</h3>
            <p>Every dish rated 0-10. Eat with awareness, not regret.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon" style={{ background: "rgba(255,209,102,0.12)", color: "var(--yellow)" }}>
              <FiDollarSign size={28} />
            </div>
            <h3>Budget Finder</h3>
            <p>Enter your budget and instantly see every meal you can afford.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon" style={{ background: "rgba(6,214,160,0.12)", color: "var(--green)" }}>
              <FiStar size={28} />
            </div>
            <h3>Curated Quality</h3>
            <p>Handpicked restaurants with real ratings from real customers.</p>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner container">
        <div className="cta-inner">
          <div className="cta-text">
            <h2>Set your daily food budget 🎯</h2>
            <p>Tell us how much you want to spend and we'll show the best meals under your limit.</p>
          </div>
          <Link to="/budget" className="btn-primary">
            Try Budget Meals <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <span className="logo-icon">🍴</span>
            <span>Food<span style={{ color: "var(--primary)" }}>4</span>Fork</span>
          </div>
          <p className="footer-tagline">Eat Healthy. Spend Smart. Waste Less.</p>
          <p className="footer-copy">© 2024 Food4Fork. Built with ❤️ in Hyderabad.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
