import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductList from "../components/category/ProductList";
import FilterBar from "../components/category/FilterBar";
import HeaderPage from "../components/category/HeaderPage";

const CategoryPage = () => {
  const [searchParams] = useSearchParams();
  const predefinedCategory = searchParams.get("category");

  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState();
  const [category, setCategory] = useState(predefinedCategory || "all");
  const [curPage, setCurPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [sort, setSort] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const pageItem = 9;

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          `https://ecommerce-node-app-sfau.onrender.com/client/fetch-category?category=${category}&&page=${curPage}&&pageItem=${pageItem}&&sort=${sort}`,
          {
            credentials: "include"
          }
        );

        const resFile = await res.json();
        // console.log(resFile);
        setProducts(resFile.data);
        setTotalProducts(resFile.productTotal);
        // calculate number of pages
        setTotalPage(Math.ceil(resFile.productTotal / pageItem));
      } catch (err) {
        console.log(err);
      }
    }

    fetchProducts();
    setIsLoading(false);
  }, [category, curPage, sort]);

  function onClickNext() {
    if (curPage >= totalPage || !totalPage) {
      return;
    }
    setCurPage((prev) => prev + 1);
  }

  function onClickPrev() {
    if (curPage <= 1) {
      return;
    }
    setCurPage((prev) => prev - 1);
  }

  function onChoosePage(num) {
    setCurPage(Number(num));
  }

  function onFilterProducts(e) {
    if (e.target.classList.contains("filter")) {
      setCategory(e.target.textContent.toLowerCase());
    }
  }

  return (
    <div className="container mb-5" style={{ maxWidth: "1140px" }}>
      <HeaderPage name="SHOP" breadscrumb="SHOP" />

      <div className="row fst-italic mt-5">
        <FilterBar onFilter={onFilterProducts} curCategory={category} />
        <div className="col-sm-9">
          {products && (
            <ProductList
              products={products}
              setProducts={setProducts}
              totalProducts={totalProducts}
              next={onClickNext}
              prev={onClickPrev}
              totalPage={totalPage}
              curPage={curPage}
              choosePage={onChoosePage}
              onSort={setSort}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
