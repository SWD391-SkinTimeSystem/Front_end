import { Star } from "lucide-react";
import { Progress } from "@/components/ui/progress"

export default function RatingCard() {
     return (
          <>
           <h3 className="text-lg font-semibold">Đánh giá</h3>
           <p className="text-gray-600">Đánh giá trung bình</p>
          <div className="w-full flex">
               {/* Điểm đánh giá trung bình */}
               <div className="flex flex-col items-center space-x-4 mt-2 mr-20">
                    <span className="text-5xl font-bold text-orange-500 m-5">0.0</span>
                    <div className="flex space-x-1 py-5">
                         {[...Array(5)].map((_, i) => (
                              <Star key={i} fill="yellow" className="text-yellow-500" size={20} />
                         ))}
                    </div>
                    <span className="text-gray-500 text-sm">0 nhận xét</span>
               </div>

               {/* Danh sách đánh giá theo sao */}
               <div className="mt-4 space-y-2 w-full">
                    {[5, 4, 3, 2, 1].map((star) => (
                         <div key={star} className="flex items-center space-x-2">
                              <span className="text-gray-700">{star} sao</span>
                              <Progress className="w-[350px]" value={star * 20} />
                              <span className="text-gray-500">0</span>
                              <span className="text-gray-500 text-sm">
                                   {star === 5
                                        ? "Rất hài lòng"
                                        : star === 4
                                             ? "Hài lòng"
                                             : star === 3
                                                  ? "Bình thường"
                                                  : star === 2
                                                       ? "Không hài lòng"
                                                       : "Rất tệ"}
                              </span>
                         </div>
                    ))}
               </div>

               {/* Phần bình luận */}
              
               {/* //     </Card> */}
          </div>
          <div className="mt-4 border-t pt-2 pb-2 text-gray-600">
                    0 bình luận cho sản phẩm này
               </div>
          </>
     );
}
