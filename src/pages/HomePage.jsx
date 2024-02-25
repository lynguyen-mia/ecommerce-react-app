import AdditionalInfo from "../components/home/AdditionalInfo";
import Banner from "../components/home/Banner";
import Categories from "../components/home/Categories";
import TrendingProducts from "../components/home/TrendingProducts";

const HomePage = () => {
  return (
    <div className="container" style={{ maxWidth: "1140px" }}>
      <Banner />
      <Categories />
      <TrendingProducts />
      <AdditionalInfo />
    </div>
  );
};

export default HomePage;
