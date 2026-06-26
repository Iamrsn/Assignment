import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

export default function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully");

    navigate("/");
  };

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="profile-container">
          <div className="profile-card">
            <h2>No User Found</h2>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="profile-container">
        <div className="profile-card">

          <div className="profile-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <h2>My Profile</h2>

          <div className="profile-info">

            <p>
              <strong>Name</strong><br />
              {user.name}
            </p>

            <p>
              <strong>Email</strong><br />
              {user.email}
            </p>

            <p>
              <strong>Mobile Number</strong><br />
              {user.mobile}
            </p>

          </div>

          <button
            className="profile-btn"
            onClick={logout}
          >
            Logout
          </button>

        </div>
      </div>
    </>
  );
}