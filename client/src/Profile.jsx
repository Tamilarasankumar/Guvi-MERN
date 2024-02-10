import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [mobile, setMobile] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setError('');
    axios
      .post('http://127.0.0.1:3005/getProfile', { email: email })
      .then((result) => {
        if (result.data.status === 'success') {
          setName(result.data.data.name);
          setAge(result.data.data.age);
          setGender(result.data.data.gender);
          setDob(result.data.data.dob);
          setMobile(result.data.data.mobile);
        }
      })
      .catch((e) => {
        console.error('Error occurred', e);
      });
  }, [email]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !age || !gender || !mobile || !dob) {
      setError('All fields are required');
      return;
    }

    // Username validation
    if (/\d/.test(name)) {
      setError('Name must not contain numbers');
      return;
    }

    // Mobile number validation
    const isMobileValid = (number) => /^\d{10}$/.test(number);
    if (!isMobileValid(mobile)) {
      setError('Mobile number must be 10 digits');
      return;
    }

    // Age validation
    if (!/^\d+$/.test(age)) {
      setError('Age must contain only numbers');
      return;
    }

    // Date of Birth Validation
    const dobRegex = /^\d{2}-\d{2}-\d{4}$/;
    if (!dobRegex.test(dob)) {
      setError('Invalid Date of Birth format. Use DD-MM-YYYY');
      return;
    }

    axios
      .post('http://127.0.0.1:3005/profile', { name, email, age, gender, mobile, dob })
      .then((result) => {
        console.log(result);
        setSuccessMessage('Profile updated successfully');
      })
      .catch((err) => {
        console.error(err);
        setError('An error occurred while updating the profile. Please try again.');
      });
  };

  const handleLogout = () => {
    navigate('/register', { replace: true });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div className="bg-white p-3 rounded w-50">
        <h2 className="text-center text-success">User Profile</h2>

        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={() => setError('')}
            ></button>
          </div>
        )}

        {successMessage && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            {successMessage}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={() => setSuccessMessage('')}
            ></button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Full Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="name"
              className="form-control rounded-0"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="age">
              <strong>Age</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Age"
              autoComplete="off"
              name="age"
              className="form-control rounded-0"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="gender">
              <strong>Gender</strong>
            </label>
            <div className="d-flex">
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  autoComplete="off"
                  name="gender"
                  value="Male"
                  checked={gender === 'Male'}
                  className="form-check-input"
                  onChange={(e) => setGender(e.target.value)}
                />
                <label className="form-check-label">Male</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  autoComplete="off"
                  name="gender"
                  value="Female"
                  checked={gender === 'Female'}
                  className="form-check-input"
                  onChange={(e) => setGender(e.target.value)}
                />
                <label className="form-check-label">Female</label>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="dob">
              <strong>Date of Birth</strong>
            </label>
            <input
              type="text"
              placeholder="DD-MM-YYYY"
              autoComplete="off"
              name="dob"
              className="form-control rounded-0"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="mobile">
              <strong>Mobile Number</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Mobile Number"
              autoComplete="off"
              name="mobile"
              className="form-control rounded-0"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>

          <button className="btn btn-default border w-100 bg-success rounded-0 text-decoration-none">
            Submit
          </button>
        </form>
      </div>

      <div className="position-fixed top-0 end-0 m-3">
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
