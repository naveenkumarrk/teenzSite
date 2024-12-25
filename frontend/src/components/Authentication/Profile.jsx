import { Stethoscope } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userDetails, loading, error } = user;

  const userData = {
    id: userDetails._id,
    name: name,
    email: email,
    password: password,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., dispatching an action)
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
    } else {
      // Dispatch action to update user details (example)
      dispatch({ type: 'UPDATE_USER_PROFILE', payload: userData });
      setMessage("Profile updated successfully.");
    }
  };

  return (
    <div className='p-28'>
      {/* <h1>This is a simple profile for the user</h1> */}
      
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name || userDetails?.name || ""}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email || userDetails?.email || ""}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter a new password"
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            className="border p-2 w-full"
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Update Profile
        </button>
      </form>

      <h2>{name}</h2>
    </div>
  );
};

export default Profile;
