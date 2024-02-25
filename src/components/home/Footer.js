const Footer = () => {
  return (
    <div className="container-fluid bg-dark text-white fst-italic py-5 ">
      <div className="row container mx-auto" style={{ maxWidth: "1140px" }}>
        <div className="col-sm d-flex flex-column gap-2 footer-row mb-5">
          <h3 href="#" className="mb-2 fs-5 fw-normal">
            CUSTOMER SERVICES
          </h3>
          <a href="#">Help & Contact us</a>
          <a href="#">Returns & Refunds</a>
          <a href="#">Online stores</a>
          <a href="#">Terms & Conditions</a>
        </div>
        <div className="col-sm d-flex flex-column gap-2 footer-row mb-5">
          <h3 href="#" className="mb-2 fs-5 fw-normal">
            COMPANIES
          </h3>
          <a href="#">What We Do</a>
          <a href="#">Available Services</a>
          <a href="#">Latest Posts</a>
          <a href="#">FAQs</a>
        </div>
        <div className="col-sm d-flex flex-column gap-2 footer-row">
          <h3 href="#" className="mb-2 fs-5 fw-normal">
            SOCIAL MEDIA
          </h3>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
          <a href="#">Facebook</a>
          <a href="#">Pinterest</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
