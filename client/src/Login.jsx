import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import loginImage from './assets/guvi3.png';
import './main.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    if (!email || !password) {
      setError('All fields are required');
      return;
    } else {
      setError(null);
    }

    axios
      .post('http://127.0.0.1:3005/login', { email, password })
      .then((result) => {
        console.log('data from the backend ', result.data);
        if (result.data.status === 'success') {
          navigate('/profile', { state: { email } });
        } else {
          setError(result.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setError('An error occurred while logging in. Please try again.');
      });
  };

  useEffect(() => {
    setShowForm(true); 
  }, []);

  return (
    <div className={`d-flex justify-content-center container-fluid align-items-center bg-dark vh-100`}>
      <div className={`row bg-white p-2 rounded w-75 slide-down-container ${showForm ? 'slide-down' : ''}`}>
        <div className="col-md-6">
          <img
            src={loginImage}
            alt="Login Image"
            className="img-fluid"
            style={{ maxHeight: "100%", maxWidth: "100%" }}
          />
        </div>

        <div className="col-md-6">
          <h2 className="text-center text-success">Login</h2>

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

            <button type="submit" className="btn btn-success w-100 rounded-0">
              Login
            </button>
          </form>

          <p className="text-center">Don't have an account?</p>
          <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
            SignUp
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
