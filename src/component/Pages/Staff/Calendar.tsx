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
import { useAvailability } from '@/hooks/useSchedule'
import { TherapistSchedule } from '@/types/schedule'
import { removeSeconds } from '@/lib/utils'

type FormattedEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
};

function CalendarApp() {
  const [eventsService] = useState(() => createEventsServicePlugin())
  const { schedule, isLoading, error, success, getSchedules } = useAvailability();

  const transformEvents = (events: TherapistSchedule[]): FormattedEvent[] => {
    console.log('Raw events:', events); // Debug log
    const formattedEvents = events?.map(event => {
      const formattedEvent = {
        id: event.id,
        title: event.step_name,
        start: `${event.expected_date} ${removeSeconds(event.expected_start_time)}`,
        end: `${event.expected_date} ${removeSeconds(event.expected_end_time)}`,
      };
      console.log('Formatted event:', formattedEvent); // Debug log
      return formattedEvent;
    }) || [];

    console.log('Formatted events:', formattedEvents); // Debug log
    return formattedEvents;
  };

  useEffect(() => {
    getSchedules()
  }, [])

  // Kiểm tra điều kiện schedule
  console.log('Schedule:', schedule);
  console.log('Is Loading:', isLoading);
  console.log('Error:', error);
  const [key, setKey] = useState(0);

  const schedules = transformEvents(schedule);

  useEffect(() => {
    if (schedules.length > 0) {
      setKey(prev => prev + 1); // Thay đổi key để ép re-render
    }
  }, [schedule]);  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda()
    ],
    events: 
     schedules
//     [
      
         
// { id: '6c6bf966-8aee-4826-9b77-1aa907d6c182', title: 'Đắp mặt nạ thải độc', start: '2025-03-31 00:00', end: '2025-03-31 00:00' },

//       { id: 'c89fe887-5c13-44de-a1ff-4e62f149c9c2', title: 'Làm sạch sâu', start: '2025-04-02 13:30', end: '2025-04-02 14:00' },

//       { id: 'd5276154-66c7-4f37-aeee-324176f2c509', title: 'Làm sạch sâu', start: '2025-03-27 10:00', end: '2025-03-27 10:30' },
//       {id: '0948c1c7-b879-4add-974c-69f7526e256c', title: 'Đắp mặt nạ thải độc', start: '2025-04-02 00:00', end: '2025-04-02 00:00'},
//       {id: 'd5276154-66c7-4f37-aeee-324176f2c509', title: 'Làm sạch sâu', start: '2025-03-27 10:00', end: '2025-03-27 10:30'},
//       {id: 'ad0f9ca2-b0dc-4ea4-a755-afd1ef059f29', title: 'Làm sạch sâu', start: '2025-03-28 10:00', end: '2025-03-28 10:30'},
//       {id: '98b3caf5-80fd-492f-896d-0fa70b295568', title: 'Cấp ẩm', start: '2025-04-05 00:00', end: '2025-04-05 00:00'},
      

//     ]
    
    ,
    plugins: [eventsService],
   
  })
  useEffect(() => {
    if (schedules.length > 0) {
      calendar.events.set(schedules);
      console.log("Events set to ScheduleXCalendar:", schedules);
    }
  }, [schedules]);
  useEffect(() => {
    // get all events
    eventsService.getAll()
  }, [schedules])
  console.log('Schedules:', schedules);
 


  console.log('Calendar:', calendar?.events.getAll());

  // Kiểm tra calendar

  return (
    <div className="flex flex-row justify-between items-start w-full px-8">
      <div className="w-full max-w-[100vw]">
        {
          schedules.length > 0 &&
          <ScheduleXCalendar key={key} calendarApp={calendar} />
        }
        {/* <ScheduleXCalendar calendarApp={calendar} /> */}
      </div>
    </div>
  )
}

export default CalendarApp