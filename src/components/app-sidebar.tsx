import * as React from "react"
import { useNavigate, useLocation } from "react-router-dom"
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
  BarChart3,
  Package,
  Calendar,
  Activity,
  FileText,
  Star,
  ChevronDown,
  ClipboardCheck,
  FileQuestion,
  Layers
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
  SidebarMenuItem,
  SidebarMenuButton,
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


const data = {
  user: {
    name: "Thư Nguyễn",
    email: "nguyenthunngoc@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Số liệu & Thống kê",
      url: "#",
      icon: BarChart3,
      roles: ["admin", "manager"],

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

  manages: [
    {
      title: "Dịch vụ",
      url: "#",
      icon: Package,
      roles: ["admin", "manager"],
      items: [
        {
          title: "Danh mục",
          url: "/manager/category",
          roles: ["admin", "manager"],
        },
        {
          title: "Dịch vụ",
          url: "/manager/service",
          roles: [ "manager"],
        },
        {
          title: "Dịch vụ",
          url: "/admin/service",
          roles: ["admin"],
        },
        
      ],
    },
    {
      title: "Sự kiện",
      url: "#",
      icon: Calendar,
      roles: ["staff", "manager", "admin"],
      items: [
        {
          title: "Sự kiện",
          url: "/staff/events",
          roles: ["staff"],
        },
        {
          title: "Sự kiện",
          url: "/manager/event",
          roles: ["manager"],
        },
        {
          title: "Người tham gia sự kiện",
          url: "#",
          roles: ["admin", "manager"],
        },
      ],
    },
    {
      title: "Lịch làm việc",
      url: "#",
      icon: CalendarCheck2,
      roles: ["staff", "manager", "therapist"],
      items: [
        {
          title: "Lịch làm việc",
          url: "staff/calendar",
          roles: ["staff"],
        },
        {
          title: "Lịch làm việc",
          url: "/therapist/calendar",
          roles: ["therapist"],
        },
        {
          title: "Lịch làm việc",
          url: "/manager/calendar",
          roles: ["manager"],
        },
      ],
    },
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
  
    // {
    //   name: "Lịch làm việc",
    //   url: "calendar",
    //   icon: CalendarCheck2,
    //   roles: ["staff"],
    // },
  ],
  manages: [
    {
      title: "Người dùng",
      url: "#",
      icon: Users,
      roles: ["admin", "manager"],
      items: [
        {
          title: "Người dùng",
          url: "/admin/user",
          roles: ["admin"],
        },
        {
          title: "Nhân viên",
          url: "/manager/staff",
          roles: ["manager"],
        },
      ],
    },
    {
      title: "Bookings",
      url: "#",
      icon: Activity,
      roles: ["admin", "manager", "staff"],
      items: [
        {
          title: "Danh sách booking",
          url: "/bookings",
          roles: ["staff", "admin", "manager"],
        },
        {
          title: "Lịch sử booking",
          url: "/bookings-history",
          roles: ["staff", "admin", "manager"],
        },
      ],
    },
    {
      title: "Phản hồi & Đánh giá",
      url: "#",
      icon: Star,
      roles: ["admin", "manager", "therapist"],
      items: [
        {
          title: "Đánh giá dịch vụ",
          url: "/manager/feedback",
          roles: [ "manager"],
        },
        {
          title: "Đánh giá dịch vụ",
          url: "/admin/feedback",
          roles: ["admin"],
        },
        {
          title: "Đánh giá dịch vụ",
          url: "/therapist/feedback",
          roles: ["therapist"],
        },
      ],
    },
    {
      title: "Voucher",
      url: "/admin/voucher",
      icon: TicketPlus,
      roles: ["admin"],
    },

    {
      title: "Quiz",
      url: "/therapist/quiz",
      icon: FileQuestion,
      roles: ["therapist"],
    },
    {
      title: "SkinType",
      url: "/therapist/skintype",
      icon: Layers, 
      roles: ["therapist"],
    },
  ],
  follow: [
    {
      title: "Booking của tôi",
      url: "/therapist/booking",
      icon: ClipboardCheck, 
      roles: ["therapist"],
    },
    {
      title: "Quiz",
      url: "/manager/quiz",
      icon: FileQuestion, 
      roles: ["manager", "admin"],
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
      title: "SkinType",
      url: "/manager/skintype",
      icon: Layers, 
      roles: ["manager", "admin"],
    },
  ],
};

const filterMenuByRole = (menu, role) => {
  if (!menu || !Array.isArray(menu)) return [];
  
  return menu
    .filter(item => item.roles?.includes(role))
    .map(item => {
      const filteredItem = { ...item };
      
      if (item.items && Array.isArray(item.items)) {
        filteredItem.items = item.items.filter(subItem => 
          subItem.roles?.includes(role)
        );
      }
      
      return filteredItem;
    })
    .filter(item => !item.items || item.items.length > 0); 
};

const useCollapsibleMenu = (initialExpanded = {}) => {
  // Khởi tạo state từ localStorage nếu có, nếu không thì dùng initialExpanded
  const [openStates, setOpenStates] = React.useState(() => {
    try {
      const storedState = localStorage.getItem('menuOpenStates');
      return storedState ? JSON.parse(storedState) : initialExpanded;
    } catch (error) {
      console.error('Error loading menu state from localStorage:', error);
      return initialExpanded;
    }
  });

  // Cập nhật localStorage khi openStates thay đổi
  React.useEffect(() => {
    try {
      localStorage.setItem('menuOpenStates', JSON.stringify(openStates));
    } catch (error) {
      console.error('Error saving menu state to localStorage:', error);
    }
  }, [openStates]);

  const toggleMenu = (menuId) => {
    setOpenStates(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  const expandMenu = (menuId) => {
    setOpenStates(prev => ({
      ...prev,
      [menuId]: true
    }));
  };

  return { openStates, toggleMenu, expandMenu };
};

const ManagementMenu = ({ items, label }) => {
  const location = useLocation();
  const { openStates, toggleMenu, expandMenu } = useCollapsibleMenu();
  const activeParentMenuRef = React.useRef(null);

  if (!items || items.length === 0) return null;

  // Tự động mở menu cha khi đang ở trang của menu con
  React.useEffect(() => {
    items.forEach(item => {
      if (item.items && item.items.length > 0) {
        // Kiểm tra xem có item con nào active không
        const hasActiveChild = item.items.some(
          subItem => location.pathname === subItem.url || location.pathname.startsWith(subItem.url)
        );
        
        if (hasActiveChild) {
          expandMenu(item.title);
          activeParentMenuRef.current = item.title;
        }
      }
    });
  }, [location.pathname, items, expandMenu]);

  return (
    <div className="py-2">
      {label && <div className="px-3 text-xs font-medium text-muted-foreground mb-2">{label}</div>}
      <nav className="grid gap-1 px-2">
        {items.map((item, index) => {
          const currentPath = location.pathname;
          const isExactActive = currentPath === item.url;
          const isParentOfActive = item.items?.some(subItem => 
            currentPath === subItem.url || currentPath.startsWith(subItem.url)
          );
          const isActive = isExactActive || isParentOfActive;
          const hasItems = item.items && item.items.length > 0;
          const isOpen = openStates[item.title] || isParentOfActive;
          
          // Xác định màu sắc cho menu active
          const activeColor = 'text-emerald-700 bg-emerald-50';
          const hoverColor = 'hover:bg-gray-100';
          
          return (
            <div key={index} className="grid">
              {hasItems ? (
                <button
                  onClick={() => toggleMenu(item.title)}
                  className={`flex items-center justify-start gap-3 rounded-md px-3 py-2 text-sm font-medium ${isActive ? activeColor : hoverColor} transition-all duration-150 ease-in-out`}
                >
                  {item.icon && <item.icon className={`h-4 w-4 ${isActive ? 'text-emerald-700' : 'text-gray-500'}`} />}
                  <span className="flex-1 text-left truncate">{item.title}</span>
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''} ${isActive ? 'text-emerald-700' : 'text-gray-500'}`} 
                  />
                </button>
              ) : (
                <a
                  href={item.url}
                  className={`flex items-center justify-start gap-3 rounded-md px-3 py-2 text-sm font-medium ${isActive ? activeColor : hoverColor} transition-all duration-150 ease-in-out`}
                >
                  {item.icon && <item.icon className={`h-4 w-4 ${isActive ? 'text-emerald-700' : 'text-gray-500'}`} />}
                  <span className="flex-1 text-left truncate">{item.title}</span>
                </a>
              )}
              
              {hasItems && isOpen && (
                <div className="grid pl-6 pt-1">
                  {item.items.map((subItem, subIndex) => {
                    const isSubActive = currentPath === subItem.url || currentPath.startsWith(subItem.url);
                    return (
                      <a
                        key={subIndex}
                        href={subItem.url}
                        className={`flex items-center justify-start gap-3 rounded-md px-3 py-2 text-sm ${isSubActive ? 'font-medium text-emerald-700 bg-emerald-50' : 'font-normal hover:bg-gray-100'} transition-all duration-150 ease-in-out`}
                      >
                        {subItem.icon && <subItem.icon className={`h-4 w-4 ${isSubActive ? 'text-emerald-700' : 'text-gray-500'}`} />}
                        <span className="text-left truncate">{subItem.title}</span>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

const CustomNavMain = ({ items, label }) => {
  const location = useLocation();

  if (!items || items.length === 0) return null;

  return (
    <div className="py-2">
      {label && <div className="px-3 text-xs font-medium text-muted-foreground mb-2">{label}</div>}
      <nav className="grid gap-1 px-2">
        {items.map((item, index) => {
          const isActive = location.pathname === item.url || location.pathname.startsWith(item.url);
          const hasItems = item.items && item.items.length > 0;
          
          return (
            <div key={index} className="grid">
              <a
                href={item.url}
                className={`flex items-center justify-start gap-3 rounded-md px-3 py-2 text-sm font-medium ${isActive ? 'text-emerald-700 bg-emerald-50' : 'hover:bg-gray-100'} transition-all duration-150 ease-in-out`}
              >
                {item.icon && <item.icon className={`h-4 w-4 ${isActive ? 'text-emerald-700' : 'text-gray-500'}`} />}
                <span className="flex-1 text-left truncate">{item.title}</span>
              </a>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export function AppSidebar({ role = "admin", ...props }) {
  const location = useLocation();
  
  const filteredData = {
    navMain: filterMenuByRole(data.navMain, role),
    manages: filterMenuByRole(data.manages, role),
    follow: filterMenuByRole(data.follow, role),
    navSecondary: filterMenuByRole(data.navSecondary, role),
  };

  const hasManages = filteredData.manages.length > 0;
  const hasFollow = filteredData.follow.length > 0;
  const hasNavMain = filteredData.navMain.length > 0;
  const hasNavSecondary = filteredData.navSecondary.length > 0;

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
      <SidebarContent className="custom-scrollbar">
        {hasNavMain && (
          <CustomNavMain items={filteredData.navMain} />
        )}
        {hasManages && (
          <ManagementMenu items={filteredData.manages} label="Quản lý" />
        )}
        {hasFollow && (
          <ManagementMenu items={filteredData.follow} label="Theo dõi" />
        )}
        {hasNavSecondary && (
          <CustomNavMain items={filteredData.navSecondary} label="Hỗ trợ" />
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}