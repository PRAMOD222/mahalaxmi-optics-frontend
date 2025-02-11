'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Login successful!');
                router.push('/dashboard'); // Redirect to a dashboard or homepage
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <>
            <Navbar />
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
                    >
                        Login
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
}
