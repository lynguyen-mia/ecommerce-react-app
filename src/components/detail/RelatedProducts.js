import { useNavigate } from "react-router-dom";
import convertToVND from "../../utils/convertToVND";

const RelatedProducts = ({ relatedProducts }) => {
  // REDIRECT TO RELATED PRODUCT PAGE
  const navigate = useNavigate();
  function onClickRelatedProducts(id) {
    navigate(`/detail/${id}`);
    // scroll to top after redirecting to the new page
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }
  return (
    <>
      {/* RELATED PRODUCTS */}
      <h2 className="fs-5 fst-italic my-5">RELATED PRODUCTS</h2>
      <div className="row row-cols-sm-4 mb-4" style={{ cursor: "pointer" }}>
        {relatedProducts.map((product) => (
          <div
            key={product["_id"]}
            className={`d-flex flex-column`}
            onClick={() => onClickRelatedProducts(product["_id"])}
          >
            <img
              src={
                product.img1.includes("public/images")
                  ? `/${product.img1}`
                  : product.img1
              }
              alt={product.name}
              className="img-fluid"
            />
            <div className="mt-3 fst-italic text-center">
              <p>
                <strong>{product.name}</strong>
              </p>
              <p className="text-secondary" style={{ marginTop: "-10px" }}>
                {convertToVND(product.price)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default RelatedProducts;
