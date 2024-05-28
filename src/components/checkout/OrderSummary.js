import styles from "./OrderSummary.module.css";
import convertToVND from "../../utils/convertToVND";

const OrderSummary = ({ cartProducts, total }) => {
  // console.log(cartProducts);
  return (
    <div className={`${styles["checkout_container"]} "h-100 p-5"`}>
      <h3 className="fs-5 fw-bolder mb-4">YOUR ORDER</h3>
      {cartProducts.map((p, index) => (
        <div key={p.product.name}>
          <div index={p.product.name} className="d-flex gap-1 mb-2">
            <div className={styles.product}>{p.product.name}</div>
            <div className={styles.price}>
              {convertToVND(p.product.price)} x {p.quantity}
            </div>
          </div>
          {index === cartProducts.length - 1 ? "" : <hr className="my-2" />}
        </div>
      ))}

      <hr className="my-3" style={{ borderTop: "3px solid" }} />
      <div className="d-flex justify-content-between">
        <div>
          <strong>TOTAL</strong>
        </div>
        <div className={styles.total}>{convertToVND(total)}</div>
      </div>
    </div>
  );
};

export default OrderSummary;
