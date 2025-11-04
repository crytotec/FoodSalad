import { signInWithEmailAndPassword,signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "../Firebase";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface SignInProps {
  email: string;
  password: string;
}

function Signin() {
  const [signup, setSignup] = useState<SignInProps>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignup((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(Auth, signup.email, signup.password);
      alert("Login successful 🎉");
      navigate("/menu");
    } catch (error: any) {
      setError("Invalid email or password. Please try again.");
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
          Welcome Back 👋
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Sign in to continue ordering your favorite meals 🍕
        </p>

        <form onSubmit={handleSignIn} className="flex flex-col gap-4">
          {/* Email */}
          <input
            name="email"
            value={signup.email}
            onChange={handleChange}
            type="email"
            placeholder="Email Address"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-red-500"
            required
          />

          {/* Password with Show/Hide */}
          <div className="relative">
            <input
              name="password"
              value={signup.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
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

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="accent-red-600" /> Remember me
            </label>
            <Link
              to="/forgot-password"
              className="text-red-600 hover:underline font-medium"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-md transition duration-300"
          >
            Sign In
          </button>
        </form>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mt-3 text-sm">{error}</p>}

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-2 text-gray-400 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Social Sign-in */}
        <button onClick={HanddleGoodle} className="w-full border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition">
          Continue with Google
        </button>

        {/* Sign Up Redirect */}
        <p className="text-center text-gray-600 mt-6 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-red-600 hover:underline font-semibold"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signin;
