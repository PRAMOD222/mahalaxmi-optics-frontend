import React, { useState, useRef, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";

const ImageCropper = ({ handleImageChange, ratio }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const fileInputRef = useRef(null);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageSrc(reader.result);
        setIsDialogOpen(true);

        // Dynamically adjust zoom and crop position based on image dimensions
        const image = new Image();
        image.src = reader.result;
        image.onload = () => {
          const { width, height } = image;
          const aspectRatio = width / height;

          // Adjust zoom to fit the image within the crop area
          if (aspectRatio > 1) {
            // Landscape image
            setZoom(1 / aspectRatio);
          } else {
            // Portrait or square image
            setZoom(1);
          }

          // Center the crop area
          setCrop({ x: 0, y: 0 });
        };
      };
    }
  };

  const cropImage = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    const image = new Image();
    image.src = imageSrc;
    await new Promise((resolve) => (image.onload = resolve));
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;
    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );
    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], "cropped-image.jpg", { type: "image/jpeg" });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      const fileList = dataTransfer.files;

      const event = { target: { files: fileList } };
      handleImageChange(event);
      setIsDialogOpen(false);
    }, "image/jpeg");
  };

  return (
    <div className="">
      <input type="file" multiple ref={fileInputRef} onChange={onFileChange} className="hidden" />
      <Button className="px-3 mx-2 py-1 my-4 bg-[#763f98] text-white rounded-md" onClick={triggerFileSelect}>
        Add Images
      </Button>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crop Image</DialogTitle>
          </DialogHeader>
          <div className="relative w-full h-80 bg-gray-200">
            {imageSrc && (
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={ratio || 1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            )}
          </div>
          <Slider value={[zoom]} min={1} max={3} step={0.1} onValueChange={(val) => setZoom(val[0])} />
          <Button onClick={cropImage}>Crop & Save</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageCropper;