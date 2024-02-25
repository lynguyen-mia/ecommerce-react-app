import { Link, useLoaderData } from "react-router-dom";
import HeaderPage from "../components/category/HeaderPage";
import convertToVND from "../utils/convertToVND";

const History = () => {
  const transactionArr = useLoaderData();
  // console.log(transactionArr);
  return (
    <div className="container mb-5" style={{ maxWidth: "1140px" }}>
      <HeaderPage name="HISTORY" breadscrumb="HISTORY" />
      {/* Transaction table */}
      <div className="table-responsive mt-5">
        <table id="transactions" className="table align-middle text-center">
          <thead>
            <tr>
              <td>ID ORDER</td>
              <td>ID USER</td>
              <td>NAME</td>
              <td>PHONE</td>
              <td>ADDRESS</td>
              <td>TOTAL</td>
              <td>DELIVERY</td>
              <td>STATUS</td>
              <td>DETAIL</td>
            </tr>
          </thead>

          {transactionArr && transactionArr.length === 0 && (
            <tbody>
              <tr className="text-center mt-2">
                <td
                  colSpan="12"
                  className="border-bottom-0 pt-3 fs-5 text-secondary"
                >
                  No order found.
                </td>
              </tr>
            </tbody>
          )}

          <tbody>
            {transactionArr &&
              transactionArr.length > 0 &&
              transactionArr.map((t) => {
                return (
                  <tr key={t._id}>
                    <td>{t._id}</td>
                    <td>{t.user.userId}</td>
                    <td>{t.user.name}</td>
                    <td>{t.user.phone}</td>
                    <td>{t.user.address}</td>
                    <td>{convertToVND(t.total)}</td>
                    <td>Waiting for processing</td>
                    <td>{t.status}</td>
                    <td>
                      <Link
                        to={`/history/order/${t._id}`}
                        className="btn btn-outline-secondary d-flex"
                      >
                        VIEW
                        <i className="bi bi-arrow-right-short"></i>
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;

export async function loader() {
  const res = await fetch(
    "https://ecommerce-node-app-sfau.onrender.com/client/transactions",
    {
      credentials: "include"
    }
  );

  if (res.status === 401) {
    window.alert("Your session has expired, please log in again");
    return window.location.replace("/login");
  }

  if (!res.ok) {
    console.log("Can't fetch transactions");
  }
  const result = await res.json();
  return result.data;
}
