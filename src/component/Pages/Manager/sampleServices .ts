// Sample data for services
export const sampleServices = [
    {
      id: "1",
      serviceName: "Chăm sóc da mặt cơ bản",
      serviceGroupName: "Chăm sóc da",
      description: "Liệu trình chăm sóc da mặt toàn diện, làm sạch sâu và phục hồi làn da",
      duration: 60,
      thumbnail: "https://i.pinimg.com/474x/9f/88/01/9f880100ad711d2173157e9c9452ec19.jpg",
      serviceImages: [
        "https://i.pinimg.com/474x/9f/88/01/9f880100ad711d2173157e9c9452ec19.jpg",
        "https://i.pinimg.com/474x/9f/88/01/9f880100ad711d2173157e9c9452ec19.jpg",
        "https://i.pinimg.com/474x/9f/88/01/9f880100ad711d2173157e9c9452ec19.jpg"
      ],
      price: 350000,
      serviceDetails: [
        {
          id: "detail1",
          name: "Làm sạch da",
          description: "Loại bỏ bụi bẩn, dầu thừa và tế bào chết trên da",
          step: 1,
          duration: 15
        },
        {
          id: "detail2",
          name: "Massage mặt",
          description: "Kích thích tuần hoàn máu và thư giãn cơ mặt",
          step: 2,
          duration: 20
        },
        {
          id: "detail3",
          name: "Đắp mặt nạ",
          description: "Cung cấp dưỡng chất và phục hồi da",
          step: 3,
          duration: 15
        }
      ]
    },
    {
      id: "2",
      serviceName: "Trị liệu mụn chuyên sâu",
      serviceGroupName: "Điều trị da",
      description: "Liệu trình chuyên biệt dành cho làn da có mụn, giúp kiểm soát và làm sạch",
      duration: 90,
      thumbnail: "https://i.pinimg.com/474x/8e/b7/45/8eb745604b868fa63d684e8718325671.jpg",
      serviceImages: [
        "https://i.pinimg.com/474x/8e/b7/45/8eb745604b868fa63d684e8718325671.jpg",
        "https://i.pinimg.com/474x/8e/b7/45/8eb745604b868fa63d684e8718325671.jpg"
      ],
      price: 650000,
      serviceDetails: [
        {
          id: "detail1",
          name: "Phân tích da",
          description: "Đánh giá tình trạng da và xác định nguyên nhân mụn",
          step: 1,
          duration: 15
        },
        {
          id: "detail2",
          name: "Làm sạch sâu",
          description: "Loại bỏ mụn và tạp chất bằng các kỹ thuật chuyên nghiệp",
          step: 2,
          duration: 30
        },
        {
          id: "detail3",
          name: "Chăm sóc sau trị liệu",
          description: "Phục hồi và bảo vệ da sau quá trình điều trị",
          step: 3,
          duration: 15
        }
      ]
    },
    {
      id: "3",
      serviceName: "Massage body thư giãn",
      serviceGroupName: "Dịch vụ massage",
      description: "Liệu trình massage toàn thân giúp giảm stress và thư giãn cơ bắp",
      duration: 75,
      thumbnail: "https://i.pinimg.com/474x/8e/b7/45/8eb745604b868fa63d684e8718325671.jpg",
      serviceImages: [
        "https://i.pinimg.com/474x/8e/b7/45/8eb745604b868fa63d684e8718325671.jpg",
        "https://i.pinimg.com/474x/8e/b7/45/8eb745604b868fa63d684e8718325671.jpg",
        "https://i.pinimg.com/474x/8e/b7/45/8eb745604b868fa63d684e8718325671.jpg",
        "https://i.pinimg.com/474x/8e/b7/45/8eb745604b868fa63d684e8718325671.jpg"
      ],
      price: 450000,
      serviceDetails: [
        {
          id: "detail1",
          name: "Làm ấm cơ thể",
          description: "Sử dụng dầu massage và kỹ thuật làm ấm cơ bắp",
          step: 1,
          duration: 15
        },
        {
          id: "detail2",
          name: "Massage sâu",
          description: "Giảm căng thẳng và thư giãn toàn bộ cơ thể",
          step: 2,
          duration: 45
        },
        {
          id: "detail3",
          name: "Chăm sóc sau massage",
          description: "Cung cấp nước và hướng dẫn chăm sóc sau liệu trình",
          step: 3,
          duration: 15
        }
      ]
    }
  ];
  
  // Sample data for popular services
  export const samplePopularServices = [
    { serviceId: "1", serviceName: "Chăm sóc da mặt cơ bản", bookingCount: 45 },
    { serviceId: "2", serviceName: "Trị liệu mụn chuyên sâu", bookingCount: 22 },
    { serviceId: "3", serviceName: "Massage body thư giãn", bookingCount: 67 }
  ];