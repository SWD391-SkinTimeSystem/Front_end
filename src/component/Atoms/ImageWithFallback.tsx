import { useState } from "react";

const defaultImage = "https://media.istockphoto.com/id/1223671392/vi/vec-to/%E1%BA%A3nh-h%E1%BB%93-s%C6%A1-m%E1%BA%B7c-%C4%91%E1%BB%8Bnh-h%C3%ACnh-%C4%91%E1%BA%A1i-di%E1%BB%87n-ch%E1%BB%97-d%C3%A0nh-s%E1%BA%B5n-cho-%E1%BA%A3nh-minh-h%E1%BB%8Da-vect%C6%A1.jpg?s=612x612&w=0&k=20&c=l9x3h9RMD16-z4kNjo3z7DXVEORzkxKCMn2IVwn9liI="; // Ảnh mặc định

const ImageWithFallback = ({ src, alt }: { src: string; alt: string }) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-40 h-40 flex items-center justify-center border border-gray-300 rounded-lg">
      {loading && (
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
      )}
      <img
        src={imageSrc}
        alt={alt}
        className={`w-full h-full object-cover ${loading ? "hidden" : "block"}`}
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setImageSrc(defaultImage); // Chuyển sang ảnh mặc định nếu ảnh chính bị lỗi
        }}
      />
    </div>
  );
};

export default ImageWithFallback;