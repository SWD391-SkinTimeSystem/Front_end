import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Phone, User, Clock, CalendarDays } from "lucide-react";
import "../../styles/global.css";
export default function ServiceCard() {
  return (
    <Card className="border shadow-none rounded-none mt-3]">
      {/* Header */}
      <div className="p-4">
        <p className="text-[10px] text-gray-500">Thẩm mỹ không xâm lấn</p>
        <h2 className="text-lg font-semibold text-gray-900">
          Mesoderm Giảm Thâm Nám (F-Melaclear)
        </h2>
      </div>

      {/* Image */}
      <img
        src="https://media.hcdn.vn/catalog/product/m/e/meso_f-melaclear_gi_m_th_m_n_m-1709197792_img_380x380_64adc6_fit_center.jpg"
        alt="Mesoderm Giảm Thâm Nám"
        className="w-full h-[250px]"
      />

      {/* Info */}
      <CardContent className="p-4 space-y-2 border">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <User fill="gray" size={16} className="text-gray-500" />
            <span className="font-semibold">6.903</span> người trải nghiệm
          </span>
          <span className="flex items-center gap-1">
            <Star size={16} fill="gray" className="text-gray-400" />
            <span>0</span> đánh giá
          </span>
        </div>

        {/* Giá & Thời gian */}
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-orange-600">700.000 đ</p>
          <div className="flex items-center justify-between">
            <Clock size={16}/>
            <p className="text-gray-500 text-sm m-2"> 1 lần | 65 phút</p>
          </div>

        </div>

        {/* Mô tả */}
        <p className="text-gray-600 text-sm">
          Meso F-Melaclear Giảm Thâm Nám mang đến giải pháp điều trị an toàn,
          hiệu quả và không cần xâm lấn.
        </p>

        {/* Buttons */}
        <div className="flex gap-2 mt-2">
          <Button className="booking text-white flex-1">
            <Phone size={16} className="mr-1" /> 1800 6324 <br/>Nhấn phím 2

          </Button>
          <Button className="bg-orange-500 text-white flex-1">
            <CalendarDays size={17} />Đặt hẹn</Button>
        </div>
      </CardContent>
    </Card>
  );
}
