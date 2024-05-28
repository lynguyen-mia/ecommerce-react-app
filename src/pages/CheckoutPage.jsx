import HeaderPage from "../components/category/HeaderPage";
import OrderForm from "../components/checkout/OrderForm";
import OrderSummary from "../components/checkout/OrderSummary";
import { useLoaderData } from "react-router-dom";

const CheckoutPage = () => {
  const cartData = useLoaderData();
  const cartProducts = cartData.data;
  const userData = cartData.user;
  const eachTotal = cartProducts.map(
    (p) => Number(p.quantity) * Number(p.product.price)
  );
  const totalAmount = eachTotal.reduce((acc, amount) => acc + amount, 0);

  return (
    <div
      className="container fst-italic"
      style={{ maxWidth: "1140px", marginBottom: "100px" }}
    >
      <HeaderPage name="CHECKOUT" breadscrumb="HOME / CART / CHECKOUT" />
      <h3 className="fs-5 mt-5 mb-3 fw-bolder">BILLING DETAILS</h3>

      <div className="row row-cols-2">
        <div className="col" style={{ width: "60%" }}>
          <OrderForm
            cartProducts={cartProducts}
            total={totalAmount}
            user={userData}
          />
        </div>
        <div className="col" style={{ width: "40%" }}>
          <OrderSummary cartProducts={cartProducts} total={totalAmount} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

export async function loader() {
  // Fetch cart
  const res = await fetch(
    "https://ecommerce-node-app-sfau.onrender.com/client/cart",
    {
      credentials: "include"
    }
  );

  if (res.status === 401) {
    window.alert("Your session has expired, please log in again");
    return window.location.replace("/login");
  }
  if (!res.ok) {
    console.log("Can't fetch cart");
  }
  const results = await res.json();
  return results;
}
