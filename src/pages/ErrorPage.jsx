import Footer from "../components/home/Footer";
import NavBar from "../components/home/NavBar";
import LiveChat from "../components/livechat/LiveChat";
import { getVariable } from "../utils/getLocalVars";

const ErrorPage = () => {
  const user = getVariable("user");
  return (
    <>
      <div className="container" style={{ maxWidth: "1140px" }}>
        <NavBar />
      </div>
      {user ? (
        <h3 className="text-center my-5">Page Not Found.</h3>
      ) : (
        <div className="text-center mt-4 fs-5">
          <i className="bi bi-x-circle-fill"></i> Session timed out!
          <div>Please log in again</div>
        </div>
      )}
      <Footer />
      <LiveChat />
    </>
  );
};

export default ErrorPage;
