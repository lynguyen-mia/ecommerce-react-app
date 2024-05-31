import { Link, NavLink, useNavigate } from "react-router-dom";
import { getVariable } from "../../utils/getLocalVars";
import { useEffect, useState } from "react";
import openSocket from "socket.io-client";

const NavBar = () => {
  const socket = openSocket("https://ecommerce-node-app-sfau.onrender.com");
  const navigate = useNavigate();
  const user = getVariable("user");
  const room = localStorage.getItem("roomNum");
  const [roomNum, setRoomNum] = useState(room || null);

  // Logout function
  async function onLogout() {
    try {
      await fetch(
        "https://ecommerce-node-app-sfau.onrender.com/client/logout",
        {
          credentials: "include",
        }
      );
      localStorage.removeItem("user");
      return navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  // Check user expiration
  useEffect(() => {
    if (user) {
      async function checkSession() {
        const res = await fetch(
          "https://ecommerce-node-app-sfau.onrender.com/client/check-session",
          {
            credentials: "include",
          }
        );
        if (res.status === 401) {
          localStorage.removeItem("user");
          socket.emit("endChat", { roomId: roomNum });
        }
      }
      checkSession();
    }
  }, [user]);

  return (
    <nav className="navbar navbar-expand-lg text-dark fst-italic">
      <div className="container-fluid p-2">
        <div className="d-lg-flex gap-3 d-none">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Shop
          </NavLink>
        </div>

        <Link to="/">
          <h1 className="fs-2 fst-italic my-auto">BOUTIQUE</h1>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navmenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse flex-grow-0 ps-2 py-3 mt-1"
          id="navmenu"
        >
          <ul className="navbar-nav ms-auto gap-lg-4 gap-2 mb-2 mb-lg-0">
            <div className="navbar-nav gap-lg-4 gap-2 d-lg-none">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "active" : undefined
                  }
                >
                  <span
                    data-bs-target="#navmenu"
                    data-bs-toggle="collapse"
                    className="link-secondary"
                  >
                    Home
                  </span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/shop"
                  className={({ isActive }) =>
                    isActive ? "active" : undefined
                  }
                >
                  <span
                    data-bs-target="#navmenu"
                    data-bs-toggle="collapse"
                    className="link-secondary"
                  >
                    Shop
                  </span>
                </NavLink>
              </li>
            </div>
            {/* Logged in */}
            {user && (
              <div className="navbar-nav gap-lg-4 gap-2">
                <li className="nav-item">
                  <Link to="/cart">
                    <span
                      data-bs-target="#navmenu"
                      data-bs-toggle="collapse"
                      className="link-secondary"
                    >
                      <i
                        className="bi bi-cart-dash-fill me-1"
                        style={{ color: "#868e96" }}
                      ></i>
                      Cart
                    </span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/history">
                    <span
                      data-bs-target="#navmenu"
                      data-bs-toggle="collapse"
                      className="link-secondary"
                    >
                      <i
                        className="bi bi-box-fill me-1"
                        style={{ color: "#868e96" }}
                      ></i>
                      Orders
                    </span>
                  </Link>
                </li>
                <li className="nav-item link-secondary">
                  <i
                    className="bi bi-person-fill me-1"
                    style={{ color: "#868e96" }}
                  ></i>
                  {user.name}
                  <i
                    className="bi bi-caret-down-fill ms-1"
                    style={{ fontSize: "10px" }}
                  ></i>
                </li>
                <li className="nav-item">
                  <button
                    className="bg-transparent border-0 link-secondary"
                    onClick={onLogout}
                    data-bs-target="#navmenu"
                    data-bs-toggle="collapse"
                  >
                    <i
                      className="bi bi-door-open-fill me-1"
                      style={{ color: "#868e96" }}
                    ></i>
                    Logout
                  </button>
                </li>
              </div>
            )}
            {/* Not logged in */}
            {!user && (
              <div className="navbar-nav gap-lg-4 gap-2 d-lg-flex">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "active" : undefined
                  }
                >
                  <span data-bs-target="#navmenu" data-bs-toggle="collapse">
                    Login
                  </span>
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive ? "active" : undefined
                  }
                >
                  <span data-bs-target="#navmenu" data-bs-toggle="collapse">
                    Signup
                  </span>
                </NavLink>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
