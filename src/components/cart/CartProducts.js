import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import convertToVND from "../../utils/convertToVND";
import ChangeQuantityBtn from "./ChangeQuantityBtn";
import styles from "./CartProducts.module.css";

const CartProducts = ({ listcart, setCartProducts }) => {
  const [deleteAlert, setDeteleAlert] = useState(false);

  // Delete product
  async function onClickRemove(id) {
    try {
      const confirm = window.confirm("Are you sure to delete this product?");
      if (confirm) {
        const res = await fetch(
          `https://ecommerce-node-app-sfau.onrender.com/client/cart-remove?id=${id}`,
          {
            credentials: "include",
          }
        );

        if (res.status === 401) {
          window.alert("Your session has expired, please log in again");
          return window.location.replace("/login");
        }

        if (res.ok) {
          // Refresh cart products
          const result = await res.json();
          setCartProducts(result.data);
          // Display delete alert
          setDeteleAlert(true);
          setTimeout(() => setDeteleAlert(false), 1500);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Redirect to other pages
  const navigate = useNavigate();
  function onClickShopping() {
    navigate("/shop");
    window.scroll({ top: 0, left: 0, behavior: "instant" });
  }

  function onClickCheckout() {
    navigate("/checkout");
    window.scroll({ top: 0, left: 0, behavior: "instant" });
  }

  return (
    <div id={styles["cart-products"]} className="d-flex flex-column gap-3">
      <div className={`table-responsive ${styles.table}`}>
        {/* PRODUCT TABLE */}
        <table className="table table-borderless text-center align-middle">
          <thead className={styles["product-header"]}>
            <tr className="row">
              <th className="col">IMAGE</th>
              <th className="col col-3">PRODUCT</th>
              <th className="col">PRICE</th>
              <th className="col">QUANTITY</th>
              <th className="col">TOTAL</th>
              <th className="col">REMOVE</th>
            </tr>
          </thead>

          {listcart && listcart.length === 0 && (
            <tbody>
              <tr>
                <td colSpan={12} className="pt-4 text-secondary">
                  No product in cart.
                </td>
              </tr>
            </tbody>
          )}
          {listcart && listcart.length > 0 && (
            <tbody>
              {/* For each product, create a row */}
              {listcart.map((p) => {
                const total = Number(p.quantity) * Number(p.product?.price);
                return (
                  <tr key={p.product._id} className="row">
                    {/* Images column*/}
                    <td className="col d-flex justify-content-center">
                      <img src={p.product.img1} alt={p.product.name} />
                    </td>
                    {/* Names column */}
                    <td className="col col-3">
                      <Link
                        to={`/detail/${p.product._id}`}
                        className={styles["product-name"]}
                      >
                        {p.product.name}
                      </Link>
                    </td>
                    {/* Prices column */}
                    <td className="col">
                      <div className={styles.number}>
                        {convertToVND(p.product.price)}
                      </div>
                    </td>
                    {/* Quantity column */}
                    <td className="col">
                      <ChangeQuantityBtn
                        quantity={p.quantity}
                        product={p.product}
                        changeCartProducts={setCartProducts}
                      />
                    </td>
                    {/* Total column */}
                    <td className="col">
                      <div className={styles.number}>{convertToVND(total)}</div>
                    </td>
                    {/* Remove column */}
                    <td className="col">
                      <button
                        className="border-0 bg-transparent"
                        onClick={() => onClickRemove(p.product["_id"])}
                      >
                        <i className="bi bi-trash3"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>

      {/* Delete alert */}
      {deleteAlert && (
        <div className={styles["delete-alert"]}>Xoá phẩm khỏi giỏ hàng</div>
      )}

      {/* Buttons */}
      <div
        className={`${styles.actions} d-flex flex-md-row flex-column justify-content-between w-80 mb-4`}
      >
        <button
          className="btn border-0 text-secondary"
          onClick={onClickShopping}
        >
          <i className="bi bi-arrow-left"></i> Continue shopping
        </button>
        <button
          className="btn text-secondary border-dark-subtle"
          onClick={onClickCheckout}
        >
          Proceed to checkout <i className="bi bi-arrow-right fw-bold"></i>
        </button>
      </div>
    </div>
  );
};

export default CartProducts;
