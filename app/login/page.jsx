'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const baseApi = process.env.NEXT_PUBLIC_BASE_API;
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
            const response = await fetch(`${baseApi}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('isAdmin', data.isAdmin);
                alert('Login successful!');
                if(data.isAdmin === true) 
                    router.push('/dashboard');
                else
                    router.push('/cart'); // Redirect to a dashboard or homepage git
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <>
            {/* <Navbar /> */}
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
          
        </>
    );
}
