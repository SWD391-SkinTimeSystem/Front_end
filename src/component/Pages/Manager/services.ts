import { Service, ServiceCategory } from "../../../types/services";

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
