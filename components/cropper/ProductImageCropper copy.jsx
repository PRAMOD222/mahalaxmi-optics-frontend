import React, { useState, useRef, useEffect } from "react";
import Cropper from "react-easy-crop";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";

const ProductImageCropper = ({ handleImageChange,  color }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  const fileInputRef = useRef(null);

  // useEffect(() => {
  //   if (color) {
  //     setSelectedColor(color);
  //   }
  // }, []);

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
        
        const image = new Image();
        image.src = reader.result;
        image.onload = () => {
          setImageDimensions({
            width: image.width,
            height: image.height
          });
          
          const containerRatio = 1; 
          const imageRatio = image.width / image.height;
          
          // Calculate initial zoom to make image fit nicely
          if (imageRatio > containerRatio) {
            // Landscape image - fit to height
            setZoom(1 / imageRatio);
          } else {
            // Portrait image - fit to width
            setZoom(1);
          }
          
          setIsDialogOpen(true);
        };
      };
    }
  };

  const createSquareImage = async () => {
    if (!imageSrc) return;
    
    const image = new Image();
    image.src = imageSrc;
    await new Promise((resolve) => (image.onload = resolve));
    
    const size = Math.max(image.width, image.height);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = size;
    canvas.height = size;
    
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, size, size);
    
    const x = (size - image.width) / 2;
    const y = (size - image.height) / 2;
    
    ctx.drawImage(image, x, y, image.width, image.height);
    
    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], "square-image.jpg", { type: "image/jpeg" });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      const fileList = dataTransfer.files;

      const event = { target: { files: fileList } };

      console.log("color for image change:",)
      handleImageChange(event, color);
      setIsDialogOpen(false);
    }, "image/jpeg", 0.92); // Added quality parameter (0.92 = 92% quality)
  };

  // Smooth zoom handler with debounce to prevent performance issues
  const handleZoomChange = (value) => {
    setZoom(value[0]);
  };

  return (
    <div className="">
      <input type="file" multiple ref={fileInputRef} onChange={onFileChange} className="hidden" />
      <Button className="px-3 mx-2 py-1 my-4 bg-[#763f98] text-white rounded-md" onClick={triggerFileSelect}>
        Add Images
      </Button>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Adjust Image</DialogTitle>
          </DialogHeader>
          <div className="relative w-full h-80 bg-gray-200 rounded-md overflow-hidden">
            {imageSrc && (
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1} 
                onCropChange={setCrop}
                onZoomChange={setZoom}
                showGrid={false}
                restrictPosition={false}
                cropSize={{ width: 300, height: 300 }}
                classes={{
                  containerClassName: "rounded-md",
                  mediaClassName: "rounded-md",
                }}
              />
            )}
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 w-16">Zoom:</span>
              <Slider 
                value={[zoom]} 
                min={0.1} 
                max={3} 
                step={0.01}  // More granular steps for smoother control
                onValueChange={handleZoomChange}
                className="flex-1"
              />
              <span className="text-sm text-gray-600 w-12 text-right">
                {Math.round(zoom * 100)}%
              </span>
            </div>
            <div className="flex justify-between gap-2">
              <Button 
                variant="outline" 
                onClick={() => setZoom(Math.max(0.1, zoom - 0.1))}
                className="flex-1"
              >
                -
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setZoom(Math.min(3, zoom + 0.1))}
                className="flex-1"
              >
                +
              </Button>
              <Button 
                onClick={() => setZoom(1)} 
                variant="outline" 
                className="flex-1"
              >
                Reset
              </Button>
            </div>
            <Button onClick={createSquareImage} className="w-full mt-2">
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductImageCropper;