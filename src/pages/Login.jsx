import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Login() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [pin, setPin] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, { identifier, pin });
      const { token } = response.data;
      
      localStorage.setItem('token', token);

      Swal.fire({
        title: 'Success!',
        text: 'You are logged in!',
        icon: 'success',
        confirmButtonText: 'Cool'
      });
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: 'Error!',
        text: 'Invalid login credentials.',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
    }
  };

  return (
    <div className="min-h-screen-cal -pt-16 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="card-body max-w-sm mx-auto border-2 rounded-md shadow-md">
        <h2 className="text-center text-2xl font-bold">Login to Your Account</h2>
        <input
          required
          className="input input-bordered w-full"
          type="text"
          placeholder="Email or Phone"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
        <input
          required
          className="input input-bordered w-full"
          type="password"
          placeholder="PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
        <button type="submit" className="btn btn-success w-full">Login</button>
        <h2 className="text-center">No account? Register <Link to="/register" className="text-indigo-400">here</Link></h2>
      </form>
    </div>
  );
}
