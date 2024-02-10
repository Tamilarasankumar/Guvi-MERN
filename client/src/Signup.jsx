import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import guviImage from "./assets/guvi4.png";
import './main.css';

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [slideDown, setSlideDown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    setSlideDown(true); 
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    // Validate name (should not contain numbers)
    if (/\d/.test(name)) {
      setError("Name must not contain numbers");
      return;
    }

    // Validate email (should contain @ symbol)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email address");
      return;
    }

    // Validate password (should contain more than 6 characters)
    if (password.length < 6) {
      setError("Password length must be greater than 6 characters");
      return;
    }

    // Validate password and confirm password
    if (password !== confirmPassword) {
      setError("Password and confirm password must match");
      return;
    }

    // If validation passes, make the API call
    try {
      const result = await axios.post("http://127.0.0.1:3005/register", {
        name,
        email,
        password,
      });

      console.log(result);
      navigate("/login");
    } catch (err) {
      console.log(err);

      // Check if the error is related to duplicate email
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("The email id is already exist");
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-dark vh-100">
      <div
        className={`row bg-white p-2 rounded w-75 slide-down-container ${
          slideDown ? "slide-down" : ""
        }`}
      >
        <div className="col-md-6">
          <h2 className="text-center text-success">Register</h2>

          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {error}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={() => setError(null)}
              ></button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name">
                <strong>Name</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                autoComplete="off"
                name="name"
                className="form-control rounded-0"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Email"
                autoComplete="off"
                name="email"
                className="form-control rounded-0"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter password"
                autoComplete="off"
                name="password"
                className="form-control rounded-0"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword">
                <strong>Confirm Password</strong>
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                autoComplete="off"
                name="confirmPassword"
                className="form-control rounded-0"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-success w-100 rounded-0">
              Register
            </button>
          </form>

          <p className="text-center">Already Have an Account?</p>

          <Link
            to="/login"
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
          >
            Login
          </Link>
        </div>

        <div className="col-md-6">
          <img
            src={guviImage}
            alt="Signup Image"
            className="img-fluid"
            style={{ maxHeight: "100%", maxWidth: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
