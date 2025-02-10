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
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const ServiceDetail = () => {
  // const { id } = useParams(); // Lấy ID từ URL
  const product = {
    id: 11,
    name: "Nước Hoa Hồng Klairs",
    price: 250000,
    description: "Nước hoa hồng không mùi dành cho da nhạy cảm.",
    image: "https://via.placeholder.com/400",
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card className="shadow-lg">
        <CardContent className="p-6 flex flex-col md:flex-row gap-6">
          {/* Hình ảnh sản phẩm */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full md:w-1/2 rounded-lg"
          />

          {/* Thông tin sản phẩm */}
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <Separator />
            <p className="text-gray-600">{product.description}</p>
            <h2 className="text-xl font-semibold text-red-500">
              {product.price.toLocaleString()} VND
            </h2>
            <Button className="w-full md:w-auto">Thêm vào giỏ hàng</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ServiceDetail