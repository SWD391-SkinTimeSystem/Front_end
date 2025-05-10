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