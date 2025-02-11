import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { formatTime } from "@/lib/utils";
import { MapPin, CalendarDays, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import RatingCard from "../Atoms/Rating";
import CommentItem from "../Atoms/Comment";

const ServiceDetail = () => {
  // const { id } = useParams(); // Lấy ID từ URL
  const [timeLeft, setTimeLeft] = useState(45 * 60 + 6);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <>
      <div className="flex flex-row">
        <div className="w-[50%] min-h-[300px] p-5">
          <img src="https://media.hcdn.vn/catalog/product/s/u/sua-chong-nang-anessa-duong-da-kiem-dau-60ml-moi-2-1710472390_img_385x385_622873_fit_center.jpg" alt="" />
        </div>
        <div className="w-[50%] pr-5">
          <Card className="w-full border border-gray-200 rounded-none mt-5">
            <CardContent className="">
              <h2 className="text-lg font-semibold text-gray-900">
                Sữa Chống Nắng Anessa Dưỡng Da Kiềm Dầu 60ml (Bản Mới 2024)
              </h2>
              <p className="text-sm text-gray-600 mt-2 mb-1">
                Perfect UV Sunscreen Skincare Milk N SPF50+ PA++++
              </p>
              <div className="flex items-center mt-2">
                <span className="text-yellow-500">★★★★★</span>
                <span className="text-gray-600 text-sm ml-2">14 đánh giá | 68 Hỏi đáp</span>
              </div>
              <div className="bg-orange-500 text-white p-2 mt-4 rounded-md flex justify-between items-center">
                <Zap fill="white" size={20} /> <span className="font-bold"> FLASH DEAL</span>
                <span className="text-[10px] font-semibold">KẾT THÚC TRONG <span className="bg-black rounded p-2">{formatTime(timeLeft)}</span></span>
              </div>
              <div className="mt-4 mb-4">
                <span className="text-red-500 text-2xl font-bold">503.000 đ</span>
                <span className="text-gray-500 text-xl ml-2">(Đã bao gồm VAT)</span>
              </div>
              <p className="text-gray-500 text-sm mt-4 mb-4">
                Giá thị trường: <s>715.000 đ</s> - Tiết kiệm: <span className="text-red-500">212.000 đ (-30%)</span>
              </p>
              <Button className="bg-green-100 text-green-700 flex items-center gap-2 px-4 py-2 rounded-md">
                <MapPin size={10} /> <span>243/243 Chi Nhánh còn sản phẩm</span>
              </Button>
              <div className="flex gap-2 mt-4">

                <Button className="bg-green-700 text-white flex items-center gap-2 px-4 py-2 rounded-md">
                  <CalendarDays size={10} /> <span>Book now</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="Seperator h-[15px]">

      </div>
      <Tabs defaultValue="detail" className="w-full">
        <TabsList>
          <TabsTrigger value="detail">Chi tiết</TabsTrigger>
          <TabsTrigger value="evaluate">Đánh giá</TabsTrigger>
        </TabsList>
        <TabsContent value="detail">
          <div id="ServiceDescription" className="">

            <div className="max-w-4xl mx-auto p-6">
              {/* Tiêu đề */}
              <h2 className="text-xl font-bold text-center uppercase text-black">
                Sáng Mịn Tức Thì - Đánh Bay Thâm Mụn Với Công Nghệ Aqua Mesoderm.
              </h2>

              {/* Nội dung */}
              <div className="mt-4 space-y-2 text-black">
                <p>
                  <span className="font-semibold">Hiệu quả:</span> Làm mờ sạm nám, làm trắng sáng da, duy trì 1 lần da tươi trẻ sắc diện hồng hào.
                </p>
                <p>
                  <span className="font-semibold">Thời gian:</span> 61 phút.
                </p>
                <p>
                  <span className="font-semibold">Mức độ đau:</span> Không.
                </p>
                <p>
                  <span className="font-semibold">Xâm lấn:</span> Không.
                </p>
                <p>
                  <span className="font-semibold">Thời gian nghỉ dưỡng:</span> Không.
                </p>
                <p>
                  <span className="font-semibold">Cam kết:</span> Hiệu quả.
                </p>
                <p>
                  <span className="font-semibold">Chứng nhận máy:</span> FDA Hoa Kỳ chứng nhận an toàn, hiệu quả.
                </p>
              </div>

              {/* Hình ảnh */}
              <div className="mt-6 flex justify-center">
                <img
                  src="https://media.hcdn.vn/wysiwyg/Vinh/meso-duong-sang.jpg"
                  alt="Aqua Mesoderm"
                  className="rounded-lg shadow-lg w-full max-w-xl"
                />
              </div>

              {/* Banner */}
              <div className="mt-6 p-6 bg-green-900 text-white rounded-lg text-center">
                <h3 className="text-lg font-bold uppercase">
                  Đánh Bay Thâm Mụn - Sáng Mịn Tức Thì
                </h3>
                <p className="text-lg font-semibold bg-yellow-400 text-green-900 inline-block px-3 py-1 rounded-md mt-2">
                  Với Aqua Mesoderm
                </p>
                <p className="mt-2 flex items-center justify-center gap-2 text-sm">
                  ✅ Công nghệ được FDA Hoa Kỳ chứng nhận an toàn, hiệu quả.
                </p>
              </div>
            </div>
          </div>
          <div className="Seperator h-[15px]">

          </div>
          <div>
        <Card className="w-full rounded-none mt-5 border-none shadow-none">
          <CardContent className="">
            <h2 className="text-lg font-semibold text-gray-900">
              Sữa Chống Nắng Anessa Dưỡng Da Kiềm Dầu 60ml (Bản Mới 2024)
            </h2>
            <p className="text-sm text-gray-600 mt-2 mb-1">
              Perfect UV Sunscreen Skincare Milk N SPF50+ PA++++
            </p>
            {/* <div className="flex items-center mt-2">
              <span className="text-yellow-500">★★★★★</span>
              <span className="text-gray-600 text-sm ml-2">14 đánh giá | 68 Hỏi đáp</span>
            </div> */}


            <Button className="bg-green-100 text-green-700 flex my-2 items-center gap-2 px-4 py-2 rounded-md">
              <MapPin size={10} /> <span>243/243 Chi Nhánh còn sản phẩm</span>
            </Button>
            <div className="flex gap-2 mt-4 bg-green-100">
              <p className="p-4 text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lobortis enim vitae nisl scelerisque pellentesque. Quisque porta justo in feugiat porta. Donec aliquet nisi nisl, sed semper justo iaculis quis. Nam sollicitudin laoreet ornare. In hendrerit accumsan purus, sed lacinia felis faucibus a. Maecenas viverra facilisis congue. Suspendisse in consectetur velit. Aenean semper nisi sit amet dictum luctus.
              </p>

            </div>
            <div className="bg-orange-500 text-white p-2 mb-4 mt-4 rounded-md flex justify-between items-center">
              <CalendarDays size={20} /> <span className=""> THỰC HIỆN SAU NGÀY THỨ <span className="bg-black rounded py-1 px-3">2</span></span>
              {/* <span className="text-[10px] font-semibold">KẾT THÚC TRONG </span> */}
            </div>


          </CardContent>
        </Card>
      </div>
      <Separator />
      <div className="Seperator h-[15px]">

      </div>
      <div>
        <Card className="w-full rounded-none mt-5 border-none shadow-none">
          <CardContent className="">
            <h2 className="text-lg font-semibold text-gray-900">
              Sữa Chống Nắng Anessa Dưỡng Da Kiềm Dầu 60ml (Bản Mới 2024)
            </h2>
            <p className="text-sm text-gray-600 mt-2 mb-1">
              Perfect UV Sunscreen Skincare Milk N SPF50+ PA++++
            </p>



            <Button className="bg-green-100 text-green-700 flex my-2 items-center gap-2 px-4 py-2 rounded-md">
              <MapPin size={10} /> <span>243/243 Chi Nhánh còn sản phẩm</span>
            </Button>
            <div className="flex gap-2 mt-4 bg-green-100">
              <p className="p-4 text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lobortis enim vitae nisl scelerisque pellentesque. Quisque porta justo in feugiat porta. Donec aliquet nisi nisl, sed semper justo iaculis quis. Nam sollicitudin laoreet ornare. In hendrerit accumsan purus, sed lacinia felis faucibus a. Maecenas viverra facilisis congue. Suspendisse in consectetur velit. Aenean semper nisi sit amet dictum luctus.
              </p>

            </div>
            <div className="bg-orange-500 text-white p-2 mb-4 mt-4 rounded-md flex justify-between items-center">
              <CalendarDays size={20} /> <span className=""> THỰC HIỆN SAU <span className="bg-black rounded py-1 px-3">2</span> NGÀY</span>
            </div>


          </CardContent>
        </Card>
      </div>
      <div className="Seperator h-[15px]">

      </div>
      <div>

      </div>
        </TabsContent>
        <TabsContent value="evaluate" className="p-5">
          <RatingCard />
          <Separator />
          <CommentItem />
          <CommentItem />
          <CommentItem />
          <CommentItem />
          <CommentItem />
          <CommentItem />
        </TabsContent>
      </Tabs>


      
    </>
  );
}

export default ServiceDetail