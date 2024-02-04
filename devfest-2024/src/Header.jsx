
import logo from "./logo.png";

function Header() {
    return (
      <div style={{ justifyContent: "center", display: "flex" }}>
        <img src={logo} alt="Logo" style={{ maxWidth: "100px" }} />
      </div>
    );
  }export default Header;