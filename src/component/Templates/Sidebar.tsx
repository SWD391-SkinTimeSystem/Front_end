import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator"

const Sidebar: React.FC = () => {
  return (
    <>
    <div className="w-[361px]">
      <Card className="rounded-none">
        <CardContent className="p-6">
          <h4 className="text-green-700 font-bold text-sm text-center">
            AN TOÀN THẬT - HIỆU QUẢ THẬT
          </h4>
          <div className="mt-4 flex flex-col gap-4">
            {/* Item 1 */}
            <div className="flex gap-3 items-center">
              <img src="https://hasaki.vn/images/graphics/img_quality_12.svg" alt="Khám & Soi Da" className="w-12 h-12" />
              <p className="text-gray-700 text-sm">Khám & soi da miễn phí với Bác sĩ da liễu</p>
            </div>

            {/* Item 2 */}
            <div className="flex gap-3 items-center">
              <img src="https://hasaki.vn/images/graphics/img_quality_11.svg" alt="FDA Approved" className="w-12 h-12" />
              <p className="text-gray-700 text-sm">Công nghệ hiện đại đạt chuẩn FDA Hoa Kỳ</p>
            </div>

            {/* Item 3 */}
            <div className="flex gap-3 items-center">
              <img src="https://hasaki.vn/images/graphics/img_quality_13.svg" alt="Hệ Thống Toàn Quốc" className="w-12 h-12" />
              <p className="text-gray-700 text-sm">Hệ thống chi nhánh toàn quốc</p>
            </div>
          </div>

          {/* Button */}
          <Button variant="link" className="w-full text-center mt-4 text-green-600">
            Xem thêm
          </Button>
        </CardContent>
      </Card>
      <div className="Seperator h-[15px]">

      </div>
      <Card className="w-full rounded-none shadow-none">
        <Card className="w-full max-w-sm rounded-none shadow-none overflow-hidden">
          {/* Hình ảnh */}
          <h4 className="text-black-700 font-bold text-lg text-left p-4">
            Dịch vụ xem cùng
          </h4>
          <div className="relative">
            <img
              src="https://media.hcdn.vn/catalog/product/b/c/bcn_picosure_pro-1702269747_img_300x300_b798dd_fit_center.png"
              alt="Điều trị sẹo xấu bằng Laser CO2"
              className="w-full h-48 object-cover"
            />
            {/* Banner phía trên */}
            {/* <div className="absolute top-0 left-0 w-full bg-green-700 text-white text-center p-2 ">
              BÁC SĨ DA LIỄU TRỰC TIẾP THỰC HIỆN
            </div> */}
          </div>

          <CardContent className="p-4">
            {/* Giá tiền */}
            <p className="text-orange-600 text-sm font-bold">3.300.000 đ</p>

            {/* Tiêu đề */}
            <h3 className="text-gray-900 text-sm font-bold">
              Điều trị sẹo xấu bằng Laser CO2
            </h3>

            {/* Mô tả */}
            <p className="text-gray-600 text-sm">Bác Sĩ Da Liễu Thực Hiện</p>

            {/* Thông tin thêm */}
            <div className="flex items-center text-gray-500 text-sm mt-2">
              <Clock size={16} className="mr-1" />
              <span>1 lần</span>
            </div>
          </CardContent>
        </Card>

              {/* Xem kỹ phương pháp này tại đây*/}
        <Separator />  

        <Card className="w-full py-5 max-w-sm overflow-hidden shadow-none rounded-none shadow-none">
          {/* Hình ảnh */}
          <div className="relative">
            <img
              src="https://media.hcdn.vn/catalog/product/b/c/bcn_picosure_pro-1702269747_img_300x300_b798dd_fit_center.png"
              alt="Điều trị sẹo xấu bằng Laser CO2"
              className="w-full h-48 object-cover"
            />
            {/* Banner phía trên */}
            {/* <div className="absolute top-0 left-0 w-full bg-green-700 text-white text-center p-2 ">
              BÁC SĨ DA LIỄU TRỰC TIẾP THỰC HIỆN
            </div> */}
          </div>

          <CardContent className="p-4">
            {/* Giá tiền */}
            <p className="text-orange-600 text-sm font-bold">3.300.000 đ</p>

            {/* Tiêu đề */}
            <h3 className="text-gray-900 text-sm font-bold">
              Điều trị sẹo xấu bằng Laser CO2
            </h3>

            {/* Mô tả */}
            <p className="text-gray-600 text-sm">Bác Sĩ Da Liễu Thực Hiện</p>

            {/* Thông tin thêm */}
            <div className="flex items-center text-gray-500 text-sm mt-2">
              <Clock size={16} className="mr-1" />
              <span>1 lần</span>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full py-5 max-w-sm overflow-hidden shadow-none rounded-none shadow-none">
          {/* Hình ảnh */}
          <div className="relative">
            <img
              src="https://media.hcdn.vn/catalog/product/b/c/bcn_picosure_pro-1702269747_img_300x300_b798dd_fit_center.png"
              alt="Điều trị sẹo xấu bằng Laser CO2"
              className="w-full h-48 object-cover"
            />
            {/* Banner phía trên */}
            {/* <div className="absolute top-0 left-0 w-full bg-green-700 text-white text-center p-2 ">
              BÁC SĨ DA LIỄU TRỰC TIẾP THỰC HIỆN
            </div> */}
          </div>

          <CardContent className="p-4">
            {/* Giá tiền */}
            <p className="text-orange-600 text-sm font-bold">3.300.000 đ</p>

            {/* Tiêu đề */}
            <h3 className="text-gray-900 text-sm font-bold">
              Điều trị sẹo xấu bằng Laser CO2
            </h3>

            {/* Mô tả */}
            <p className="text-gray-600 text-sm">Bác Sĩ Da Liễu Thực Hiện</p>

            {/* Thông tin thêm */}
            <div className="flex items-center text-gray-500 text-sm mt-2">
              <Clock size={16} className="mr-1" />
              <span>1 lần</span>
            </div>
          </CardContent>
        </Card>

      </Card>
      </div>
    </>
  );
};

export default Sidebar;
