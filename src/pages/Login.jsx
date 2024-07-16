import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [pin, setPin] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ identifier, pin })
    // try {
    //   const res = await axios.post('/api/auth/login', { identifier, pin });
    //   localStorage.setItem('token', res.data);
    //   history.push('/dashboard');
    // } catch (err) {
    //   console.error(err);
    // }
  };

  return (
    <div className="min-h-screen-cal -pt-16 flex items-center justify-center">
      <form onSubmit={handleSubmit}  className="card-body max-w-sm mx-auto border-2 rounded-md shadow-md">
        <h2 className="text-center text-2xl font-bold">Login to Your Account</h2>
        <input required
          className="input input-bordered w-full"
          type="text"
          placeholder="Email or Phone"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
        <input required
          className="input input-bordered w-full"
          type="password"
          placeholder="PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
        <button type="submit" className="btn btn-success w-full">Login</button>
        <h2 className="text-center">No account? Register <Link to="/register" className="text-indigo-400">here</Link> </h2>
      </form>
    </div>
    );
}
