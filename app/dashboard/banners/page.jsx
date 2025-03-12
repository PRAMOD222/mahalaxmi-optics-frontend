"use client";
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Cropper from 'react-easy-crop';
import { Slider, Button } from '@mui/material';
import getCroppedImg from '@/utils/cropImage';
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from '@/components/ui/input';
import ImageCropper from '@/components/cropper/ImageCropper';
import { Button } from '@/components/ui/button';


const BannerForm = () => {


    const [banner, setBanner] = useState({
        title: '',
        link: '',
        linkText: '',
        banner_image: null,
        logo: null
    });



    const [isEditMode, setIsEditMode] = useState(false)
    const [addBannerOpen, setAddBannerOpen] = useState(false)
    const [banners, setBanners] = useState([]);
    const token = localStorage.getItem('token');
    const baseApi = process.env.NEXT_PUBLIC_BASE_API;

    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBanner((prev) => ({ ...prev, banner_image: file }));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBanner((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        console.log(e.target.files[0]);

        const { name, files } = e.target;
        setBanner((prev) => ({ ...prev, [name]: files[0] }));
    };

    const handleEdit = (banner) => {
        setBanner({
            _id : banner._id,
            title: banner.title,
            link: banner.link,
            linkText: banner.linkText,
            banner_image: banner.banner_image,
            logo: banner.logo
        });
        setIsEditMode(true);
        setAddBrandOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', banner.title);   // ✅ Fix: Use banner.title
        formData.append('linkText', banner.linkText);
        formData.append('link', banner.link);
        if (banner.logo) formData.append("logo", banner.logo);
        if (banner.banner_image) formData.append("banner_image", banner.banner_image);

        console.log("FormData:", ...formData);  // Debugging

        try {
            const response = await fetch(`${baseApi}/banners/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    // ❌ REMOVE 'Content-Type': 'multipart/form-data'
                    // ✅ Let the browser set it automatically
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message || 'Banner added successfully!');
            } else {
                const error = await response.json();
                alert(error.message || 'Failed to add banner.');
            }
        } catch (err) {
            console.error('Error adding banner:', err);
            alert('An error occurred. Please try again.');
        }
    };


    const fetchBanners = async () => {
        try {
            const response = await fetch(`${baseApi}/banners/`); // Replace with your API endpoint
            const data = await response.json();
            setBanners(data);
        } catch (error) {
            console.error('Error fetching banners:', error);
        }
    };

    const handleDelete = async (brandId) => {
        if (!confirm("Are you sure you want to delete this brand?")) return;
        try {
            await fetch(`${baseApi}/brands/${brandId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Brand deleted!");
            fetchBrands();
        } catch (error) {
            toast.error("Error deleting brand");
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    return (
        <div>

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="contained">Add Banner</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Add Banner</DialogTitle>
                    </DialogHeader>

                    <ScrollArea className="h-[80vh]  rounded-md border p-4">

                        <div className="p-4 ">
                            <div >
                                <div className="mb-4">
                                    <label htmlFor="title" className="block font-bold mb-1">Title:</label>
                                    <Input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={banner.title}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="link" className="block font-bold mb-1">Link:</label>
                                    <Input
                                        type="text"
                                        id="link"
                                        name="link"
                                        value={banner.link}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="linkText" className="block font-bold mb-1">Link Text:</label>
                                    <Input
                                        type="text"
                                        id="linkText"
                                        name="linkText"
                                        value={banner.linkText}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="logo" className="block font-bold mb-1">Logo</label>
                                    <Input
                                        type="file"
                                        id="logo"
                                        name="logo"
                                        // value={banner.logo}
                                        onChange={handleFileChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>


                                <ImageCropper ratio={16 / 9} handleImageChange={handleBannerChange} />



                                <button
                                    onClick={handleSubmit}
                                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                >
                                    Submit
                                </button>
                            </div>

                            {showCropper && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                    <div className="bg-white p-4 rounded shadow-md w-full max-w-2xl">
                                        <div className="relative w-full h-64">
                                            <Cropper
                                                image={banner_image}
                                                crop={crop}
                                                zoom={zoom}
                                                aspect={16 / 9} // Aspect ratio for the banner
                                                onCropChange={setCrop}
                                                onZoomChange={setZoom}
                                                onCropComplete={onCropComplete}
                                            />
                                        </div>
                                        <div className="flex justify-between items-center mt-4">
                                            <Slider
                                                value={zoom}
                                                min={1}
                                                max={3}
                                                step={0.1}
                                                onChange={(e, zoom) => setZoom(zoom)}
                                            />
                                            <Button variant="contained" color="primary" onClick={handleCropSave}>
                                                Save Crop
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                    </ScrollArea>

                </DialogContent>
            </Dialog>

            <section className="p-4 grid grid-cols-3 gap-4">
                {banners.map((banner) => (
                    <div key={banner._id} className="border relative">
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white">
                            <h3 className="font-semibold ">{banner.title}</h3>
                            <p className="">{banner.linkText}</p>
                        </div>

                        <Image width={500} height={500} src={`${baseApi}${banner.banner_image}`} alt={banner.title} className="max-w-full h-auto" />
                        <div className="mt-2 flex space-x-2">
                            <Button onClick={() => handleEdit(banner)} className="bg-yellow-500 text-white">Edit</Button>
                            <Button onClick={() => handleDelete(banner._id)} className="bg-red-500 text-white">Delete</Button>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default BannerForm;
