import styles from "./Categories.module.css";
import iphoneImg from "../../images/Product-Categories-5.jpg";
import ipadImg from "../../images/Product-Categories-4.jpg";
import macImg from "../../images/Product-Categories-1.jpg";
import watchImg from "../../images/Product-Categories-2.jpg";
import airpodImg from "../../images/Product-Categories-3.jpg";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className={`mt-5 ${styles.categories}`}>
      <div className="text-center">
        <p
          className="fst-italic text-secondary mb-1"
          style={{ fontSize: "0.9rem" }}
        >
          CAREFULLY CREATED COLLECTIONS
        </p>
        <p className="fs-4 fst-italic" style={{ fontWeight: "500" }}>
          BROWSE OUR CATEGORIES
        </p>
      </div>

      <div className="d-flex flex-md-row flex-column gap-md-4 gap-3 mb-md-4 mb-3">
        <Link to="/shop?category=iphone">
          <img src={iphoneImg} alt="iphone" className="img-fluid" />
        </Link>
        <Link to="/shop?category=ipad">
          <img src={ipadImg} alt="macbook" className="img-fluid" />
        </Link>
      </div>
      <div className="d-flex flex-md-row flex-column gap-md-4 gap-3">
        <Link to="/shop?category=macbook">
          <img src={macImg} alt="ipad" className="img-fluid" />
        </Link>
        <Link to="/shop?category=watch">
          <img src={watchImg} alt="iwatch" className="img-fluid" />
        </Link>
        <Link to="/shop?category=airpod">
          <img src={airpodImg} alt="airpod" className="img-fluid" />
        </Link>
      </div>
    </div>
  );
};

export default Categories;
