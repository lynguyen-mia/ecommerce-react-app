import { Outlet, json } from "react-router-dom";
import Footer from "./components/home/Footer";
import NavBar from "./components/home/NavBar";
import LiveChat from "./components/livechat/LiveChat";

const RootLayout = () => {
  return (
    <>
      <div className="container" style={{ maxWidth: "1140px" }}>
        <NavBar />
      </div>
      <Outlet />
      <Footer />
      <LiveChat />
    </>
  );
};

export default RootLayout;

// loader function
export async function loader() {
  // Fetch products
  const res = await fetch(
    "https://ecommerce-node-app-sfau.onrender.com/client/fetch-products",
    {
      credentials: "include"
    }
  );

  if (res.status === 500) {
    return json({ message: "Couldn't fetch products." }, { status: 500 });
  }
  const resFile = await res.json();
  return resFile.data;
}
