export type User = {
     id: string;
     username: string;
     fullname: string;
     avatar: string;
     email: string;
     phone: string;
     date_of_birth: string; // Có thể đổi thành Date nếu cần xử lý ngày tháng
     role: string;
     status: string;
     created_time: string; // Có thể đổi thành Date nếu muốn dùng kiểu Date
     last_modified: string; // Tương tự
};
   