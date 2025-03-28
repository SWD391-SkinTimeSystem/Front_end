import * as React from "react"
import {
  UserRound,
  Users,
  Command,
  LifeBuoy,
  CalendarDays,
  CalendarCheck2,
  Tickets,
  TicketPlus,
  TicketCheck,
  Send,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// const navigate = useNavigate()
// sự thay đổi chính sẽ nằm trong đây 
// ở đây đồng nghĩa là mỗi role khác nhau sẽ có các menu khác nhau
// làm thế nào để nhận diện các route khác nhau 
// có thể sử dụng biến global để nhận diện
// truyền qua props từ tần page xuống. 
// hay là dùng zustand để nhận diện đâu là thứ cần hiển thị
// trường hợp login xong sẽ lấy được role của người dùng là ai 
// từ đó lưu vào zustand persit hoặc lấy từ localstorage để gọi ở đây
// nhưng hiện tại user chưa trả về đúng nên sẽ dùng truyền qua props để hỗ trợ việc hiển thị 

// const data = {
//   user: {
//     name: "Thư Nguyễn",
//     email: "nguyenthunngoc@gmail.com",
//     avatar: "/avatars/shadcn.jpg",
//   },
//   navMain: [
//     {
//       title: "Doanh Thu",
//       url: "#",
//       icon: SquareTerminal,
//       isActive: true,
//       items: [
//         {
//           title: "Dịch vụ",
//           url: "/admin/so-lieu/dich-vu",
//         },
//         {
//           title: "Sự kiện",
//           url: "#",
//         },
//       ],
//     },
//   ],
//   navSecondary: [
//     {
//       title: "Support",
//       url: "#",
//       icon: LifeBuoy,
//     },
//     {
//       title: "Feedback",
//       url: "#",
//       icon: Send,
//     },
//   ],
//   projects: [
//     {
//       name: "Sự kiện",
//       url: "#",
//       icon: Tickets,
//     },
//     {
//       name: "Dịch vụ",
//       url: "#",
//       icon: CalendarDays,
//     },
//     {
//       name: "Voucher",
//       url: "#",
//       icon: TicketPlus,
//     },
//   ],
//   manages: [
//     {
//       name: "Nhân viên",
//       url: "#",
//       icon: UserRound,
//     },
//     {
//       name: "Skin Therapist",
//       url: "#",
//       icon: Users,
//     },
//   ],
//   follow: [
//     {
//       name: "Đánh giá dịch vụ",
//       url: "#",
//       icon: UserRound,
//     },
//     {
//       name: "Danh sách khách hàng",
//       url: "#",
//       icon: Users,
//     },
//     {
//       name: "Lịch làm việc",
//       url: "#",
//       icon: CalendarCheck2,
//     },
//     {
//       name: "Người tham gia sự kiện",
//       url: "#",
//       icon: TicketCheck,
//     },
//   ],
// }
const data = {
  user: {
    name: "Thư Nguyễn",
    email: "nguyenthunngoc@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Doanh Thu",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      roles: ["manager"],
      items: [
        {
          title: "Dịch vụ",
          url: "/manager/satistic/service",
          roles: ["manager"],
        },
     
        {
          title: "Sự kiện",
          url: "/manager/satistic/event",
          roles: ["manager"],
        },
       
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
      roles: ["admin", "staff", "therapist"],
    },
   
    {
      title: "Feedback",
      url: "#",
      icon: Send,
      roles: ["admin", "staff"],
    },
  ],
  projects: [
    
    {
      name: "Sự kiện",
      url: "events",
      icon: Tickets,
      roles: ["staff"],
    },
    {
      name: "Sự kiện",
      url: "/manager/event",
      icon: Tickets,
      roles: ["manager"],
    },
    {
      name: "Dịch vụ",
      url: "service",
      icon: CalendarDays,
      roles: ["manager"],
    },
    {
      name: "Voucher",
      url: "#",
      icon: TicketPlus,
      roles: ["manager"],
    },
    // {
    //   name: "Lịch làm việc",
    //   url: "calendar",
    //   icon: CalendarCheck2,
    //   roles: ["staff"],
    // },
  ],
  manages: [
    {
      name: "Nhân viên",
      url: "/admin/user",
      icon: UserRound,
      roles: ["admin"],
    },
    {
      name: "Dịch vụ của tôi",
      url: "/therapist/booking",
      icon: UserRound,
      roles: ["therapist"],
    },
    {
      name: "Danh sách booking",
      url: "/staff/bookings",
      icon: UserRound,
      roles: ["staff"],
    },
    
    {
      name: "Check out dịch vụ",
      url: "#",
      icon: UserRound,
      roles: ["staff"],
    },
    {
      name: "Skin Therapist",
      url: "#",
      icon: Users,
      roles: ["admin"],
    },
  ],
  follow: [
    {
      name: "Đánh giá dịch vụ",
      url: "#",
      icon: UserRound,
      roles: ["therapist"],
    },
    {
      name: "Danh sách khách hàng",
      url: "/manager/bookings",
      icon: Users,
      roles: ["manager"],
    },
    {
      name: "Danh sách sự kiện",
      url: "/staff/ongoingevent",
      icon: Users,
      roles: ["staff"],
    },
    {
      name: "Danh sách khách hàng",
      url: "/staff/bookings",
      icon: Users,
      roles: ["staff"],
    },
    {
      name: "Lịch làm việc",
      url: "/therapist/calendar",
      icon: CalendarCheck2,
      roles: ["therapist"],
    },
    {
      name: "Người tham gia sự kiện",
      url: "#",
      icon: TicketCheck,
      roles: ["admin", "manager"],
    },
  ],
};

const filterMenuByRole = (menu: any[], role: string) => {
  return menu.filter((item) => item.roles?.includes(role));
};

export function AppSidebar({ role, ...props }: { role: string } & React.ComponentProps<typeof Sidebar>) {
  const filteredData = {
    ...data,
    navMain: filterMenuByRole(data.navMain, role),
    projects: filterMenuByRole(data.projects, role),
    manages: filterMenuByRole(data.manages, role),
    follow: filterMenuByRole(data.follow, role),
    navSecondary: filterMenuByRole(data.navSecondary, role),
  };

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-emerald-700 flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                  <Command className="size-4 bg-emerald-700 text-white" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate text-emerald-700 font-bold">HASAKI</span>
                  <span className="truncate text-emerald-700 text-xs">Quản lý</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={filteredData.navMain} />
        <NavProjects projects={filteredData.projects} label="Danh mục" />
        <NavProjects projects={filteredData.manages} label="Quản lý" />
        <NavProjects projects={filteredData.follow} label="Theo dõi" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}

