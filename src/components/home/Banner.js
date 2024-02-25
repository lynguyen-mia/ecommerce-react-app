import styles from "./Banner.module.css";
import banner from "../../images/banner1.jpg";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  const onClickCollections = () => {
    navigate("/shop");
  };
  return (
    <div className={styles["banner-img"]}>
      <img
        src={banner}
        alt="website banner"
        className="img-fluid h-100 object-fit-cover rounded-2"
      />
      <div className={styles["banner-text"]}>
        <p className={styles["collection-text"]}>NEW INSPIRATION 2023</p>
        <h3>20% OFF ON NEW SEASON</h3>
        <button
          className="btn btn-dark text-white fw-light px-3 rounded-2"
          onClick={onClickCollections}
        >
          Browse collections
        </button>
      </div>
    </div>
  );
};

export default Banner;
