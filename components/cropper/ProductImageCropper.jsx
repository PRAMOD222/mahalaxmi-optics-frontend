import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const ProductImageProcessor = ({ handleImageChange, color }) => {
  const [imageSrcs, setImageSrcs] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const fileInputRef = useRef(null);

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const processImage = (src) => {
    return new Promise((resolve) => {
      const image = new Image();
      image.src = src;
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const size = Math.max(image.width, image.height);
        canvas.width = size;
        canvas.height = size;
        
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, size, size);
        
        const x = (size - image.width) / 2;
        const y = (size - image.height) / 2;
        ctx.drawImage(image, x, y, image.width, image.height);
        
        canvas.toBlob((blob) => {
          if (!blob) return resolve(null);
          const file = new File([blob], `processed-image-${Date.now()}.jpg`, { type: "image/jpeg" });
          resolve(file);
        }, "image/jpeg", 0.92);
      };
    });
  };

  const onFileChange = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setImageSrcs(files.map(file => URL.createObjectURL(file)));
    setIsDialogOpen(true);
    setProcessingProgress(0);

    const dataTransfer = new DataTransfer();
    let processedCount = 0;

    for (const file of files) {
      try {
        const processedFile = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = async () => {
            const processed = await processImage(reader.result);
            resolve(processed);
          };
        });

        if (processedFile) {
          dataTransfer.items.add(processedFile);
        }

        processedCount++;
        setProcessingProgress(Math.round((processedCount / files.length) * 100));
      } catch (error) {
        console.error("Error processing image:", error);
      }
    }

    const fileList = dataTransfer.files;
    if (fileList.length > 0) {
      const event = { target: { files: fileList } };
      handleImageChange(event, color);
    }

    setIsDialogOpen(false);
    setImageSrcs([]);
  };

  return (
    <div>
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={onFileChange} 
        className="hidden" 
        accept="image/*"
        multiple
      />
      <Button 
        className="px-3 mx-2 py-1 my-4 bg-[#763f98] text-white rounded-md" 
        onClick={triggerFileSelect}
      >
        Add Images
      </Button>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Processing Images</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-8 gap-4">
            <p>Processing {processingProgress}% complete</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-[#763f98] h-2.5 rounded-full" 
                style={{ width: `${processingProgress}%` }}
              ></div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {imageSrcs.map((src, index) => (
                <div key={index} className="relative">
                  <img 
                    src={src} 
                    alt={`Preview ${index}`} 
                    className="w-full h-20 object-contain bg-gray-100 rounded"
                  />
                  {index < Math.floor(imageSrcs.length * (processingProgress / 100)) && (
                    <div className="absolute inset-0 bg-green-500 bg-opacity-30 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductImageProcessor;