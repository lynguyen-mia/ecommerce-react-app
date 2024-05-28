import { useEffect, useRef, useState } from "react";
import { getVariable } from "../../utils/getLocalVars";
import { useNavigate } from "react-router-dom";

const OrderForm = ({ cartProducts, total, user }) => {
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [orderSuccess, setOrderSuccess] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();

  useEffect(() => {
    if (user) {
      nameRef.current.value = user.name;
      emailRef.current.value = user.email;
      phoneRef.current.value = user.phone;
    }
  }, []);
  async function onOrder(e) {
    try {
      e.preventDefault();
      if (cartProducts.length === 0) {
        return window.alert("No product in cart. Please add products to cart.");
      }
      const curUser = getVariable("user");
      const formData = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        phone: phoneRef.current.value,
        address: addressRef.current.value
      };
      const cart = cartProducts.map(({ product, quantity }) => ({
        product,
        quantity
      }));

      const res = await fetch(
        "https://ecommerce-node-app-sfau.onrender.com/client/order",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user: curUser,
            items: cart,
            formData: formData,
            total: total
          })
        }
      );

      if (res.status === 401) {
        window.alert("Your session has expired, please log in again");
        return window.location.replace("/login");
      }

      if (res.status === 500) {
        const error = await res.json();
        console.log(error);
        setError(error);
        return;
      }
      setOrderSuccess(true);
      setTimeout(() => {
        navigate("/history");
      }, 1500);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      {orderSuccess ? (
        <div className="fs-4 text-success text-center mt-5">
          Order Succeeded!
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="green"
            className="w-6 h-6"
            width="28px"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
      ) : (
        <form>
          {error && (
            <div className="text-center text-danger text-secondary">
              {error.msg}
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              FULL NAME:
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter Your Full Name Here"
              className="form-control"
              ref={nameRef}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              EMAIL:
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter Your Email Here"
              className="form-control"
              ref={emailRef}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              PHONE NUMBER:
            </label>
            <input
              id="phone"
              type="number"
              name="phone"
              placeholder="Enter Your Phone Number Here"
              className="form-control no-arrow"
              ref={phoneRef}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              ADDRESS:
            </label>
            <input
              id="address"
              type="text"
              name="address"
              placeholder="Enter Your Address Here"
              className="form-control"
              ref={addressRef}
              required
            />
          </div>
          <button
            className="btn btn-dark text-white rounded-1 px-4 mt-3"
            onClick={onOrder}
          >
            Place order
          </button>
        </form>
      )}
    </>
  );
};

export default OrderForm;
