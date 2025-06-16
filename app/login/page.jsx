"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { loginUser, signupUser } from "@/store/authSlice";
import { updateCart } from "@/store/cartSlice";
import Link from "next/link";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, isLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      user.isAdmin ? router.push("/dashboard") : router.push("/cart");
    }
  }, [user, router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginUser(formData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <Link href="/signup" className="text-sm font-[800] flex justify-center text-center  mt-4 hover:underline">
          Don&apos;t have an account? Sign up
        </Link>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
}



//login page:
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { MdOutlineEmail } from "react-icons/md";
// import { RiLockPasswordLine } from "react-icons/ri";

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const router = useRouter();
//   const [error, setError] = useState('');

//   const handleLogin = async () => {
//     try {
//       const res = await fetch('http://localhost:3001/api/users/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || 'Login failed');
//         return;
//       }

//       localStorage.setItem('token', data.token);
//       localStorage.setItem('user', JSON.stringify(data.user));

//       if (data.user.role === 'admin') {
//         router.push('/admin/dashboard');
//       } else if (data.user.role === 'vendor') {
//         router.push('/vendor/dashboard');
//       } else {
//         router.push('/dashboard');
//       }
//     } catch (err) {
//       setError('Something went wrong');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Log In</h2>

//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//         <form
//           className="space-y-4"
//           onSubmit={(e) => {
//             e.preventDefault();
//             handleLogin();
//           }}
//         >
//           <div className="flex items-center border rounded-md px-3 py-2">
//             <MdOutlineEmail className="h-5 w-5 text-gray-500 mr-2" />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               className="w-full focus:outline-none"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="flex items-center border rounded-md px-3 py-2">
//             <RiLockPasswordLine className="h-5 w-5 text-gray-500 mr-2" />
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               className="w-full focus:outline-none"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md transition duration-300"
//           >
//             Sign In
//           </button>
//         </form>

//         <p className="mt-4 text-center text-sm text-gray-600">
//           Don’t have an account?{' '}
//           <a href="/signup" className="text-purple-600 hover:underline font-medium">
//             Sign Up
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }
