// import React from 'react'
// import { BreadcrumbDemo } from '../Atoms/Breadcrumbs'
import {
  Card,
  CardContent,
  // CardDescription,
  // CardFooter,
  // CardHeader,
  // CardTitle,
} from "@/components/ui/card"

const ServiceDetail = () => {
  // const { id } = useParams(); // Lấy ID từ URL

  return (
    <>
    <div className="flex flex-row">
        <div className="w-[50%] min-h-[300px] p-5">
          <img src="https://media.hcdn.vn/catalog/product/s/u/sua-chong-nang-anessa-duong-da-kiem-dau-60ml-moi-2-1710472390_img_385x385_622873_fit_center.jpg" alt="" />
        </div>
        <div className="w-[50%]">
        <Card className="w-full max-w-md border border-gray-200 rounded-lg shadow-lg p-4">
      <CardContent>
        <h2 className="text-lg font-semibold text-gray-900">
          Sữa Chống Nắng Anessa Dưỡng Da Kiềm Dầu 60ml (Bản Mới 2024)
        </h2>
        <p className="text-sm text-gray-600">
          Perfect UV Sunscreen Skincare Milk N SPF50+ PA++++
        </p>
        <div className="flex items-center mt-2">
          <span className="text-yellow-500">★★★★★</span>
          <span className="text-gray-600 text-sm ml-2">14 đánh giá | 68 Hỏi đáp</span>
        </div>
        <div className="bg-orange-500 text-white p-2 mt-4 rounded-md flex justify-between items-center">
          <span className="font-bold">⚡ FLASH DEAL</span>
          {/* <span className="text-lg font-semibold">KẾT THÚC TRONG {formatTime(timeLeft)}</span> */}
        </div>
        <div className="mt-4">
          <span className="text-red-500 text-2xl font-bold">503.000 đ</span>
          <span className="text-gray-500 text-sm ml-2">(Đã bao gồm VAT)</span>
        </div>
        <p className="text-gray-500 text-sm mt-1">
          Giá thị trường: <s>715.000 đ</s> - Tiết kiệm: <span className="text-red-500">212.000 đ (-30%)</span>
        </p>
      </CardContent>
    </Card>
        </div>
    </div>
    <div>

    </div>
    </>
  );
}

export default ServiceDetail