import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface GalleryProps {
  images: string[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {images.map((image, index) => (
        <Dialog key={index}>
          <DialogTrigger onClick={() => setSelectedImage(image.imageURL)}>
            <img
              src={image?.imageURL}
              alt={`Gallery Image ${index + 1}`}
              className="w-[200px] h-32 object-cover rounded-lg shadow-md cursor-pointer hover:opacity-80 transition"
            />
          </DialogTrigger>
          <DialogContent>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full h-auto rounded-lg"
              />
            )}
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};

export default Gallery;
