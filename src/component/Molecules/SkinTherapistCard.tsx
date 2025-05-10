import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skintherapist } from "@/types/skintherapist";

interface ChildProps {
    //  onButtonClick: () => void;
     therapist: Skintherapist;
     sendDataToParent: (id: string, disable: boolean) => void;
   }

const SkinTherapistCard:React.FC<ChildProps> = ({therapist,sendDataToParent}) => {
  const handleClick = (id: string, disable : boolean) => {
      sendDataToParent(id, disable);
  }
  return (
    <Card className="w-64 p-3 shadow-lg border rounded-lg relative">
      {/* Badge giảm giá */}
      {/* <Badge className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1">
        25%
      </Badge> */}

      {/* Hình ảnh sản phẩm */}
      <div className="flex justify-center">
        <img
          src={therapist.avatar}
          alt="Fanola Hair Mask"
          className="w-40 h-40 object-cover rounded-tl-lg rounded-tr-lg"
        />
      </div>

      <CardContent className="mt-3">
        {/* Giá và thương hiệu */}
        {/* <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-orange-600">279.000 đ</span>
          <span className="text-gray-400 line-through text-sm">370.000 đ</span>
        </div> */}

        {/* Thương hiệu */}
        <p className="text-green-600 font-semibold mt-1">{therapist.name}</p>

        {/* Tên sản phẩm */}
        <p className="text-sm text-gray-800 mt-1 leading-tight">
          {therapist.about}
        </p>

        {/* Đánh giá */}
        <div className="flex items-center gap-1 mt-2">
          <Badge className="bg-emerald-700 text-white px-2 py-1 flex items-center gap-1">
            <Star size={14} className="fill-current text-yellow-400" />
            {therapist.rating}
          </Badge>
          <span className="text-gray-500 text-sm">(18)</span>
          <span className="text-gray-500 text-sm ml-auto">{therapist.reviews.length}</span>
        </div>
        <Button className="bg-emerald-700 mt-2 justify-center" onClick={() => handleClick(therapist.id,false)}>
                Chọn chuyên viên
              </Button>
        {/* Tiến độ bán hàng */}
        {/* <div className="mt-2">
          <Progress value={96} className="h-2 bg-orange-300" />
          <p className="text-right text-sm text-orange-600 mt-1">96%</p>
        </div> */}
      </CardContent>
    </Card>
  );
};

export default SkinTherapistCard;
