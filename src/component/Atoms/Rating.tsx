import { Star } from "lucide-react";
import { Progress } from "@/components/ui/progress"
import { useParams } from "react-router-dom";
import { useFeedback } from "@/hooks/useService";
import { useMemo } from "react";
const ratingData = [
     { rating: 5, label: "Rất hài lòng" },
     { rating: 4, label: "Hài lòng" },
     { rating: 3, label: "Bình thường" },
     { rating: 2, label: "Không hài lòng" },
     { rating: 1, label: "Rất tệ" },
   ];
export default function RatingCard() {
     const { serviceId } = useParams();
     const { feedbacks = [] } = useFeedback(serviceId || "");
     // console.log('feedbacks:', feedbacks);
     const totalRatings = feedbacks.reduce((acc, cur) => acc + cur.rating, 0);
     const ratingCount = feedbacks.length;
     const averageRating = ratingCount > 0 ? (totalRatings / ratingCount).toFixed(1) : "0.0";

     const ratingCounts = useMemo(() => {
          return (Array.isArray(feedbacks) ? feedbacks : []).reduce(
          (acc, feedback) => {
          const key = String(feedback.rating); // Chuyển số thành chuỗi để tránh lỗi TypeScript
          acc[key] = (acc[key] || 0) + 1;
          return acc;
          },
          { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 } as Record<string, number>
          );
     }, [feedbacks]);
   const totalReviews = useMemo(
     () => Object.values(ratingCounts).reduce((sum, count) => sum + count, 0),
     [ratingCounts]
   );
     return (
          <div className="max-w-4xl mx-auto p-6">
 
           <h3 className="text-lg font-semibold">Đánh giá</h3>
           <p className="text-gray-600">Đánh giá trung bình</p>
               <div className="w-full flex flex-col">

                    <div className="flex w-full">
                         {/* Điểm đánh giá trung bình */}
                         <div className="flex flex-col items-center space-x-4 mt-2 mr-20">
                              <span className="text-5xl font-bold text-orange-500 m-5">
                                   {averageRating}
                              </span>
                              <div className="flex space-x-1 py-5">
                                   {[...Array(5)].map((_, i) => (
                                        <Star key={i} fill="yellow" className="text-yellow-500" size={20} />
                                   ))}
                              </div>
                              <span className="text-gray-500 text-sm">
                                   {ratingCount} nhận xét
                              </span>
                         </div>

                         
                               {/* Danh sách đánh giá theo sao */}
                         <div className="mt-4 space-y-2 w-full">
                              {ratingData.map(({ rating, label }) => {
                              const count = ratingCounts[rating] || 0;
                              const percentage = totalReviews ? (count / totalReviews) * 100 : 0;

                              return (
                                   <div key={rating} className="flex items-center space-x-2">
                                   <span className="text-gray-700">{rating} sao</span>
                                   {/* <Progress className="w-[350px]" value={percentage} /> */}
                                   <div className="relative w-[350px] h-2 bg-gray-300 rounded-full overflow-hidden">
                                             {/* Thanh màu vàng nếu có sao */}
                                             <div
                                             className={`absolute top-0 left-0 h-full ${
                                             count > 0 ? "bg-yellow-400" : "bg-gray-300"
                                             }`}
                                             style={{ width: `${percentage}%` }}
                                             />
                                        </div>
                                   <span className="text-gray-500">{count}</span>
                                   <span className="text-gray-500 text-sm">{label}</span>
                                   </div>
                              );
                              })}
                         </div>


                     </div>

               </div>


          </div>
     );
}
