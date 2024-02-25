import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import DetailPage from "./pages/DetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage, { loader as checkoutLoader } from "./pages/CheckoutPage";
import RootLayout from "./RootLayout";
import { loader as productsLoader } from "./RootLayout";
import History, { loader as historyLoader } from "./pages/History";
import OrderDetail, { loader as orderDetailLoader } from "./pages/OrderDetail";
import ErrorPage from "./pages/ErrorPage";
import SigninForm from "./auth/SigninForm";
import SignupForm from "./auth/SignupForm";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <RootLayout />,
    id: "root",
    loader: productsLoader,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      { path: "shop", element: <CategoryPage /> },
      { path: "/detail/:productId", element: <DetailPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/checkout", element: <CheckoutPage />, loader: checkoutLoader },
      { path: "/login", element: <SigninForm /> },
      { path: "/register", element: <SignupForm /> },
      { path: "/history", element: <History />, loader: historyLoader },
      {
        path: "/history/order/:orderId",
        element: <OrderDetail />,
        loader: orderDetailLoader
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
