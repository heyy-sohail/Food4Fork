import React from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FiX, FiTrash2, FiPlus, FiMinus, FiShoppingBag } from "react-icons/fi";
import "./CartDrawer.css";

const CartDrawer = () => {
  const { cart, cartTotal, cartOpen, setCartOpen, updateQuantity, removeItem, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setCartOpen(false);
    navigate("/checkout");
  };

  return (
    <>
      <div className={`cart-overlay ${cartOpen ? "open" : ""}`} onClick={() => setCartOpen(false)} />
      <div className={`cart-drawer ${cartOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h2>Your Cart 🛒</h2>
          <button className="close-btn" onClick={() => setCartOpen(false)}>
            <FiX size={22} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <FiShoppingBag size={60} opacity={0.2} />
            <p>Your cart is empty</p>
            <span>Add some delicious items!</span>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                item.food && (
                  <div key={item.food._id} className="cart-item">
                    <img src={item.food.image} alt={item.food.name} className="cart-item-img" />
                    <div className="cart-item-info">
                      <h4>{item.food.name}</h4>
                      <span className="cart-item-price">₹{item.food.price}</span>
                    </div>
                    <div className="cart-item-controls">
                      <button onClick={() => updateQuantity(item.food._id, item.quantity - 1)}>
                        <FiMinus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.food._id, item.quantity + 1)}>
                        <FiPlus size={14} />
                      </button>
                    </div>
                    <span className="cart-item-total">₹{item.food.price * item.quantity}</span>
                    <button className="remove-btn" onClick={() => removeItem(item.food._id)}>
                      <FiTrash2 size={15} />
                    </button>
                  </div>
                )
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery</span>
                  <span className="free-delivery">FREE</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>₹{cartTotal}</span>
                </div>
              </div>

              <button className="checkout-btn btn-primary" onClick={handleCheckout}>
                Proceed to Checkout — ₹{cartTotal}
              </button>
              <button className="clear-cart-btn" onClick={clearCart}>
                <FiTrash2 size={14} /> Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
