import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { StoreContext } from '../../context/StoreContext'


const Cart = () => {
  const {syncCartWithBackend} = useContext(StoreContext)
  const [mycarts, setMyCarts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        const resp = await axios.get("http://localhost:3000/pages/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMyCarts(resp.data.items || []);
        await syncCartWithBackend();
      } catch (err) {
        console.error("Cart fetch error:", err);
      }
    };
    fetchCart();
  }, [mycarts]);

 const removeFromCart = async (itemId) => {
  try {
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:3000/pages/cart-remove",
      { itemId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // ✅ Safely update state
    setMyCarts((prev) =>
      prev.filter((item) => {
        const currentId =
          typeof item.itemId === "object" ? item.itemId._id : item.itemId;
        return currentId !== itemId;
      })
    );
    await syncCartWithBackend();
  } catch (err) {
    console.error("Remove error:", err);
  }
};


  const getTotalCartAmount = () => {
    if (!mycarts || mycarts.length === 0) return 0;

    return mycarts.reduce((total, item) => {
      const price = item.itemId?.price || item.price || 0;
      return total + price * (item.quantity || 1);
    }, 0);
  };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {mycarts.map((item, index) => {
          const menuItem = item.itemId?._id ? item.itemId : item; // fallback

          return (
            <div key={index}>
              <div className="cart-items-title cart-items-item">
                <p>{menuItem.name || "Unknown"}</p>
                <p>${menuItem.price || 0}</p>
                <p>{item.quantity || 1}</p>
                <p>${(menuItem.price || 0) * (item.quantity || 1)}</p>
                <p
                  onClick={() => removeFromCart(menuItem._id || menuItem)}
                  className="cross"
                >
                  X
                </p>
              </div>
              <hr />
            </div>
          );
        })}

      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>
            PROCEED TO CHECKOUT
          </button>
        </div>

        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
