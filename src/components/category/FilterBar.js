import { NavLink, useSearchParams } from "react-router-dom";
import styles from "./FilterBar.module.css";

const FilterBar = (props) => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  return (
    <nav id={styles["filter-bar"]} className="col-sm-3">
      <h3 className="mb-4 fs-md-4 fs-5">CATEGORIES</h3>
      <ul
        className="d-flex flex-column gap-2 list-unstyled overflow-auto"
        onClick={props.onFilter}
      >
        <p className={`bg-dark text-light ${styles["nav-category"]}`}>APPLE</p>
        <li>
          <NavLink
            to="/shop?category=all"
            className={({ isActive }) =>
              isActive && (category === "all" || !category)
                ? styles["active"] + " " + "filter"
                : "filter"
            }
          >
            All
          </NavLink>
        </li>

        <p className={`bg-secondary-subtle ${styles["nav-category"]}`}>
          IPHONE & MAC
        </p>

        <li>
          <NavLink
            to="/shop?category=iphone"
            className={({ isActive }) =>
              isActive && category === "iphone"
                ? styles["active"] + " " + "filter"
                : "filter"
            }
          >
            Iphone
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/shop?category=ipad"
            className={({ isActive }) =>
              isActive && category === "ipad"
                ? styles["active"] + " " + "filter"
                : "filter"
            }
          >
            Ipad
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/shop?category=macbook"
            className={({ isActive }) =>
              isActive && category === "macbook"
                ? styles["active"] + " " + "filter"
                : "filter"
            }
          >
            Macbook
          </NavLink>
        </li>

        <p className={`bg-secondary-subtle ${styles["nav-category"]}`}>
          WIRELESS
        </p>
        <li>
          <NavLink
            to="/shop?category=airpod"
            className={({ isActive }) =>
              isActive && category === "airpod"
                ? styles["active"] + " " + "filter"
                : "filter"
            }
          >
            Airpod
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/shop?category=watch"
            className={({ isActive }) =>
              isActive && category === "watch"
                ? styles["active"] + " " + "filter"
                : "filter"
            }
          >
            Watch
          </NavLink>
        </li>

        <p className={`bg-secondary-subtle ${styles["nav-category"]}`}>
          OTHERS
        </p>
        <li>
          <NavLink
            to="/shop?category=mouse"
            className={({ isActive }) =>
              isActive && category === "mouse"
                ? styles["active"] + " " + "filter"
                : "filter"
            }
          >
            Mouse
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/shop?category=keyboard"
            className={({ isActive }) =>
              isActive && category === "keyboard"
                ? styles["active"] + " " + "filter"
                : "filter"
            }
          >
            Keyboard
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/shop?category=others"
            className={({ isActive }) =>
              isActive && category === "others"
                ? styles["active"] + " " + "filter"
                : "filter"
            }
          >
            Others
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default FilterBar;
