import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DetailPageContent from "../components/detail/DetailPageContent";

const DetailPage = () => {
  const [product, setProduct] = useState();
  const [relatedProducts, setRelatedProducts] = useState([]);

  // GET PRODUCT ID
  const params = useParams();
  const prodId = params.productId;

  useEffect(() => {
    async function fetchProduct(id) {
      const res = await fetch(
        `https://ecommerce-node-app-sfau.onrender.com/client/detail/${id}`,
        {
          credentials: "include"
        }
      );

      const resFile = await res.json();
      if (res.status === 500) {
        console.log(resFile.error);
      }
      setProduct(resFile.data);
      setRelatedProducts(resFile.relatedProducts);
    }
    fetchProduct(prodId);
  }, [prodId]); // fetch data again when product ID params changes

  return (
    <>
      {product && (
        <DetailPageContent
          product={product}
          relatedProducts={relatedProducts}
        />
      )}
    </>
  );
};

export default DetailPage;
