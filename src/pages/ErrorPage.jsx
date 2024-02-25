import Footer from "../components/home/Footer";
import NavBar from "../components/home/NavBar";
import LiveChat from "../components/livechat/LiveChat";
import { getVariable } from "../utils/getLocalVars";

const ErrorPage = () => {
  return (
    <>
      <div className="container" style={{ maxWidth: "1140px" }}>
        <NavBar />
      </div>
      <h3 className="text-center my-5">Page Not Found.</h3>
      <Footer />
      <LiveChat />
    </>
  );
};

export default ErrorPage;
