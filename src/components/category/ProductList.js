import { useNavigate } from "react-router-dom";
import styles from "./ProductList.module.css";
import { useRef } from "react";
import Loader from "../loader/Loader";

const ProductList = (props) => {
  const navigate = useNavigate();
  const searchRef = useRef();

  async function onSearch(e) {
    try {
      if (e.key === "Enter") {
        const searchTerms = searchRef.current.value;

        const res = await fetch(
          `https://ecommerce-node-app-sfau.onrender.com/client/search-product/?search=${searchTerms}`,
          {
            credentials: "include",
          }
        );

        const result = await res.json();
        props.setProducts(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function onSort(e) {
    if (e.target.value === "up") {
      return props.onSort("up");
    }
    if (e.target.value === "down") {
      return props.onSort("down");
    }
    props.onSort();
  }

  function onClickProduct(id) {
    navigate(`/detail/${id}`);
    // scroll to top after redirecting to the new page
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }
  return (
    <div id={styles["product-list"]}>
      {/* Search & Filter */}
      <div className="d-flex justify-content-between mb-4">
        <input
          type="text"
          name="searchBox"
          placeholder="Enter Search Here!"
          className="ps-3 py-1 border border-secondary-subtle rounded-1"
          id={styles["search-box"]}
          ref={searchRef}
          onKeyDown={onSearch}
        />
        <select
          name="dropdown"
          className="p-1 border border-secondary-subtle rounded-1"
          onChange={onSort}
        >
          <option value="default">Default Sorting</option>
          <option value="up">Price - Low to High</option>
          <option value="down">Price - Low to High</option>
        </select>
      </div>

      {/* Products */}
      {props.isLoading && (
        <div className="text-center mt-5">
          <Loader />
        </div>
      )}
      {!props.isLoading && props.totalProducts === 0 && (
        <div className="text-center pt-3">No product found.</div>
      )}
      {!props.isLoading && props.totalProducts > 0 && (
        <div
          className="row row-cols-md-3 row-cols-sm-2 mb-4"
          style={{ cursor: "pointer" }}
        >
          {props.products.map((product) => (
            <div
              key={product["_id"]}
              className={`d-flex flex-column ${styles["shop_product__list"]}`}
              onClick={onClickProduct.bind(null, product["_id"])}
            >
              <img
                src={product.img1}
                alt={product.name}
                className="object-fit-contain"
                style={{ height: "254px", width: "auto" }}
              />
              {/* prettier-ignore */}
              <div className="mt-3 fst-italic text-center">
          <p><strong>{product.name}</strong></p>
          <p className="text-secondary" style={{ marginTop: "-10px" }}>
            {`${Number(product.price).toLocaleString("en-US").replace(/,/g, ".")} VND`}
          </p>
        </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <nav
        aria-label="Page navigation example"
        className="d-flex flex-column align-items-end"
      >
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link rounded-1"
              onClick={props.prev}
              aria-label="Previous"
              disabled={props.curPage === 1 ? true : false}
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          <li className="page-item d-flex">
            {props.products.length !== 0 && (
              <>
                {props.curPage > 1 && (
                  <button
                    className="page-link bg-white text-dark"
                    onClick={(e) => props.choosePage(e.target.textContent)}
                  >
                    {props.curPage - 1}
                  </button>
                )}
                <button
                  className="page-link bg-dark text-white"
                  onClick={(e) => props.choosePage(e.target.textContent)}
                >
                  {props.curPage}
                </button>
                {props.curPage < props.totalPage && (
                  <button
                    className="page-link bg-white text-dark"
                    onClick={(e) => props.choosePage(e.target.textContent)}
                  >
                    {props.curPage + 1}
                  </button>
                )}
              </>
            )}
          </li>
          <li className="page-item">
            <button
              className="page-link rounded-1"
              onClick={props.next}
              aria-label="Next"
              disabled={props.curPage === props.totalPage ? true : false}
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
        <p className="text-secondary">
          Total {props.totalProducts || 0} results.
        </p>
      </nav>
    </div>
  );
};

export default ProductList;
