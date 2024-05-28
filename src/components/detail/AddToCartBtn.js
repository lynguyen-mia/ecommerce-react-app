import { useState } from "react";
import styles from "./AddToCartBtn.module.css";
import { useNavigate } from "react-router-dom";

const AddToCartBtn = ({ curProduct }) => {
  const navigate = useNavigate();
  const [quantityNum, setQuantityNum] = useState(1);
  const [orderAlert, setOrderAlert] = useState([]);

  // Clicking Add to cart
  async function onAddToCart() {
    const quantity = Number(quantityNum);
    if (curProduct["in_stock"] - quantity < 0) {
      return window.alert("Quantity exceeds in-stock number");
    }
    const res = await fetch(
      "https://ecommerce-node-app-sfau.onrender.com/client/add-to-cart",
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prodId: curProduct._id, quantity: quantity })
      }
    );

    if (res.status === 401) {
      localStorage.setItem("prevPage", JSON.stringify(curProduct._id));
      window.alert("Please login first");
      return navigate("/login");
    }
    setOrderAlert((prevState) => [
      ...prevState,
      "Bạn đã thêm hàng thành công!"
    ]);

    setTimeout(() => {
      setOrderAlert((prevState) => prevState.splice(1, 1));
    }, 1500);
  }

  // Decrement, Increment buttons
  function onDecrement() {
    const totalQuantity = Number(quantityNum) - 1;
    if (totalQuantity > 0 && totalQuantity < 1000) {
      setQuantityNum(totalQuantity);
    }
  }

  function onIncrement() {
    const totalQuantity = Number(quantityNum) + 1;
    if (totalQuantity > 0 && totalQuantity < 1000) {
      setQuantityNum(totalQuantity);
    }
  }

  // Prevent users from entering quantity less than 1 and larger than 999
  function onHandleInvalid(e) {
    if (Number(e.target.value) < 1) {
      e.target.value = 1;
      setQuantityNum(1);
      return;
    }
    if (Number(e.target.value) > 999) {
      e.target.value = 999;
      setQuantityNum(999);
      return;
    }
  }

  return (
    <div id={styles["addToCartBtn"]} className="input-group">
      <span className={`${styles.quantity} text-secondary px-3`}>QUANTITY</span>
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
        className="form-control"
        name="quantity"
        placeholder="1"
        step="1"
        min="1"
        max="999"
        value={quantityNum}
        onBlur={(e) => onHandleInvalid(e)}
        onChange={(e) => setQuantityNum(e.target.value)}
      ></input>
      <button
        className={`${styles["input-button"]} ${
          quantityNum >= 999 ? styles.disabled : ""
        } pe-3`}
        onClick={onIncrement}
        disabled={quantityNum >= 999 ? true : false}
      >
        <i className="bi bi-caret-right-fill"></i>
      </button>
      <button
        className={`${styles.button} btn btn-dark px-4 rounded-1`}
        type="button"
        id="button-addon2"
        onClick={onAddToCart}
      >
        Add to cart
      </button>

      {/* Order success alert */}
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

export default AddToCartBtn;
