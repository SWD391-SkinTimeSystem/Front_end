import { Service, ServiceCategory, SkinTypeOptions } from "../../../../types/services";
interface ServiceType {
  serviceNameId:string,
  serviceName: string;
  description?: string;
  price?: number;
  image: string
}
interface Category {
  serviceGroupId: string;
  serviceGroupName: string;
  description?: string;
  image?: string;
}


export const mockServiceCategories: ServiceCategory[] = [
  {
    serviceGroupId: "sg-1",
    serviceGroupName: "Dịch vụ chăm sóc da mặt"
  },
  {
    serviceGroupId: "sg-2",
    serviceGroupName: "Dịch vụ điều trị da"
  },
  {
    serviceGroupId: "sg-3",
    serviceGroupName: "Dịch vụ thư giãn & spa"
  }
];

export const mockServices: Service[] = [
  {
    serviceGroupId: "sg-1",
    id: "1",
    serviceName: "Trẻ hóa da mặt",
    description: "Liệu trình tái tạo da chuyên sâu giúp làm mờ nếp nhăn, cải thiện độ đàn hồi",
    duration: 60,
    price: 1200000,
    thumbnail: "https://i.pinimg.com/474x/ec/82/5e/ec825e41d6849c07e1860e6d21dead13.jpg",
    serviceImages: [],
    serviceDetails: [
      {
        id: "1-1",
        name: "Làm sạch da",
        description: "Làm sạch sâu với sản phẩm chuyên dụng",
        step: 1,
        duration: 10,
        dateToNextStep: 0
      },
      {
        id: "1-2",
        name: "Tẩy tế bào chết",
        description: "Loại bỏ tế bào chết với enzyme tự nhiên",
        step: 2,
        duration: 15,
        dateToNextStep: 0
      }
    ]
  },
  {
    serviceGroupId: "sg-2",
    id: "2",
    serviceName: "Điều trị mụn chuyên sâu",
    description: "Phương pháp điều trị mụn toàn diện với công nghệ hiện đại",
    duration: 90,
    price: 1500000,
    thumbnail: "https://i.pinimg.com/474x/ec/82/5e/ec825e41d6849c07e1860e6d21dead13.jpg",
    serviceImages: []
  },
  {
    serviceGroupId: "sg-1",
    id: "3",
    serviceName: "Massage mặt thải độc",
    description: "Giúp thải độc, cải thiện tuần hoàn máu và đào thải độc tố",
    duration: 45,
    price: 800000,
    thumbnail: "https://i.pinimg.com/474x/ec/82/5e/ec825e41d6849c07e1860e6d21dead13.jpg",
    serviceImages: []
  }
];


export const mockSkinTypes: SkinTypeOptions[] = [
  {
    id: "01",
    nameSkinType: "da dầu "
  },
  {
    id: "02",
    nameSkinType: "da khô "
  }, {
    id: "03",
    nameSkinType: "da bình thường "
  }
];

export const servicesList: ServiceType[] = [
  {
    serviceNameId: "svc001",
    serviceName: "Chăm sóc da mặt cơ bản",
    description: "Làm sạch sâu, cấp ẩm và massage thư giãn.",
    price: 300000,
    image: "https://i.pinimg.com/474x/2c/19/1f/2c191f58510bf075b6c3035083c4d00b.jpg",
  },
  {
    serviceNameId: "svc002",
    serviceName: "Trị mụn chuyên sâu",
    description: "Liệu trình đặc biệt giúp làm sạch nhân mụn và giảm viêm.",
    price: 500000,
    image: "https://i.pinimg.com/474x/2c/19/1f/2c191f58510bf075b6c3035083c4d00b.jpg",
  },
  {
    serviceNameId: "svc003",
    serviceName: "Trẻ hóa da bằng công nghệ Laser",
    description: "Ứng dụng công nghệ laser hiện đại để làm sáng và mịn da.",
    price: 1200000,
    image: "https://i.pinimg.com/474x/2c/19/1f/2c191f58510bf075b6c3035083c4d00b.jpg",
  },
  {
    serviceNameId: "svc004",
    serviceName: "Ủ trắng da toàn thân",
    description: "Liệu trình dưỡng trắng da kết hợp tẩy tế bào chết.",
    price: 800000,
    image: "https://i.pinimg.com/474x/2c/19/1f/2c191f58510bf075b6c3035083c4d00b.jpg",
  },
  {
    serviceNameId: "svc005",
    serviceName: "Thải độc da với liệu pháp thiên nhiên",
    description: "Sử dụng thảo dược và dưỡng chất để thanh lọc da.",
    price: 400000,
    image: "https://i.pinimg.com/474x/2c/19/1f/2c191f58510bf075b6c3035083c4d00b.jpg",
  },
];

export const categories: Category[] = [
  {
    serviceGroupId: "sg-001",
    serviceGroupName: "Chăm Sóc Da Mặt",
    description: "Dịch vụ giúp làn da khỏe mạnh, sáng mịn và tươi trẻ.",
    image: "https://i.pinimg.com/474x/f4/5c/36/f45c3603aaf44bf6c97ea64ae0f64c46.jpg",
  },
  {
    serviceGroupId: "sg-002",
    serviceGroupName: "Trị Liệu Da",
    description: "Giải pháp chuyên sâu để cải thiện các vấn đề về da như mụn, nám, lão hóa.",
    image: "https://i.pinimg.com/474x/f4/5c/36/f45c3603aaf44bf6c97ea64ae0f64c46.jpg",
  },
  {
    serviceGroupId: "sg-003",
    serviceGroupName: "Massage Thư Giãn",
    description: "Liệu pháp giúp thư giãn, giảm căng thẳng và tăng cường lưu thông máu.",
    image: "https://i.pinimg.com/474x/f4/5c/36/f45c3603aaf44bf6c97ea64ae0f64c46.jpg",
  },
  {
    serviceGroupId: "sg-004",
    serviceGroupName: "Dưỡng Da Chuyên Sâu",
    description: "Dịch vụ cung cấp dưỡng chất cần thiết để duy trì làn da trẻ trung và khỏe mạnh.",
    image: "https://i.pinimg.com/474x/f4/5c/36/f45c3603aaf44bf6c97ea64ae0f64c46.jpg",
  },

  {
    serviceGroupId: "sg-005",
    serviceGroupName: "Massage Thư Giãn",
    description: "Liệu pháp giúp thư giãn, giảm căng thẳng và tăng cường lưu thông máu.",
    image: "https://i.pinimg.com/474x/f4/5c/36/f45c3603aaf44bf6c97ea64ae0f64c46.jpg",
  },
  {
    serviceGroupId: "sg-006",
    serviceGroupName: "Dưỡng Da Chuyên Sâu",
    description: "Dịch vụ cung cấp dưỡng chất cần thiết để duy trì làn da trẻ trung và khỏe mạnh.",
    image: "https://i.pinimg.com/474x/f4/5c/36/f45c3603aaf44bf6c97ea64ae0f64c46.jpg",
  },
];
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
