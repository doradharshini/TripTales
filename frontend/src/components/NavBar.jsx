import { NavLink, useLocation } from "react-router-dom";
import "./NavBar.css";

const links = [
  { label: "Home", to: "/" },
  { label: "My Trips", to: "/trips" },
  { label: "Journal", to: "/journal" },
  { label: "MemoryGram", to: "/memorygram" },
  { label: "Timeline", to: "/timeline" },
];

function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <nav className={`navbar ${isHome ? "" : "navbar--solid"}`}>
      <NavLink to="/" className="navbar__logo" aria-label="TripTales home">
        <span className="navbar__mark">⛰</span>
        <span>TripTales</span>
      </NavLink>

      <div className="navbar__links">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `navbar__link ${isActive ? "navbar__link--active" : ""}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      <div className="navbar__actions">
        <button className="navbar__search button-reset" type="button" aria-label="Search">
          ⌕
        </button>
        <button className="navbar__profile button-reset" type="button" aria-label="Profile">
          👤
        </button>
      </div>
    </nav>
  );
}

export default Navbar;