import CartProducts from "../components/cart/CartProducts";
import HeaderPage from "../components/category/HeaderPage";
import CartTotal from "../components/cart/CartTotal";
import { useEffect, useState } from "react";

const CartPage = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    try {
      async function getCart() {
        const res = await fetch(
          "https://ecommerce-node-app-sfau.onrender.com/client/cart",
          {
            credentials: "include",
          }
        );

        if (res.status === 401) {
          window.alert("Your session has expired, please log in again");
          return window.location.replace("/login");
        }

        const results = await res.json();
        // const filterResults = await results.data.filter((p) => p.product);
        console.log(results.data);
        setCartProducts(results.data);
      }
      getCart();
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    // calculate total bill
    const eachTotal = cartProducts?.map(
      (p) => Number(p.quantity) * Number(p.product.price)
    );
    const total = eachTotal?.reduce((acc, amount) => acc + amount, 0);
    setTotalAmount(total);
  }, [cartProducts]);

  return (
    <div
      className="container fst-italic"
      style={{ maxWidth: "1140px", marginBottom: "100px" }}
    >
      <HeaderPage name="CART" breadscrumb="CART" />

      <h3 className="fs-5 mt-5 mb-3 fw-bolder">SHOPPING CART</h3>
      <div className="row">
        <div className="col-lg-8">
          <CartProducts
            listcart={cartProducts}
            setCartProducts={setCartProducts}
          />
        </div>
        <div className="col-lg-4">
          <CartTotal total={totalAmount} />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
