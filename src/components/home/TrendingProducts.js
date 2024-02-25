import { useRouteLoaderData } from "react-router-dom";
import { useState } from "react";
import Popup from "./Popup";
import convertToVND from "../../utils/convertToVND";
import styles from "./TrendingProducts.module.css";

const TrendingProducts = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [product, setProduct] = useState();
  const TrendingProducts = useRouteLoaderData("root").slice(0, 8); // get only 8 results

  async function onClickProduct(prodId) {
    const res = await fetch(
      "https://ecommerce-node-app-sfau.onrender.com/client/fetch-product",
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prodId: prodId })
      }
    );

    const resFile = await res.json();
    if (res.status === 500) {
      console.log(resFile.error);
    }
    const data = resFile.data;
    setProduct(data);
    setOpenPopup(true);
  }

  function onClosePopup() {
    setOpenPopup(false);
  }
  return (
    <div className="mt-5">
      <div className="text-start">
        <p
          className="fst-italic text-secondary mb-1"
          style={{ fontSize: "0.9rem" }}
        >
          MADE THE HARD WAY
        </p>
        <p className="fs-4 fst-italic" style={{ fontWeight: "500" }}>
          TOP TRENDING PRODUCTS
        </p>
      </div>

      <div className="row row-cols-sm-4 row-cols-2">
        {TrendingProducts.map((product) => (
          <div
            className={`d-flex flex-column ${styles["product-item"]}`}
            onClick={() => onClickProduct(product["_id"])}
            key={product["_id"]}
          >
            <img src={product.img1} alt={product.name} className="img-fluid" />
            <div className="mt-3 fst-italic text-center">
              <p className={styles["trend-product__name"]}>{product.name}</p>
              <p className="text-secondary" style={{ marginTop: "-10px" }}>
                {convertToVND(product.price)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {openPopup && <Popup productPopup={product} closePopup={onClosePopup} />}
    </div>
  );
};

export default TrendingProducts;
