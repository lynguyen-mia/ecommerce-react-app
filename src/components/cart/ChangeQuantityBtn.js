import { useReducer, useState } from "react";
import styles from "./CartProducts.module.css";

const ChangeQuantityBtn = ({ quantity, product, changeCartProducts }) => {
  const [quantityNum, setQuantityNum] = useState(quantity);

  // useReducer
  const alertReducer = (state, action) => {
    switch (action.type) {
      case "add":
        return [...state, action.item];
      case "remove":
        return state.slice(1);
      default:
        return state;
    }
  };

  const [orderAlert, dispatchAlert] = useReducer(alertReducer, []);

  async function updateQuantity(prodId, quantity) {
    const res = await fetch(
      "https://ecommerce-node-app-sfau.onrender.com/client/edit-cart",
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prodId: prodId, quantity: quantity }),
      }
    );

    const result = await res.json();
    if (res.status === 401) {
      window.alert("Your session has expired, please log in again");
      return window.location.replace("/login");
    }
    if (res.status === 404) {
      setQuantityNum(Number(result.stock));
      window.alert(`The maximum quantity in stock now is ${result.stock}`);
    }
    changeCartProducts(result.data);
  }

  const dispatchAlertFn = () => {
    dispatchAlert({ type: "add", item: "Bạn đã sửa hàng thành công!" });
    setTimeout(() => {
      dispatchAlert({ type: "remove" });
    }, 1500);
  };

  // Edit quantity
  function onEditQuantity(e) {
    const quantity = Number(e.target.value);
    setQuantityNum(quantity);
    if (quantity > 0 && quantity < 1000) {
      updateQuantity(product._id, quantity);
      dispatchAlertFn();
    }
  }

  // Decrement, Increment quantity
  function onDecrement() {
    const totalQuantity = Number(quantityNum) - 1;
    if (totalQuantity > 0 && totalQuantity < 1000) {
      setQuantityNum(totalQuantity);
      updateQuantity(product._id, totalQuantity);
      dispatchAlertFn();
    }
  }

  function onIncrement() {
    const totalQuantity = Number(quantityNum) + 1;
    if (totalQuantity > 0 && totalQuantity < 1000) {
      setQuantityNum(totalQuantity);
      updateQuantity(product._id, totalQuantity);
      dispatchAlertFn();
    }
  }

  // Prevent users from entering quantity less than 1 and larger than 999
  function onHandleInvalid(e) {
    if (Number(e.target.value) < 1) {
      e.target.value = 1;
      setQuantityNum(1);
      dispatchAlertFn();
      return;
    }
    if (Number(e.target.value) > 999) {
      e.target.value = 999;
      setQuantityNum(999);
      dispatchAlertFn();
      return;
    }
  }

  return (
    <div className={`${styles["product-column"]}`}>
      <button
        className={`${styles["input-button"]} ${
          quantityNum <= 1 ? styles.disabled : ""
        } `}
        onClick={onDecrement}
        disabled={quantityNum <= 1 ? true : false}
      >
        <i className="bi bi-caret-left-fill"></i>
      </button>
      <input
        type="number"
        className="border-0"
        name="quantity"
        placeholder="1"
        step="1"
        min="1"
        max="999"
        value={quantityNum}
        onBlur={(e) => onHandleInvalid(e)}
        onChange={(e) => onEditQuantity(e)}
        style={{ fontSize: "15px", fontStyle: "italic" }}
      />
      <button
        className={`${styles["input-button"]} ${
          quantityNum >= 999 ? styles.disabled : ""
        } pe-3`}
        onClick={onIncrement}
        disabled={quantityNum >= 999 ? true : false}
      >
        <i className="bi bi-caret-right-fill"></i>
      </button>

      {/* Change order alert */}
      <div className={styles["alert-container"]}>
        {orderAlert.map((alert, index) => (
          <div key={index} className={styles["order-alert"]}>
            {alert}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChangeQuantityBtn;
