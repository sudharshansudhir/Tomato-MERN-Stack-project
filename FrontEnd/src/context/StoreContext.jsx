import { createContext, useState } from "react";
import { food_list } from "../assets/assets";
import axios from "../axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = async (itemId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        return;
      }

      await axios.post("/pages/cart-add", { itemId, quantity: 1 }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setCartItems((prev) => ({
        ...prev,
        [itemId]: (prev[itemId] || 0) + 1,
      }));
    } catch (err) {
      console.error("Add to cart error:", err.response?.data || err);
    }
  };

  const syncCartWithBackend = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const resp = await axios.get("/pages/cart", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const items = resp.data.items || [];
    const cartState = {};
    items.forEach((i) => {
      cartState[i.itemId._id] = i.quantity;
    });
    setCartItems(cartState);
  };

  const removeFromCart = async (itemId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("/pages/cart-remove", { itemId }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setCartItems((prev) => {
        const updated = { ...prev };
        if (updated[itemId] > 1) {
          updated[itemId] -= 1;
        } else {
          delete updated[itemId];
        }
        return updated;
      });
    } catch (err) {
      console.error("Remove cart error:", err.response?.data || err);
    }
  };

  const getTotalCartAmount = (mycarts) => {
    if (!mycarts || mycarts.length === 0) return 0;
    return mycarts.reduce((total, item) => {
      if (item && item.price && item.quantity) {
        return total + item.price * item.quantity;
      }
      return total;
    }, 0);
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    syncCartWithBackend,
    addToCart,
    removeFromCart,
    getTotalCartAmount
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
