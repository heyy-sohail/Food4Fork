import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiPackage, FiClock, FiCheckCircle, FiTruck } from "react-icons/fi";
import HealthBadge from "../components/common/HealthBadge";
import "./Orders.css";

const API_URL = import.meta.env.VITE_API_URL || "/api";

const STATUS_MAP = {
  placed: { label: "Order Placed", icon: <FiPackage />, color: "var(--accent)" },
  confirmed: { label: "Confirmed", icon: <FiCheckCircle />, color: "var(--primary)" },
  preparing: { label: "Preparing", icon: <FiClock />, color: "var(--yellow)" },
  out_for_delivery: { label: "Out for Delivery", icon: <FiTruck />, color: "var(--primary)" },
  delivered: { label: "Delivered", icon: <FiCheckCircle />, color: "var(--green)" },
  cancelled: { label: "Cancelled", icon: null, color: "var(--red)" },
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}/orders/myorders`)
      .then(({ data }) => { setOrders(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading-center" style={{ paddingTop: "120px" }}><div className="spinner" /></div>;

  return (
    <div className="orders-page page-enter">
      <div className="container">
        <div className="orders-header">
          <h1>My Orders</h1>
          <p>{orders.length} order{orders.length !== 1 ? "s" : ""} placed</p>
        </div>

        {orders.length === 0 ? (
          <div className="empty-orders">
            <span>📦</span>
            <h3>No orders yet</h3>
            <p>Your past orders will show up here</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => {
              const status = STATUS_MAP[order.status] || STATUS_MAP.placed;
              const avgHealth = order.items.length > 0
                ? (order.items.reduce((s, i) => s + (i.healthScore || 0), 0) / order.items.length).toFixed(1)
                : 0;

              return (
                <div key={order._id} className="order-card">
                  <div className="order-card-header">
                    <div className="order-id">
                      <span className="order-label">Order</span>
                      <span className="order-num">#{order._id.slice(-8).toUpperCase()}</span>
                    </div>
                    <div className="order-status" style={{ color: status.color, borderColor: status.color, background: `${status.color}15` }}>
                      {status.icon} {status.label}
                    </div>
                    <span className="order-date">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>

                  <div className="order-items-list">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="order-line">
                        <span className="order-item-name">{item.name}</span>
                        <span className="order-item-qty">×{item.quantity}</span>
                        <HealthBadge score={item.healthScore || 0} />
                        <span className="order-item-price">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="order-card-footer">
                    <div className="order-health-summary">
                      <span>🌿 Avg health score:</span>
                      <strong style={{
                        color: avgHealth >= 7 ? "var(--green)" : avgHealth >= 4 ? "var(--yellow)" : "var(--red)"
                      }}>{avgHealth}/10</strong>
                    </div>
                    <div className="order-total-line">
                      <span>Payment: <strong>{order.paymentMethod === "cod" ? "Cash on Delivery" : "Online"}</strong></span>
                      <span className="order-grand-total">₹{order.totalAmount}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
