import AddToCartBtn from "./AddToCartBtn";
import RelatedProducts from "./RelatedProducts";
import convertToVND from "../../utils/convertToVND";
import ImageCarousel from "./ImageCarousel";
import styles from "./DetailPageContent.module.css";

const DetailPageContent = ({ product, relatedProducts }) => {
  return (
    <div className="container mt-5" style={{ maxWidth: "1140px" }}>
      {/* PRODUCT IMAGES */}
      <div className={styles["detail-container"]}>
        <div className={styles["product-img__small"]}>
          <img
            src={
              product.img2.includes("public/images")
                ? `/${product.img2}`
                : product.img2
            }
            alt={product.name}
          />
          <img
            src={
              product.img3.includes("public/images")
                ? `/${product.img3}`
                : product.img3
            }
            alt={product.name}
          />
          <img
            src={
              product.img4.includes("public/images")
                ? `/${product.img4}`
                : product.img4
            }
            alt={product.name}
          />
          <img
            src={
              product.img1.includes("public/images")
                ? `/${product.img1}`
                : product.img1
            }
            alt={product.name}
          />
        </div>

        {/* CAROUSEL */}
        <div className="d-flex align-items-center h-100">
          <ImageCarousel product={product} />
        </div>

        {/* PRODUCT INTRODUCTION */}
        <div className={styles["product-description"]}>
          <div className={styles["product-name"]}>
            <h1 className="fst-italic fs-3">{product.name}</h1>
            {/* prettier-ignore */}
            <p className='text-secondary fs-5 fst-italic'>{convertToVND(product.price)}</p>
          </div>
          <p className="text-secondary">{product["short_desc"]}</p>
          <div className="mb-4">
            <strong>CATEGORY</strong>:&nbsp;&nbsp;{product.category}
          </div>

          <div className="mb-2 ms-1 text-dark">
            <i className="bi bi-box me-2 text-dark"></i>In Stock:{" "}
            {product["in_stock"]}
          </div>
          <AddToCartBtn curProduct={product} />
        </div>
      </div>

      {/* PRODUCT DESCRIPTION */}
      <div
        className="py-2 bg-dark text-white mb-4 fst-italic d-flex justify-content-center rounded-1"
        style={{ width: "150px" }}
      >
        DESCRIPTION
      </div>
      <h2 className="fs-5 fst-italic mb-4">PRODUCT DESCRIPTION</h2>
      <p className="text-secondary" style={{ whiteSpace: "pre-wrap" }}>
        {product["long_desc"]}
      </p>

      {/* RELATED PRODUCTS */}
      <RelatedProducts relatedProducts={relatedProducts} />
    </div>
  );
};

export default DetailPageContent;
