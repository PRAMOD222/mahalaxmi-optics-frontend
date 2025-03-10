"use client";
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Cropper from 'react-easy-crop';
import { Slider, Button } from '@mui/material';
import getCroppedImg from '@/utils/cropImage';
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle } from '@/components/ui/dialog';

const BannerForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [image, setImage] = useState(null); // For storing the selected image
    const [preview, setPreview] = useState(null); // For storing the preview URL

    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null); // Pixels for cropping
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [showCropper, setShowCropper] = useState(false);

    const [banners, setBanners] = useState([]);

    const baseApi = process.env.NEXT_PUBLIC_BASE_API;

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setImage(objectUrl);
            setShowCropper(true);
        }
    };

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleCropSave = async () => {
        try {
            const croppedImage = await getCroppedImg(image, croppedAreaPixels);
            setPreview(URL.createObjectURL(croppedImage));
            setImage(croppedImage);
            setShowCropper(false);
        } catch (e) {
            console.error('Error cropping the image:', e);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            alert('Please upload and crop an image.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('link', link);
        formData.append('image', image);

        try {
            const response = await fetch(`${baseApi}/banners/add`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message || 'Banner added successfully!');
                setTitle('');
                setDescription('');
                setLink('');
                setImage(null);
                setPreview(null);
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
            const response = await fetch(`${baseApi}/banners/all`); // Replace with your API endpoint
            const data = await response.json();
            setBanners(data);
        } catch (error) {
            console.error('Error fetching banners:', error);
        }
    };

    const handleDelete = async (bannerId) => {
        try {
            const response = await fetch(`${baseApi}/banners/delete/${bannerId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert('Banner deleted successfully');
                fetchBanners();
            } else {
                console.error('Failed to delete banner');
            }
        } catch (error) {
            console.error('Error deleting banner:', error);
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

                    <div className="p-4 ">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="title" className="block font-bold mb-1">Title:</label>
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block font-bold mb-1">Description:</label>
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="link" className="block font-bold mb-1">Link:</label>
                                <input
                                    type="text"
                                    id="link"
                                    value={link}
                                    onChange={(e) => setLink(e.target.value)}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-bold mb-1">Image:</label>
                                {preview ? (
                                    <Image height={1000} width={1000} src={preview} alt="Preview" className="w-full mb-2 object-cover rounded" />
                                ) : null}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            >
                                Submit
                            </button>
                        </form>

                        {showCropper && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                <div className="bg-white p-4 rounded shadow-md w-full max-w-2xl">
                                    <div className="relative w-full h-64">
                                        <Cropper
                                            image={image}
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

                </DialogContent>
            </Dialog>

            <section className="p-4 grid grid-cols-4 gap-4">
                {banners.map((banner) => (
                    <div key={banner._id} className="border p-4 ">
                        <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600" onClick={() => handleDelete(banner._id)}>Delete</button>
                        <h3 className="text-lg font-bold mb-2">{banner.title}</h3>
                        <p className="mb-2">{banner.description}</p>
                        {/* <p className="mb-2">Link: {`${baseApi}/${banner.image}`}</p> */}
                        <Image width={500} height={500} src={`${baseApi}/${banner.image}`} alt={banner.title} className="max-w-full h-auto" />
                    </div>
                ))}
            </section>
        </div>
    );
};

export default BannerForm;
