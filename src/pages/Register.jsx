import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ name, pin, phone, email })
    // try {
    //   await axios.post('/api/auth/register', { name, pin, phone, email });
    //   history.push('/login');
    // } catch (err) {
    //   console.error(err);
    // }
  };

  return (
    <div className="min-h-screen-cal -pt-16 flex items-center justify-center">
      
      <form onSubmit={handleSubmit} className="card-body max-w-sm border-2 rounded-md shadow-md">
        <h2 className="text-center text-2xl font-bold">Create New Account</h2>
        <input required
          className="input input-bordered w-full"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input required
          className="input input-bordered w-full"
          type="password"
          placeholder="PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
        <input required
          className="input input-bordered w-full"
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input required
          className="input input-bordered w-full"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="btn btn-success w-full">Register</button>
        <h2 className="text-center">Already have an account? Login <Link to="/login" className="text-indigo-400">here</Link> </h2>
      </form>
    </div>
  );
}
