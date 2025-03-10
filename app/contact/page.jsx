"use client"
import React, { useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import Link from 'next/link';
function Page() {
    const [formdata, setFormdata] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        let toastId = null;
        console.log(formdata);
        try {
            toastId = toast.loading('Submitting...', {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            const response = await fetch('/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formdata),
            });
            console.log(response);
            if (response.ok) {
                toast.update(toastId, {
                    render: 'Information Submitted successfully',
                    type: 'success',
                    isLoading: false,
                    autoClose: 3000,
                });
                setFormdata({
                    name: '',
                    email: '',
                    message: '',
                });
            } else {
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            toast.update(toastId, {
                render: 'Submission failed. Please try again.',
                type: 'error',
                isLoading: false,
                autoClose: 3000,
            });
            console.log(error);
        }
    };
    return (
        <div>
            {/* <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            /> */}
            
            <section className="md:mx-28 py-10  mx-4">
                <div className="flex sm:flex-nowrap flex-wrap gap-10">
                    <div className="lg:w-2/3 relative md:w-1/2 w-full rounded-lg overflow-hidden flex items-end justify-start ">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.57112776275!2d74.23848387491849!3d16.698331284076083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc10015614bcdbd%3A0xa21ed78dd9cdafa4!2sOptical%20Hut%20MAHALAXMI%20OPTICAL%20TRADERS!5e0!3m2!1sen!2sin!4v1739360419071!5m2!1sen!2sin" width="100%" height="100%" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        
                    </div>
                    <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-0 mt-8 md:mt-0">
                        <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Contact Us</h2>


                        <div className="lg:w-1/2  mt-4 lg:mt-0 text-gray-600 py-2">
                            <h2 className="title-font font-semibold text-gray-600 tracking-widest text-xs">EMAIL</h2>
                            <Link href='mailto:info@samarthenterprisess.in' className="text-red-500 leading-relaxed">info@opticalhut.in</Link>
                            <h2 className="title-font font-semibold text-gray-600 tracking-widest text-xs mt-4">PHONE</h2>
                            <div className='flex flex-col'>
                                <div className='flex whitespace-nowrap gap-'>
                                    <span>
                                        Madan Deshpande 
                                    </span>
                                    <br />
                                    <Link href='tel:+919822002973' className="leading-relaxed"> +91 9822002973
                                    </Link>
                                    <br />
                                </div>

                                
                            </div>
                        </div>


                        <p className="leading-relaxed mb-5 text-gray-600">C-4, Haripriya Plaza, Main Besides Dominos Pizza, Rajaram Rd, Rajarampuri, Kolhapur, Maharashtra 416008</p>
                        <form action="" onSubmit={handleSubmit} className="p-2 w-full">
                            <div className="flex flex-wrap -m-2">
                                <div className="p-2 w-1/2">
                                    <div className="">
                                        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formdata.name}
                                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                            onChange={(e) => setFormdata({ ...formdata, name: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="p-2 w-1/2">
                                    <div className="">
                                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formdata.email}
                                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                            onChange={(e) => setFormdata({ ...formdata, email: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="p-2 w-full">
                                    <div className="">
                                        <label htmlFor="message" className="leading-7 text-sm text-gray-600">Message</label>
                                        <input
                                            type="text"
                                            id="message"
                                            name="message"
                                            value={formdata.message}
                                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                            onChange={(e) => setFormdata({ ...formdata, message: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="p-2 w-full">
                                    <button className="flex mx-auto text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 hover:text-gray-50 rounded text-lg" type='submit'>Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Page
