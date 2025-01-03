import React, { useState, useEffect } from "react";
//import "./Calendar.css"

const Counter = () => {
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [days, setDays] = useState(0);
  const [months, setMonths] = useState(0);
  const [years, setYears] = useState(0);

  let minutesOfHour = 3;
  let hoursOfDay = 2;
  let daysOfMonth = 2;
  let monthsOfYear = 1;

  useEffect(() => {
    // Set up the timer to increment minutes every 1 minutes
    const timer = setInterval(() => {
      setMinutes((prevMinutes) => {
        if (prevMinutes === minutesOfHour) {
          // Increment hours and reset minutes
          setHours((prevHours) => {
            if (prevHours === hoursOfDay) {
                setDays((prevDays) => {
                    if(prevDays === daysOfMonth){
                        //increment months and reset days
                        setMonths((prevMonths) => {
                            if(prevMonths === monthsOfYear){
                                //increment years and reset months
                                setYears((prevYears) => prevYears + 1);
                                return 0;
                            }
                            return prevMonths + 1; // Reset months to 0
                        });
                        return 0; // Reset days to 0
                    }
                    return prevDays + 1;
                });
              return 0; // Reset hours to 0
            }
            return prevHours + 1; // Increment hours
          });
          return 0; // Reset minutes to 0
        }
        return prevMinutes + 1; // Increment minutes
      });
    }, 1000);

    // Cleanup the timer when the component unmounts
    return () => clearInterval(timer);
  }, []);

  function formatTime () {

    let minutes1 = String(minutes).padStart(2,"0");
    let hours1 = String(hours).padStart(2,"0");
    let days1 = String(days).padStart(2,"0");
    let months1 = String(months).padStart(2,"0");
    let years1 = String(years).padStart(2,"0");
    
    return (
        <div>
          {days1}/{months1}/{years1} {hours1}:{minutes1}
        </div>
      );

}

  return (
    <div className="stopwatch">
        <div className="display">{formatTime()}</div>
    </div>
);
};

export default Counter;
