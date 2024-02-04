import logo from "./logo.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div style={{ justifyContent: "center", display: "flex" }}>
      <Link to="/" style={{ textDecoration: "none", cursor: "pointer" }}>
        <img src={logo} alt="Logo" style={{ maxWidth: "100px" }} />
      </Link>
    </div>
  );
}
export default Header;
