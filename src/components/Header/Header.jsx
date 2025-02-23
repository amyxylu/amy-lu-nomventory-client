import "./Header.scss";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <Link to="/">
        <h2 className="header__logo">NOMVENTORY</h2>
      </Link>
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item">
            <Link to="/recipes" className="header__nav-link">
              All Recipes
            </Link>
          </li>
          <li className="header__nav-item">
            <Link to="/cuisines" className="header__nav-link">
              Recipes By Cuisine
            </Link>
          </li>
          <li className="header__nav-item">
            <Link to="/preferences" className="header__nav-link">
              Preferences
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
