import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Sidebar: React.FC = () => {
  return (
    <Card className="w-80 shadow-lg">
      <CardContent className="p-6">
        <h2 className="text-green-700 font-bold text-lg text-center">
          AN TOÀN THẬT - HIỆU QUẢ THẬT
        </h2>

        <div className="mt-4 flex flex-col gap-4">
          {/* Item 1 */}
          <div className="flex gap-3 items-center">
            <img src="https://hasaki.vn/images/graphics/img_quality_12.svg" alt="Khám & Soi Da" className="w-12 h-12" />
            <p className="text-gray-700">Khám & soi da miễn phí với Bác sĩ da liễu</p>
          </div>

          {/* Item 2 */}
          <div className="flex gap-3 items-center">
            <img src="https://hasaki.vn/images/graphics/img_quality_11.svg" alt="FDA Approved" className="w-12 h-12" />
            <p className="text-gray-700">Công nghệ hiện đại đạt chuẩn FDA Hoa Kỳ</p>
          </div>

          {/* Item 3 */}
          <div className="flex gap-3 items-center">
            <img src="https://hasaki.vn/images/graphics/img_quality_13.svg" alt="Hệ Thống Toàn Quốc" className="w-12 h-12" />
            <p className="text-gray-700">Hệ thống chi nhánh toàn quốc</p>
          </div>
        </div>

        {/* Button */}
        <Button variant="link" className="w-full text-center mt-4 text-green-600">
          Xem thêm
        </Button>
      </CardContent>
    </Card>
  );
};

export default Sidebar;
