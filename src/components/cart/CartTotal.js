import styles from "./CartTotal.module.css";
import convertToVND from "../../utils/convertToVND";

const CartTotal = ({ total }) => {
  return (
    <div className={`${styles["cart-total__container"]} "h-100 p-5"`}>
      <h3 className="fs-5 fw-bolder mb-4">CART TOTAL</h3>
      <div className="d-flex justify-content-between">
        <div>
          <strong>SUBTOTAL</strong>
        </div>
        <div className={styles.subtotal}>{convertToVND(total)}</div>
      </div>
      <hr className="my-2"></hr>
      <div className="d-flex justify-content-between">
        <div>
          <strong>TOTAL</strong>
        </div>
        <div className={styles.total}>{convertToVND(total)}</div>
      </div>

      <input
        type="text"
        name="coupon"
        placeholder="Enter your coupon"
        className="w-100 py-2 px-3 mt-4"
      />
      <button className="btn btn-dark text-white w-100 rounded-0">
        Apply coupon
      </button>
    </div>
  );
};

export default CartTotal;
