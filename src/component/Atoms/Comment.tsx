import { useFeedback } from "@/hooks/useService";
import { ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CommentItem() {
  const { serviceId } = useParams();
     const { feedbacks = [] } = useFeedback(serviceId || "");
     const [liked, setLiked] = useState(false);
     
     useEffect(() => {
      const storedLiked = localStorage.getItem("liked");
      if (storedLiked === "true") {
        setLiked(true);
      }
    }, []);
  
    // Khi bấm nút, cập nhật state và lưu vào localStorage
    const handleLike = () => {
      const newLiked = !liked;
      setLiked(newLiked);
      localStorage.setItem("liked", newLiked.toString());
    };
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Tên người dùng + Ngày */}
      {/* <p className="text-sm text-gray-600">
        <span className="text-green-700 font-semibold">N. Dương</span> - 22/09/2024
      </p> */}

      {/* Nội dung bình luận */}
      {/* <p className="font-semibold text-black">
        Sẹo mới còn đỏ có lăn kim được ko a
      </p> */}

      <div className="mt-4 space-y-4">
               {/* {feedbacks.map((feedback) => ( */}
               {Array.isArray(feedbacks) && feedbacks.map((feedback) => (

               <div
                    key={feedback.review_id}
                    className="border p-4 rounded-lg shadow-sm bg-white"
               >
                    <div className="flex justify-between items-center">
                    {/* Thông tin người dùng */}
                    <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-white font-bold">
                         {feedback.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                         <h4 className="font-semibold text-lg text-gray-800">
                         {feedback.username}
                         </h4>
                         <span className="text-sm text-gray-500">
                         {new Date(feedback.date).toLocaleDateString()}

                         </span>
                    </div>
                    </div>
                   
                    </div>
                    {/* Nội dung review */}
                    <p className="mt-3 text-gray-700">{feedback.review}</p>
                          {/* Nút thích */}

                    <button
                      className={`flex items-center text-sm space-x-1 mt-1 hover:underline ${
                        liked ? "text-blue-600" : "text-green-600"
                      }`}
                      onClick={handleLike}
                      >
                      <ThumbsUp size={14} />
                      <span>Thích</span>
                  </button>
        </div>
                   ))}
          </div>

     
    </div>
  );
}
