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
      items: [
        {
          title: "Dịch vụ",
          url: "/admin/so-lieu/dich-vu",
        },
        {
          title: "Sự kiện",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Sự kiện",
      url: "#",
      icon: Tickets,
    },
    {
      name: "Dịch vụ",
      url: "#",
      icon: CalendarDays,
    },
    {
      name: "Voucher",
      url: "#",
      icon: TicketPlus,
    },
  ],
  manages: [
    {
      name: "Nhân viên",
      url: "#",
      icon: UserRound,
    },
    {
      name: "Skin Therapist",
      url: "#",
      icon: Users,
    },
  ],
  follow: [
    {
      name: "Đánh giá dịch vụ",
      url: "#",
      icon: UserRound,
    },
    {
      name: "Danh sách khách hàng",
      url: "#",
      icon: Users,
    },
    {
      name: "Lịch làm việc",
      url: "#",
      icon: CalendarCheck2,
    },
    {
      name: "Người tham gia sự kiện",
      url: "#",
      icon: TicketCheck,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} label="Danh mục"/>
        <NavProjects projects={data.manages} label="Quản lý"/>
        <NavProjects projects={data.follow} label="Theo dõi"/>

        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
