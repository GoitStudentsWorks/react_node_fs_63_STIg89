import { Outlet } from 'react-router';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

import CalendarToolbar from 'components/Calendar/CalendarToolbar/CalendarToolbar';
import ChoosedMonth from 'components/Calendar/ChoosedMonth/ChoosedMonth';

const CalendarPage = () => {
  const params = useParams();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <div>
      <CalendarToolbar
        setCurrentDate={setCurrentDate}
        currentDate={currentDate}
        selectedDate={selectedDate}
      />
      {!params?.currentDay && (
        <ChoosedMonth
          setCurrentDate={setCurrentDate}
          currentDate={currentDate}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      )}
      <Outlet />
    </div>
  );
};

export default CalendarPage;
