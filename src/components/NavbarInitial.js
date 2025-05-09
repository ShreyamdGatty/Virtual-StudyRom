import { Link } from "react-router-dom";
import "./NavbarInitial.css";

const NavbarInitial = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/Register" className="nav-link">Home</Link>
      </div>
    </nav>
  );
};

export default NavbarInitial;




