import { Link } from "react-router-dom";
import styles from "./Popup.module.css";
import convertToVND from "../../utils/convertToVND";

const Popup = ({ productPopup, closePopup }) => {
  return (
    <div className={styles["modal-backdrop"]} onClick={closePopup}>
      <div className={styles["modal-box"]}>
        <span className={styles["close-btn"]} onClick={closePopup}>
          &times;
        </span>
        {productPopup ? (
          <div className={styles["modal-box__content"]}>
            <img src={productPopup.img1} alt={productPopup.name} />
            <div>
              <h3 className="fs-2 fst-italic">{productPopup.name}</h3>
              {/* prettier-ignore */}
              <p className={`text-secondary ${styles['product-price']}`}>{convertToVND(productPopup.price)}</p>
              <p className={`text-secondary ${styles["product-description"]}`}>
                {productPopup["short_desc"]}
              </p>
              <Link
                className="btn btn-dark mt-2 px-4 rounded-2"
                to={`/detail/${productPopup["_id"]}`}
              >
                <i
                  className="bi bi-cart-fill me-2"
                  style={{ color: "white" }}
                ></i>
                View details
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center">No product found.</div>
        )}
      </div>
    </div>
  );
};

export default Popup;
