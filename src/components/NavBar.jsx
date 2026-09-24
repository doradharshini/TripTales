import { Link } from "react-router-dom";


function Navbar() {

  return (

    <nav className="navbar">

      <Link
        to="/"
        className="logo"
      >
        <span>✈️</span>

        <span>
          TripTales
        </span>
      </Link>


      <div className="nav-links">

        <Link to="/">
          Discover
        </Link>

        <Link to="/trips">
          My Trips
        </Link>

        <Link to="/memorygram">
          MemoryGram
        </Link>

        <Link to="/journal">
          Journal
        </Link>

        <Link to="/timeline">
          Timeline
        </Link>

      </div>


      <button className="profile-button">
        👤
      </button>

    </nav>
  );
}

export default Navbar;