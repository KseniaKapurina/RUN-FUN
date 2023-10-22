import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const CustomContext = createContext();

export const Context = (props) => {
  const [user, setUser] = useState({
    login: "",
  });
  const [error, setError] = useState(false);
  const [imgChoose, setImgChoose] = useState(null);

  const [colorName, setColorName] = useState("");
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [ticket, setTicket] = useState([]); //купон
  const navigate = useNavigate();

  const AddCart = (good) => {
    let idx = cart.findIndex(
      (item) => item.id === good.id && item.colors === good.colors
    );
    const maxQuantity = good.quantity;
    if (idx >= 0) {
      setCart(
        cart.map((item) => {
          if (item.id === good.id && item.colors === good.colors) {
            const newTotalCount = item.count + good.count;
            if (newTotalCount <= maxQuantity) {
              return { ...item, count: newTotalCount };
            } else {
              return { ...item, count: maxQuantity };
            }
          } else {
            return item;
          }
        })
      );
    } else {
      setCart([...cart, good]);
    }
  };

  const deleteCart = (id, colors) => {
    const updatedCart = cart.filter(
      (item) => item.id !== id || item.colors !== colors
    );
    setCart(updatedCart);
  };

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
    if (localStorage.getItem("cart") !== null) {
      setCart(JSON.parse(localStorage.getItem("cart")));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const registerUser = (data) => {
    axios
      .post("http://localhost:3001/register", { ...data, orders: [] })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const loginUser = (data) => {
    axios
      .post("http://localhost:3001/login", data)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        navigate("/");
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setError(true);
        } else {
          console.error(error);
        }
      });
  };

  const logOutUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    setUser({
      login: "",
    });
  };

  const formatPrice = (p) => {
    if (!p) return "";
    const priceStr = p.toString();
    return priceStr.length > 3
      ? priceStr.slice(0, -3) + " " + priceStr.slice(-3)
      : priceStr;
  };

  const value = {
    cart,
    setCart,
    AddCart,
    deleteCart,
    user,
    setUser,
    registerUser,
    logOutUser,
    loginUser,
    error,
    setError,
    formatPrice,
    imgChoose,
    setImgChoose,
    colorName,
    setColorName,

    ticket,
    setTicket,

    // isDisable,
    // setIsDisable,
  };

  return (
    <CustomContext.Provider value={value}>
      {props.children}
    </CustomContext.Provider>
  );
};
