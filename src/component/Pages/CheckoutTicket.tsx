import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { QRCodeSVG } from "qrcode.react";
import { CalendarIcon, MapPinIcon, ClockIcon, TicketIcon, SquareMousePointer } from "lucide-react";

interface EventData {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  ticketPrice: number;
}

export default function CheckoutTicket() {
  const { eventId } = useParams<{ eventId: string }>();
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [step, setStep] = useState<number>(1);
  const [ticketQuantity, setTicketQuantity] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<string>("momo");
  const [agreed, setAgreed] = useState<boolean>(false);
  const [showCheckinQR, setShowCheckinQR] = useState<boolean>(false);


  useEffect(() => {
    fetch("/events.json")
      .then((res) => res.json())
      .then((data: EventData[]) => {
        console.log("Fetched event data:", data, "eventId from URL:", eventId);
        const event = data.find((ev) => ev.id === eventId);
        if (event) {
          setEventData(event);
        } else {
          console.error("Không tìm thấy sự kiện với id:", eventId);
        }
      })
      .catch((err) => {
        console.error("Error fetching event data:", err);
      });
  }, [eventId]);

  if (!eventData) {
    return <div>Loading...</div>;
  }
  
  const ticketPrice: number = eventData.ticketPrice;
  const totalPrice: number = ticketPrice * ticketQuantity;

  return (
    <div className="p-5">
      {/* Breadcrumb / Step Indicator */}
      <div className="flex items-center justify-between mb-4">
        {/* Step 1: Tickets */}
        <div className="flex items-center">
          <div
            className={`rounded-full w-8 h-8 flex items-center justify-center mr-2 ${
              step >= 1 ? "bg-green-600 text-white" : "bg-gray-300 text-gray-700"
            }`}
          >
            1
          </div>
          <span
            className={`text-sm font-semibold ${
              step >= 1 ? "text-green-600" : "text-gray-400"
            }`}
          >
            Tickets
          </span>
        </div>
        <div className="flex-1 h-[2px] bg-gray-300 mx-2"></div>

        {/* Step 2: Checkout */}
        <div className="flex items-center">
          <div
            className={`rounded-full w-8 h-8 flex items-center justify-center mr-2 ${
              step >= 2 ? "bg-green-600 text-white" : "bg-gray-300 text-gray-700"
            }`}
          >
            2
          </div>
          <span
            className={`text-sm font-semibold ${
              step >= 2 ? "text-green-600" : "text-gray-400"
            }`}
          >
            Checkout
          </span>
        </div>
        <div className="flex-1 h-[2px] bg-gray-300 mx-2"></div>

        {/* Step 3: Done */}
        <div className="flex items-center">
          <div
            className={`rounded-full w-8 h-8 flex items-center justify-center mr-2 ${
              step >= 3 ? "bg-green-600 text-white" : "bg-gray-300 text-gray-700"
            }`}
          >
            3
          </div>
          <span
            className={`text-sm font-semibold ${
              step >= 3 ? "text-green-600" : "text-gray-400"
            }`}
          >
            Done
          </span>
        </div>
      </div>

      <div className="bg-white min-h-screen text-gray-800">
        {/* Nội dung các bước */}
        <div className="space-y-6">
          {/* BƯỚC 1: TICKETS */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Thông tin sự kiện */}
              <Card className="w-full rounded-xl shadow-lg">
                <CardHeader className="bg-green-50 px-6 py-4 rounded-t-xl flex items-center gap-2">
                  <CalendarIcon className="w-6 h-6 text-green-600" />
                  <CardTitle className="text-green-700 text-2xl font-semibold">
                    Thông tin sự kiện
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4 text-gray-700">
                  <p className="flex items-center gap-2 text-2xl font-semibold">
                    <TicketIcon className="w-5 h-5 text-green-500" />
                    <span className="text-gray-800 font-semibold">
                      {eventData.title}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <ClockIcon className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">
                      {eventData.time} - {eventData.date}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPinIcon className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">{eventData.location}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <SquareMousePointer className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">{eventData.description}</span>
                  </p>
                  <p className="flex items-center gap-2 text-lg font-medium text-green-600">
                    <TicketIcon className="w-5 h-5 text-green-500" />
                    Giá vé:
                    <span className="font-bold">{ ticketPrice} vnd</span>
                  </p>
                </CardContent>
              </Card>

              {/* Chọn số lượng vé */}
              <Card className="w-full rounded-xl shadow-lg">
                <CardHeader className="bg-green-50 px-6 py-4 rounded-t-xl flex items-center gap-2">
                  <TicketIcon className="w-6 h-6 text-green-600" />
                  <CardTitle className="text-green-700 text-2xl font-semibold">
                    Chọn số lượng vé
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      value={ticketQuantity}
                      onChange={(e) =>
                        setTicketQuantity(Number(e.target.value))
                      }
                      className="w-full border-2 border-gray-300 rounded-lg px-6 py-4 text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 ease-in-out text-lg"
                    />
                   
                  </div>
                </CardContent>
              </Card>

              {/* Nút tiếp tục */}
              <div className="flex justify-end">
                <Button
                  onClick={() => setStep(2)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-transform transform hover:scale-105"
                >
                  Tiếp tục
                </Button>
              </div>
            </div>
          )}
        {/* BƯỚC 2: CHECKOUT */}
        {step === 2 && (
          <div className="space-y-6">
            {/* Countdown 5 phút */}
            <Card className="w-full rounded-none">
              <CardHeader className="bg-green-50 px-4 py-3">
                <CardTitle className="text-green-800 text-2xl font-semibold">
                  Thanh toán trong vòng 5 phút
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center space-x-4">
                <CountdownCircleTimer
                  isPlaying
                  duration={300} // 5 phút
                  colors={["#16a34a", "#F7B801", "#A30000"]}
                  colorsTime={[300, 150, 0]}
                  strokeWidth={6}
                  size={48}
                  onComplete={() => alert("Hết thời gian giữ vé!")}
                >
                  {({ remainingTime }) => {
                    const minutes = Math.floor(remainingTime / 60);
                    const seconds = remainingTime % 60;
                    return (
                      <span className="text-sm font-semibold text-green-700">
                        {minutes}:{seconds.toString().padStart(2, "0")}
                      </span>
                    );
                  }}
                </CountdownCircleTimer>
                <p className="text-gray-600">
                  Vui lòng hoàn tất thanh toán trước khi hết thời gian giữ vé.
                </p>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="w-full rounded-none">
              <CardHeader className="bg-green-100 px-4 py-3">
                <CardTitle className="text-green-800 text-2xl font-semibold">
                  Đơn hàng của bạn
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xl ">
                <div className="flex justify-between">
                  <span>Giá vé</span>
                  <span>{ticketPrice} vnd</span>
                </div>
                <div className="flex justify-between">
                  <span>Số lượng vé</span>
                  <span>{ticketQuantity}</span>
                </div>
               
                <hr className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Tổng tiền</span>
                  <span>{totalPrice} vnd</span>
                </div>
              </CardContent>
            </Card>

            {/* Chính sách & Checkbox đồng ý */}
            <Card className="w-full rounded-none">
              <CardHeader className="bg-green-100 px-4 py-3">
                <CardTitle className="text-green-800 text-2xl font-semibold">
                  Chính sách &amp; Điều khoản
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-gray-600 text-sm space-y-2">
                <p className="text-lg font-semibold">
                    <strong>Chính sách hoàn vé:</strong>  
                    Vé sẽ không được hoàn tiền sau 10 ngày trước khi sự kiện bắt đầu.  
                    Tiền hoàn lại sẽ giống với phương thức thanh toán ban đầu.  
                    Tất cả các đánh giá hoàn lại đều dựa trên chính sách của chúng tôi cũng như các điều khoản và điều kiện mua hàng của bạn.
                    </p>
                    <p className="text-lg font-semibold">
                    <strong>Miễn trừ trách nhiệm:   </strong> 
                    Tôi từ bỏ mọi khiếu nại mà tôi có thể có phát sinh từ việc tham dự sự kiện nàynày, bao gồm nhưng không giới hạn ở các khiếu nại về thương tích cá nhân, thiệt hại tài sản, trộm cắp hoặc mất mát. Tôi hiểu rằng việc tham dự sự kiện hoàn toàn là tự nguyện và tôi chịu mọi rủi ro liên quan đến việc tham dự. Sự từ bỏ này sẽ ràng buộc đối với tôi, những người thừa kế, người thi hành di chúc và người quản lý của tôi
                    </p>
                    <p className="text-lg font-semibold">
                    * Bằng cách hoàn tất quy trình thanh toán vé, tôi xác nhận rằng tôi đã đọc và đồng ý với Điều khoản dịch vụ của TENWEBNE. </p>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="agree"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="agree" className="text-lg font-semibold">
                    Tôi đồng ý với các chính sách và các điều khoản trên.
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Tabs chọn phương thức thanh toán */}
            <Card className="w-full rounded-none">
              <CardHeader className="bg-green-100 px-4 py-3">
                <CardTitle className="text-green-800 text-2xl font-semibold">
                  Phương thức thanh toán
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs defaultValue="momo" onValueChange={setPaymentMethod}>
                  <TabsList className="flex space-x-2">
                    <TabsTrigger value="momo">Momo</TabsTrigger>
                    <TabsTrigger value="zalopay">ZaloPay</TabsTrigger>
                    <TabsTrigger value="vnpay">VNPay</TabsTrigger>
                    <TabsTrigger value="card">Thẻ ngân hàng</TabsTrigger>
                  </TabsList>

                  <TabsContent value="momo" className="text-center p-4">
                    <QRCodeSVG
                      value="https://momo.vn/pay"
                      className="mx-auto"
                    />
                    <p className="text-sm mt-2 text-gray-600">
                      Quét QR để thanh toán qua Momo
                    </p>
                  </TabsContent>

                  <TabsContent value="zalopay" className="text-center p-4">
                    <QRCodeSVG
                      value="https://zalopay.vn/pay"
                      className="mx-auto"
                    />
                    <p className="text-sm mt-2 text-gray-600">
                      Quét QR để thanh toán qua ZaloPay
                    </p>
                  </TabsContent>

                  <TabsContent value="vnpay" className="text-center p-4">
                    <QRCodeSVG
                      value="https://vnpay.vn/pay"
                      className="mx-auto"
                    />
                    <p className="text-sm mt-2 text-gray-600">
                      Quét QR để thanh toán qua VNPay
                    </p>
                  </TabsContent>

                  <TabsContent value="card" className="p-4 space-y-2">
                    <Input placeholder="Số thẻ" />
                    <Input placeholder="Tên chủ thẻ" />
                    <div className="flex space-x-2">
                      <Input placeholder="MM/YY" />
                      <Input placeholder="CVV" />
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Nút "Thanh toántoán" nếu chọn thẻ, "Tôi đã thanh toán" nếu chọn phương thức khác */}
                <div className="flex justify-between">
                  <Button
                    onClick={() => setStep(1)}
                    className="bg-blue-400 hover:bg-gray-500"
                  >
                    Trước đó 
                  </Button>

                  {paymentMethod === "card" ? (
                    <Button
                      disabled={!agreed}
                      onClick={() => setStep(3)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Thanh toán
                    </Button>
                  ) : (
                    <Button
                      disabled={!agreed}
                      onClick={() => setStep(3)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Tôi đã thanh toán
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* BƯỚC 3: DONE */}
        {step === 3 && (
          <div className="space-y-6">
            <Card className="w-full rounded-none">
              <CardHeader className="bg-green-100 px-4 py-3">
                <CardTitle className="text-green-800 text-2xl font-semibold">
                  Thanh toán thành công
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Cảm ơn bạn đã đặt vé! Giao dịch của bạn đã được xác nhận.
                </p>
                <p className="text-gray-700">
                  Mã checkin của bạn: <strong>CHK12345</strong>
                </p>

                <div className="flex justify-between">
                  <Button
                    onClick={() => setShowCheckinQR(!showCheckinQR)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {showCheckinQR ? "Đóng QR Checkin" : "Xem QR Checkin"}
                  </Button>
                </div>

                {showCheckinQR && (
                  <div className="flex justify-center mt-4">
                    <QRCodeSVG value="CHK12345" size={128} />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
        </div>
     </div>

  );
}
