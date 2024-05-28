const ImageCarousel = ({ product }) => {
  return (
    <div
      id="carouselExample"
      className="carousel carousel-dark slide w-100 h-100"
    >
      <div className="carousel-inner h-100 d-flex align-items-center">
        <div className="carousel-item active">
          <img
            src={
              product.img1.includes("public/images")
                ? `/${product.img1}`
                : product.img1
            }
            className="d-block w-100 object-fit-cover px-5"
            alt={product.name}
          />
        </div>
        <div className="carousel-item">
          <img
            src={
              product.img2.includes("public/images")
                ? `/${product.img2}`
                : product.img2
            }
            className="d-block w-100 object-fit-cover px-5"
            alt={product.name}
          />
        </div>
        <div className="carousel-item">
          <img
            src={
              product.img3.includes("public/images")
                ? `/${product.img3}`
                : product.img3
            }
            className="d-block w-100 object-fit-cover px-5"
            alt={product.name}
          />
        </div>
        <div className="carousel-item">
          <img
            src={
              product.img4.includes("public/images")
                ? `/${product.img4}`
                : product.img4
            }
            className="d-block w-100 object-fit-cover px-5"
            alt={product.name}
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
        style={{ left: "-25px" }}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
        style={{ right: "-25px" }}
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default ImageCarousel;
