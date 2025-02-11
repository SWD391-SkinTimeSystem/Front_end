import { ThumbsUp } from "lucide-react";

export default function CommentItem() {
  return (
    <div className="border-b py-5">
      {/* Tên người dùng + Ngày */}
      <p className="text-sm text-gray-600">
        <span className="text-green-700 font-semibold">N. Dương</span> - 22/09/2024
      </p>

      {/* Nội dung bình luận */}
      <p className="font-semibold text-black">
        Sẹo mới còn đỏ có lăn kim được ko a
      </p>

      {/* Nút thích */}
      <button className="flex items-center text-green-600 text-sm space-x-1 mt-1 hover:underline">
        <ThumbsUp size={14} />
        <span>Thích</span>
        <span className="text-gray-500">0</span>
      </button>
    </div>
  );
}
