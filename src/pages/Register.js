// Register.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful!');
        console.log(data);
        navigate('/studyroom');
      } else {
        alert('Error: ' + data.message);
      }
    } catch (err) {
      console.error('Registration failed:', err);
      alert('Network error or server not reachable.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="icon"></div>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          /><br />
          <input
            name="email"
            type="email"
            placeholder="Email ID"
            value={form.email}
            onChange={handleChange}
            required
          /><br />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          /><br />
          
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;





