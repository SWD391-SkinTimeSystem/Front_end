import '../../styles/global.css';

export default function Footer() {
  return (
    <footer className="text-white py-8">
      <div className="container mx-auto grid grid-cols-4 gap-8 px-8">
        {/* Hỗ trợ khách hàng */}
        <div>
          <h3 className="font-bold mb-3">HỖ TRỢ KHÁCH HÀNG</h3>
          <p className="text-orange-400 font-semibold">Hotline: <span className="text-orange-500">1800 6324</span></p>
          <p className="text-sm">(miễn phí, 08-22h kể cả T7, CN)</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>Các câu hỏi thường gặp</li>
            <li>Gửi yêu cầu hỗ trợ</li>
            <li>Hướng dẫn đặt hàng</li>
            <li>Phương thức vận chuyển</li>
            <li>Chính sách đổi trả</li>
          </ul>
        </div>

        {/* Về Hasaki.vn */}
        <div>
          <h3 className="font-bold mb-3">VỀ HASAKI.VN</h3>
          <ul className="space-y-2 text-sm">
            <li>Giới thiệu Hasaki.vn</li>
            <li>Tuyển dụng</li>
            <li>Chính sách bảo mật</li>
            <li>Điều khoản sử dụng</li>
            <li>Liên hệ</li>
          </ul>
        </div>

        {/* Hợp tác & Liên kết */}
        <div>
          <h3 className="font-bold mb-3">HỢP TÁC & LIÊN KẾT</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="https://hasaki.vn/clinic" className="text-blue-400">https://hasaki.vn/clinic</a></li>
            <li>Hasaki cẩm nang</li>
          </ul>
          <h3 className="font-bold mt-4">THANH TOÁN</h3>
        </div>

        {/* Cập nhật thông tin khuyến mãi */}
        <div>
          <h3 className="font-bold mb-3">CẬP NHẬT THÔNG TIN KHUYẾN MÃI</h3>
          <div className="flex">
            <input 
              type="email" 
              placeholder="email của bạn" 
              className="p-2 flex-1 rounded-l-lg border border-gray-300 text-black"
            />
            <button className="bg-orange-500 px-4 rounded-r-lg text-white font-semibold">Đăng ký</button>
          </div>
        </div>
      </div>
    </footer>
  );
}