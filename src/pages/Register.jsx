import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!/^\d{5}$/.test(pin)) {
      Swal.fire({
        title: "Error!",
        text: "PIN must be exactly 5 digits.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
      return;
    }

    const user = { name, pin, phone, email, role };
    console.log(user);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/register`, user);
      Swal.fire({
        title: "Success!",
        text: "Your registration is successful!",
        icon: "success",
        confirmButtonText: "Cool",
      });
  
      // Navigate first, then inject the tracking script.
      navigate("/login", { replace: true });
  
      // Inject tracking script only if not already added
      if (!document.querySelector('script[src*="gaf.js"]')) {
        const script = document.createElement("script");
        script.async = true;
        script.src = "https://d1c9wriao5k55q.cloudfront.net/assets/gaf.js?t=" + (864e5 * Math.ceil(new Date() / 864e5));
        script.onload = () => {
          window.gaf("init", "ed1ac1b8-1354-4fca-b69f-dca4b89bd170");
          window.gaf("event", "pageload");
          window.gaf("event", "signup", { email: user.email });
        };
        script.onerror = () => {
          console.error("Tracking script failed to load.");
        };
        document.body.appendChild(script);
      } else {
        // If script exists, just log the signup event
        window.gaf("event", "signup", { email: user.email });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error!",
        text: "There was an error during registration.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  }  

  return (
    <div className="min-h-screen-cal -pt-16 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="card-body max-w-sm border-2 rounded-md shadow-md"
      >
        <h2 className="text-center text-2xl font-bold">Create New Account</h2>
        <input
          required
          className="input input-bordered w-full" 
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          required
          className="input input-bordered w-full"
          type="password"
          placeholder="PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
        <input
          required
          className="input input-bordered w-full"
          type="number"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          required
          className="input input-bordered w-full"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <select
          required
          className="select select-bordered w-full"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option disabled selected>
            Select Your Desired Role.
          </option>
          <option value="user">User</option>
          <option value="agent">Agent</option>
        </select>

        <button type="submit" className="btn btn-success w-full">
          Register
        </button>
        <h2 className="text-center">
          Already have an account? Login{" "}
          <Link to="/login" className="text-indigo-400">
            here
          </Link>{" "}
        </h2>
      </form>
    </div>
  );
}
