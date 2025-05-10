import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, formatTime } from "@/lib/utils";
import { MapPin, CalendarDays, Zap } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import RatingCard from "../Atoms/Rating";
import CommentItem from "../Atoms/Comment";
import { useService, useServiceDetail } from "@/hooks/useService";
import { useNavigate, useParams } from "react-router-dom";

const ServiceDetail = () => {
  const [activeTab, setActiveTab] = useState("detail");
  const { serviceId } = useParams();
  const navigate = useNavigate();

  // Time left calculation with memoization
  const [timeLeft, setTimeLeft] = useState(45 * 60 + 6);
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, []);

  // Service data fetching
  const { services } = useService();
  const selectedService = useMemo(
    () => services.find((s) => s.id === serviceId),
    [services, serviceId]
  );

  const { serviceDetail, loading, error } = useServiceDetail(serviceId || "");

  // Logging (can be removed in production)
  useEffect(() => {
    console.log("Service Detail Updated:", serviceDetail);
    console.log("Services Updated:", services);
  }, [serviceDetail, services]);

  // Loading and error states
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <>
      <div className="flex flex-row">
        {/* Service Image */}
        <div className="w-[50%] min-h-[300px] p-5">
          <img
            src={selectedService?.thumbnail}
            alt={selectedService?.serviceName}
            className="w-full h-[378px] max-h-[500px] object-cover rounded-md"
          />
        </div>


        {/* Service Details Card */}
        <div className="w-[50%] pr-5">
          <Card className="w-full border border-gray-200 rounded-none mt-5">
            <CardContent>
              <h2 className="text-lg font-semibold text-gray-900 mt-[10px]">
                {selectedService?.serviceName}
              </h2>

              <p className="text-sm text-gray-600 mt-2 mb-1">
                {selectedService?.description}
              </p>

              {/* Rating */}
              <div className="flex items-center mt-2">
                <span className="text-yellow-500">★★★★★</span>
                <span className="text-gray-600 text-sm ml-2">
                  14 đánh giá | 68 Hỏi đáp
                </span>
              </div>

              {/* Flash Deal */}
              <div className="bg-orange-500 text-white p-2 mt-4 rounded-md flex justify-between items-center">
                <Zap fill="white" size={20} />
                <span className="font-bold">FLASH DEAL</span>
                <span className="text-[10px] font-semibold">
                  KẾT THÚC TRONG <span className="bg-black rounded p-2">
                    {formatTime(timeLeft)}
                  </span>
                </span>
              </div>

              {/* Pricing */}
              <div className="mt-4 mb-4">
                <span className="text-red-500 text-2xl font-bold">
                  {formatCurrency(Number(selectedService?.price))}
                </span>
                <span className="text-gray-500 text-xl ml-2">
                  (Đã bao gồm VAT)
                </span>
              </div>

              {/* Market Price */}
              <p className="text-gray-500 text-sm mt-4 mb-4">
                Giá thị trường: <s>715.000 đ</s> - Tiết kiệm:
                <span className="text-red-500">212.000 đ (-30%)</span>
              </p>

              {/* Branch Availability */}
              <Button className="bg-green-100 text-green-700 flex items-center gap-2 px-4 py-2 rounded-md">
                <MapPin size={10} />
                <span>243/243 Chi Nhánh còn sản phẩm</span>
              </Button>

              {/* Booking Button */}
              <div className="flex gap-2 mt-4">
                <Button
                  className="bg-green-700 text-white flex items-center gap-2 px-4 py-2 rounded-md"
                  onClick={() => navigate(`/booking/${serviceId}`)}
                >
                  <CalendarDays size={10} />
                  <span>Book now</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Separator */}
      <div className="Seperator h-[15px]"></div>

      {/* Tabs for Details and Evaluation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="detail">Chi tiết</TabsTrigger>
          <TabsTrigger value="evaluate">Đánh giá</TabsTrigger>
        </TabsList>

        {/* Details Tab Content */}
        <TabsContent value="detail">
          <div id="ServiceDescription" className="max-w-4xl mx-auto p-6">
            <h2 className="text-xl font-bold text-center uppercase text-black">
              {selectedService?.serviceName || "Dịch vụ"}
            </h2>

            {/* Service Attributes */}
            <div className="mt-4 space-y-2 text-black">
              {[
                { label: "Hiệu quả", value: selectedService?.description },
                { label: "Thời gian", value: selectedService?.duration },
                { label: "Mức độ đau", value: "Không" },
                { label: "Xâm lấn", value: "Không" },
                { label: "Thời gian nghỉ dưỡng", value: "Không" },
                { label: "Cam kết", value: "Hiệu quả" },
                { label: "Chứng nhận máy", value: "FDA Hoa Kỳ chứng nhận an toàn, hiệu quả" }
              ].map(({ label, value }) => (
                <p key={label}>
                  <span className="font-semibold">{label}:</span>{" "}
                  {value || "Không có thông tin"}
                </p>
              ))}
            </div>

            {/* Highlight Section */}
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

            {/* Service Details Breakdown */}
            <div>
            {Array.isArray(serviceDetail?.serviceDetails) &&
  serviceDetail.serviceDetails.map((serviceDetailItem, index) => (
    <div key={serviceDetailItem.id}>
      <Card className="w-full rounded-none mt-5 border-none shadow-none">
        <CardContent className="flex flex-row items-center">
          <div className="w-1/2">
            <img
              src={selectedService?.serviceImages?.[index]?.imageURL || selectedService?.thumbnail || '/path/to/default/image.jpg'}
              alt={serviceDetailItem.name || "Service step"}
              className="w-[300px] h-[200px] object-cover"
            />
          </div>
          <div className="w-1/2">
            <h2 className="text-lg font-semibold text-gray-900">
              Ngày {serviceDetailItem.step} : {serviceDetailItem.name}
            </h2>
            <p className="text-sm text-gray-600 mt-2 mb-1">
              {serviceDetailItem.description}
            </p>

            <div className="bg-orange-500 text-white p-2 mb-4 mt-4 rounded-md flex justify-center items-center gap-2">
              <CalendarDays size={20} />
              <span className="flex items-center gap-2">
                THỰC HIỆN SAU
                <span className="bg-black rounded py-1 px-3 text-center">
                  {serviceDetailItem.dateToNextStep}
                </span>
                NGÀY
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />
      <div className="Seperator h-[15px]"></div>
    </div>
  ))}

            </div>
          </div>
        </TabsContent>

        {/* Evaluation Tab Content */}
        <TabsContent value="evaluate">
          {activeTab === "evaluate" && <RatingCard />}
          <Separator />
          <CommentItem />
        </TabsContent>
      </Tabs>
    </>
  );
}

export default ServiceDetail;