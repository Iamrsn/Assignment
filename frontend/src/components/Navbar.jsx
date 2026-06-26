import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2>MERN Store</h2>

      <div className="nav-links">
        <Link to="/add-product">Add Product</Link>

        <Link to="/liked">Liked Products</Link>

        <Link to="/profile">Profile</Link>

        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}