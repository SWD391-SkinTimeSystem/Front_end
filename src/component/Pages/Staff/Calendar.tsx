import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
     createViewDay,
     createViewMonthAgenda,
     createViewMonthGrid,
     createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import '@schedule-x/theme-default/dist/index.css'
import { useEffect, useState } from 'react'
import {
     Command,
     CommandDialog,
     CommandEmpty,
     CommandGroup,
     CommandInput,
     CommandItem,
     CommandList,
     CommandSeparator,
     CommandShortcut,
} from "@/components/ui/command"
import { ServiceTrackerCard } from '@/component/Organisms/ServiceTracker'

function CalendarApp() {
     const eventsService = useState(() => createEventsServicePlugin())[0]

     const calendar = useCalendarApp({
          views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
          events: [
               {
                    id: '1',
                    title: 'Event 1',
                    start: '2025-03-13',
                    end: '2025-03-13',
               },
          ],
          plugins: [eventsService]
     })

     useEffect(() => {
          // get all events
          eventsService.getAll()
     }, [])

     return (
          <div className="flex flex-row justify-between items-start w-full px-8">
          {/* Lịch bên trái */}
          <div className="w-3/4 max-w-[100vw]">
            <ScheduleXCalendar calendarApp={calendar} />
          </div>
        
          {/* Command bên phải */}
          <div className="w-1/4 ml-2">
            <Command className="w-full h-auto max-h-none overflow-visible">
              <CommandInput placeholder="Type a command or search..." />
              <CommandList className="w-full h-auto max-h-none">
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Dịch vụ đã hoàn thành">
                  <CommandItem>
                    <ServiceTrackerCard 
                    time="9:00"
                    date="Chủ Nhật, 10/08/2024"
                    service="Dịch vụ mát-xa lỗ chân lông"
                    customer="Nguyễn Văn A"
                    therapist="Lê Đỗ Hoài B"
                    />
                  </CommandItem>
                  <CommandItem> <ServiceTrackerCard 
                    time="9:00"
                    date="Chủ Nhật, 10/08/2024"
                    service="Dịch vụ mát-xa lỗ chân lông"
                    customer="Nguyễn Văn A"
                    therapist="Lê Đỗ Hoài B"
                    /></CommandItem>
                  <CommandItem> <ServiceTrackerCard 
                    time="9:00"
                    date="Chủ Nhật, 10/08/2024"
                    service="Dịch vụ mát-xa lỗ chân lông"
                    customer="Nguyễn Văn A"
                    therapist="Lê Đỗ Hoài B"
                    /></CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Dịch vụ chưa hoàn thành">
                  <CommandItem> <ServiceTrackerCard 
                    time="9:00"
                    date="Chủ Nhật, 10/08/2024"
                    service="Dịch vụ mát-xa lỗ chân lông"
                    customer="Nguyễn Văn A"
                    therapist="Lê Đỗ Hoài B"
                    /></CommandItem>
                  <CommandItem> <ServiceTrackerCard 
                    time="9:00"
                    date="Chủ Nhật, 10/08/2024"
                    service="Dịch vụ mát-xa lỗ chân lông"
                    customer="Nguyễn Văn A"
                    therapist="Lê Đỗ Hoài B"
                    /></CommandItem>
                  <CommandItem> <ServiceTrackerCard 
                    time="9:00"
                    date="Chủ Nhật, 10/08/2024"
                    service="Tắm trắng bằng tia UV"
                    customer="Nguyễn Văn Mười"
                    therapist="Lê Đỗ Hoài B"
                    /></CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </div>
        
     )
}

export default CalendarApp