"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { loginUser, signupUser } from "@/store/authSlice";
import Link from "next/link";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser(formData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4">Signup</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <input
          type="phone"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />
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
          {isLoading ? "Signing up..." : "Signup"}
        </button>
        <Link
          href="/login"
          className="text-sm font-[800] flex justify-center text-center  mt-4 hover:underline"
        >
          Already have an account? Sign in
        </Link>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
}



//Signup page:
// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { IoPersonOutline, IoCallOutline } from 'react-icons/io5';
// import { MdOutlineEmail } from 'react-icons/md';
// import { RiLockPasswordLine } from 'react-icons/ri';

// export default function Signup() {
//   const router = useRouter();
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     password: '',
//     phone: '',
//   });
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSignup = async () => {
//     try {
//       const res = await fetch('http://localhost:3001/api/users/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         localStorage.setItem('token', data.token);
//         localStorage.setItem('user', JSON.stringify(data.user));
//         router.push('/');
//       } else {
//         setError(data.message || 'Signup failed');
//       }
//     } catch (err) {
//       setError('An error occurred');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>

//         {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}

//         <form className="space-y-4">
//           <div className="flex items-center border rounded-md px-3 py-2">
//             <IoPersonOutline className="h-5 w-5 text-gray-500 mr-2" />
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               className="w-full focus:outline-none"
//               onChange={handleChange}
//               value={form.name}
//             />
//           </div>

//           <div className="flex items-center border rounded-md px-3 py-2">
//             <MdOutlineEmail className="h-5 w-5 text-gray-500 mr-2" />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               className="w-full focus:outline-none"
//               onChange={handleChange}
//               value={form.email}
//             />
//           </div>

//           <div className="flex items-center border rounded-md px-3 py-2">
//             <IoCallOutline className="h-5 w-5 text-gray-500 mr-2" />
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone Number"
//               className="w-full focus:outline-none"
//               onChange={handleChange}
//               value={form.phone}
//             />
//           </div>

//           <div className="flex items-center border rounded-md px-3 py-2">
//             <RiLockPasswordLine className="h-5 w-5 text-gray-500 mr-2" />
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               className="w-full focus:outline-none"
//               onChange={handleChange}
//               value={form.password}
//             />
//           </div>

//           <button
//             type="button"
//             onClick={handleSignup}
//             className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md transition duration-300"
//           >
//             Sign Up
//           </button>
//         </form>

//         <p className="mt-4 text-center text-sm text-gray-600">
//           Already have an account?{' '}
//           <a href="/login" className="text-purple-600 hover:underline font-medium">
//             Sign In
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }
