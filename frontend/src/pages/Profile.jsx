import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { FiUser, FiMail, FiPhone, FiMapPin, FiTarget, FiSave } from "react-icons/fi";
import "./Profile.css";

const API_URL = import.meta.env.VITE_API_URL || "/api";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    budget: user?.budget || "",
    street: user?.address?.street || "",
    city: user?.address?.city || "",
    pincode: user?.address?.pincode || "",
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      const { data } = await axios.put(`${API_URL}/auth/profile`, {
        name: form.name,
        phone: form.phone,
        budget: Number(form.budget),
        address: { street: form.street, city: form.city, pincode: form.pincode },
      });
      updateUser(data);
      toast.success("Profile updated! ✅");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page page-enter">
      <div className="container">
        <div className="profile-header">
          <div className="profile-avatar">{user?.name?.[0]?.toUpperCase()}</div>
          <div>
            <h1>{user?.name}</h1>
            <p>{user?.email}</p>
          </div>
        </div>

        <div className="profile-grid">
          {/* Personal Info */}
          <div className="profile-section">
            <h2>Personal Info</h2>
            <div className="profile-field">
              <label><FiUser size={15} /> Full Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="profile-input"
                placeholder="Your name"
              />
            </div>
            <div className="profile-field">
              <label><FiMail size={15} /> Email</label>
              <input value={user?.email} className="profile-input" disabled />
            </div>
            <div className="profile-field">
              <label><FiPhone size={15} /> Phone</label>
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="profile-input"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
          </div>

          {/* Budget */}
          <div className="profile-section budget-section">
            <h2><FiTarget /> Daily Food Budget</h2>
            <p className="budget-desc">
              Set your daily food budget. Visit "Budget Meals" to see dishes under your limit.
            </p>
            <div className="budget-input-wrapper">
              <span className="rupee-prefix">₹</span>
              <input
                type="number"
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: e.target.value })}
                className="profile-input budget-val"
                placeholder="0"
                min="0"
              />
            </div>
            {form.budget > 0 && (
              <div className="budget-hint">
                You'll see dishes priced ₹{form.budget} or less in Budget Meals 🎯
              </div>
            )}
          </div>

          {/* Address */}
          <div className="profile-section full-width">
            <h2><FiMapPin /> Delivery Address</h2>
            <div className="address-grid">
              <div className="profile-field">
                <label>Street</label>
                <input
                  value={form.street}
                  onChange={(e) => setForm({ ...form, street: e.target.value })}
                  className="profile-input"
                  placeholder="House/Street"
                />
              </div>
              <div className="profile-field">
                <label>City</label>
                <input
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="profile-input"
                  placeholder="City"
                />
              </div>
              <div className="profile-field">
                <label>Pincode</label>
                <input
                  value={form.pincode}
                  onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                  className="profile-input"
                  placeholder="500xxx"
                />
              </div>
            </div>
          </div>
        </div>

        <button className="btn-primary save-btn" onClick={handleSave} disabled={loading}>
          <FiSave /> {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
