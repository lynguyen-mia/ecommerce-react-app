const AdditionalInfo = () => {
  return (
    <>
      <div
        className="d-md-flex justify-content-around text-center p-5 mt-5 fst-italic"
        style={{ backgroundColor: "#f1f3f5" }}
      >
        <div>
          <h4 className="fw-normal">FREE SHIPPING</h4>
          <p className="text-secondary fw-light">Free shipping worldwide</p>
        </div>
        <div>
          <h4 className="fw-normal">24 X 7 SERVICE</h4>
          <p className="text-secondary fw-light">Free shipping worldwide</p>
        </div>
        <div>
          <h4 className="fw-normal">FESTIVAL OFFER</h4>
          <p className="text-secondary fw-light">Free shipping worldwide</p>
        </div>
      </div>

      <div className="d-md-flex justify-content-between text-center p-2 my-4 fst-italic">
        <div>
          <h4 className="fw-normal">CONNECT WITH US!</h4>
          <p className="text-secondary fw-light">
            Receive our latest promotions.
          </p>
        </div>

        <div
          className="input-group mb-3 mx-md-0 mx-auto my-auto"
          style={{ width: "60%", height: "60px" }}
        >
          <input
            type="text"
            className="form-control rounded-1"
            placeholder="Enter your email address"
            aria-label="Enter your email address"
            aria-describedby="button-addon2"
          />
          <button
            className="btn btn-outline-secondary bg-dark text-white rounded-1"
            type="button"
            id="button-addon2"
          >
            Subscribe
          </button>
        </div>
      </div>
    </>
  );
};

export default AdditionalInfo;
