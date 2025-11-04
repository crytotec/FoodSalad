import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Auth } from "../Firebase";
import { FaEye, FaEyeSlash } from "react-icons/fa";


interface AuthProps {
  name: string;
  email: string;
  password: string;
  confirm: string;
}

function Signup() {
  const [form, setForm] = useState<AuthProps>({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const navigate=useNavigate()
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(Auth, form.email, form.password);
      alert("Signup successful 🎉");
      setForm({ name: "", email: "", password: "", confirm: "" });
    } catch (err: any) {
      setError(err.message);
    }
  };
   const HanddleGoodle = async () =>{
     const provider=new GoogleAuthProvider();
     try{
        await signInWithPopup(Auth, provider),
        alert('Google sign-in successfull 🎉')
        navigate("/menu");
     }catch(err:any){
      setError(err.message)
     }
   }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl w-[90%] max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-2">
          Create Account
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Join us and enjoy delicious meals anytime, anywhere 🍔
        </p>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-red-500"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-red-500"
            required
          />

          {/* Password input with toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full pr-10 focus:outline-none focus:border-red-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Confirm Password input with toggle */}
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirm"
              placeholder="Confirm Password"
              value={form.confirm}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full pr-10 focus:outline-none focus:border-red-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-md transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-2 text-gray-400 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <button onClick={HanddleGoodle} className="w-full border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition">
          Continue with Google
        </button>

        <p className="text-center text-gray-600 mt-6 text-sm">
          Already have an account?{" "}
          <Link
            to="/sigin"
            className="text-red-600 hover:underline font-semibold"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
