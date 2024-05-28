const HeaderPage = ({ name, breadscrumb }) => {
  return (
    <div
      className="d-flex justify-content-between align-items-center p-5 bg-light fst-italic"
      style={{ width: "100%", height: "170px" }}
    >
      <h2>{name}</h2>
      <p className="text-secondary">{breadscrumb}</p>
    </div>
  );
};

export default HeaderPage;
