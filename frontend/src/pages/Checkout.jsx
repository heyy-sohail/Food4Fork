import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import HealthBadge from "../components/common/HealthBadge";
import "./Checkout.css";

const API_URL = import.meta.env.VITE_API_URL || "/api";

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    street: user?.address?.street || "",
    city: user?.address?.city || "",
    pincode: user?.address?.pincode || "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const handleOrder = async () => {
    if (!address.street || !address.city || !address.pincode)
      return toast.error("Please enter complete delivery address");

    setLoading(true);
    try {
      const items = cart.map((i) => ({ food: i.food._id, quantity: i.quantity }));
      await axios.post(`${API_URL}/orders`, { items, deliveryAddress: address, paymentMethod });
      await clearCart();
      toast.success("🎉 Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-page page-enter">
        <div className="container empty-checkout">
          <span>🛒</span>
          <h2>Your cart is empty</h2>
          <button className="btn-primary" onClick={() => navigate("/menu")}>Browse Menu</button>
        </div>
      </div>
    );
  }

  const avgHealthScore = cart.length > 0
    ? (cart.reduce((s, i) => s + (i.food?.healthScore || 0), 0) / cart.length).toFixed(1)
    : 0;

  return (
    <div className="checkout-page page-enter">
      <div className="container checkout-grid">
        <div className="checkout-left">
          <h2>Delivery Address</h2>
          <div className="address-form">
            <input
              placeholder="Street address"
              value={address.street}
              onChange={(e) => setAddress({ ...address, street: e.target.value })}
              className="addr-input"
            />
            <div className="addr-row">
              <input
                placeholder="City"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                className="addr-input"
              />
              <input
                placeholder="Pincode"
                value={address.pincode}
                onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                className="addr-input"
              />
            </div>
          </div>

          <h2>Payment Method</h2>
          <div className="payment-options">
            <label className={`payment-opt ${paymentMethod === "cod" ? "active" : ""}`}>
              <input type="radio" name="payment" value="cod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
              <span className="pay-icon">💵</span>
              <div>
                <strong>Cash on Delivery</strong>
                <p>Pay when your food arrives</p>
              </div>
            </label>
            <label className={`payment-opt ${paymentMethod === "online" ? "active" : ""}`}>
              <input type="radio" name="payment" value="online" checked={paymentMethod === "online"} onChange={() => setPaymentMethod("online")} />
              <span className="pay-icon">💳</span>
              <div>
                <strong>Online Payment</strong>
                <p>UPI / Cards / Wallets</p>
              </div>
            </label>
          </div>
        </div>

        <div className="checkout-right">
          <h2>Order Summary</h2>

          <div className="health-alert" style={{
            borderColor: avgHealthScore >= 7 ? "rgba(6,214,160,0.3)" : avgHealthScore >= 4 ? "rgba(255,209,102,0.3)" : "rgba(239,71,111,0.3)",
            background: avgHealthScore >= 7 ? "rgba(6,214,160,0.06)" : avgHealthScore >= 4 ? "rgba(255,209,102,0.06)" : "rgba(239,71,111,0.06)",
          }}>
            <span>🌿 Avg Health Score of this order:</span>
            <strong style={{ color: avgHealthScore >= 7 ? "var(--green)" : avgHealthScore >= 4 ? "var(--yellow)" : "var(--red)" }}>
              {avgHealthScore}/10
            </strong>
          </div>

          <div className="order-items">
            {cart.map((item) => (
              item.food && (
                <div key={item.food._id} className="order-item">
                  <img src={item.food.image} alt={item.food.name} />
                  <div className="oi-info">
                    <span className="oi-name">{item.food.name}</span>
                    <div className="oi-meta">
                      <HealthBadge score={item.food.healthScore} />
                      <span className="oi-qty">×{item.quantity}</span>
                    </div>
                  </div>
                  <span className="oi-price">₹{item.food.price * item.quantity}</span>
                </div>
              )
            ))}
          </div>

          <div className="order-total">
            <div className="total-row"><span>Subtotal</span><span>₹{cartTotal}</span></div>
            <div className="total-row"><span>Delivery</span><span style={{ color: "var(--green)" }}>FREE</span></div>
            <div className="total-row grand"><span>Total</span><span>₹{cartTotal}</span></div>
          </div>

          <button
            className="btn-primary place-order-btn"
            onClick={handleOrder}
            disabled={loading}
          >
            {loading ? "Placing Order..." : `Place Order — ₹${cartTotal}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
