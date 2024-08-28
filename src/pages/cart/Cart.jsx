import React from "react";
import { useCart } from "../../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_test_51Pelx3ErqJjxVJ4dTzgVvwN2NYHvJQe7zm2maStQ0V74U6h2k183ulV1LX9210F3qi9k2Uj76JaUlfq15kihbtxS00EPwLUujC");


const Cart = () => {
  const {
    cartItems,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeFromCart,
    cartTotal,
    totalQuantity,
  } = useCart();

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      padding: "20px",
      height: "calc(100vh - 80px)",
      overflowY: "hidden",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "rgb(130, 87, 230)",
      fontSize: "60px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    buyIcon: {
      width: "70px",
      height: "auto",
      marginRight: "10px",
    },
    productList: {
      width: "50%",
      maxHeight: "calc(100vh - 150px)",
      overflowY: "auto",
      marginRight: "20px",
    },
    cartSummary: {
      width: "16%",
      backgroundColor: "#222222",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "calc(20vh - 20px)",
    },
    summaryRow: {
      display: "flex",
      justifyContent: "space-between",
      color: "#b0b0b0",
      marginBottom: "10px",
    },
    productItem: {
      display: "flex",
      alignItems: "center",
      marginBottom: "10px",
      borderBottom: "1px solid white",
      paddingBottom: "10px",
      height: "150px",
    },
    productImage: {
      width: "112px",
      height: "112px",
      objectFit: "cover",
      marginRight: "10px",
    },
    productInfo: {
      flexGrow: 1,
    },
    productName: {
      color: "white",
      marginBottom: "5px",
      fontSize: "18px",
    },
    productPrice: {
      color: "#b0b0b0",
      marginBottom: "10px",
      fontSize: "16px",
    },
    quantityControl: {
      display: "flex",
      alignItems: "center",
      marginBottom: "10px",
    },
    iconButton: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "rgb(0, 179, 126)",
      margin: "0 5px",
    },
    trashButton: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "rgb(239, 68, 68)",
      marginLeft: "10px",
    },
    totalText: {
      color: "#b0b0b0",
      marginBottom: "10px",
    },
    totalAmount: {
      color: "white",
      fontSize: "24px",
      fontWeight: "bold",
    },
    checkoutButton: {
      backgroundColor: "rgb(0, 135, 95)",
      color: "white",
      height: "64px",
      width: "100%",
      border: "none",
      cursor: "pointer",
      fontSize: "18px",
      fontWeight: "bold",
      marginTop: "20px",
    },
    quantityText: {
      color: "white",
      fontSize: "18px",
    },
  };

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const response = await fetch("/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cartItems,
      }),
    });

    const sessionId = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: sessionId.id,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <div>
      <div style={styles.header}>
        <img src="/buy.svg" alt="Carrinho" style={styles.buyIcon} />
        <span>Sacola de compra</span>
      </div>
      {cartItems.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <img
            src="/cart.svg"
            alt="Carrinho vazio"
            style={{ width: "200px", height: "auto" }}
          />
          <p style={{ color: "white" }}>
            {" "}
            Ops! Parece que a sua sacola está vazia 😞
          </p>
        </div>
      ) : (
        <div style={styles.container}>
          <div style={styles.productList}>
            {cartItems.map((item) => (
              <div key={item.id} style={styles.productItem}>
                <img
                  src={item.images[0]}
                  alt={item.name}
                  style={styles.productImage}
                />
                <div style={styles.productInfo}>
                  <h2 style={styles.productName}>{item.name}</h2>
                  <p style={styles.productPrice}>
                    R${(item.price / 100).toFixed(2)}
                  </p>
                  <div style={styles.quantityControl}>
                    <button
                      onClick={() => decreaseItemQuantity(item)}
                      style={styles.iconButton}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span style={styles.quantityText}>
                      {item.quantity || 1}
                    </span>
                    <button
                      onClick={() => increaseItemQuantity(item)}
                      style={styles.iconButton}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={styles.trashButton}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={styles.cartSummary}>
            <div style={styles.summaryRow}>
              <span style={styles.totalText}>Quantidade</span>
              <span style={styles.totalText}>
                {totalQuantity} ite{totalQuantity > 1 ? "ns" : "m"}
              </span>
            </div>
            <div style={styles.summaryRow}>
              <span style={styles.totalText}>Valor total</span>
              <span style={styles.totalAmount}>
                R${(cartTotal / 100).toFixed(2)}
              </span>
            </div>
            <button style={styles.checkoutButton} onClick={handleCheckout}>
              Finalizar compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
