import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function NotificationBell() {
  const notifications = [
    { id: 1, message: "New message received", read: false },
    { id: 2, message: "Your appointment is confirmed", read: true },
    { id: 3, message: "System maintenance at 12 AM", read: false },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative">
          <Bell className="w-8 h-8 text-white" />
          {unreadCount > 0 && (
            <p
          //     variant="outline"
              className="absolute text-red-500 bg-white font-bold top-0 right-0 h-4 w-4 flex items-center justify-center text-[10px] rounded-full"
            >
              {unreadCount}
            </p>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2">
     <div className="flex flex-row justify-between items-center">
     <h4 className="font-semibold text-gray-700 mb-2">Notifications</h4>
     <h4 className="font-semibold text-blue-700 mb-2">Mark as readed</h4>

     </div>
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={cn(
                "p-2 rounded-md text-sm",
                notif.read ? "text-gray-500" : "text-black font-semibold bg-gray-100"
              )}
            >
              {notif.message}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No new notifications</p>
        )}
      </PopoverContent>
    </Popover>
  );
}
