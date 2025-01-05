import React, { useState, useEffect } from "react";
//import "./Calendar.css"

const Counter = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  /*
  const [days, setDays] = useState(0);
  const [months, setMonths] = useState(0);
  const [years, setYears] = useState(0);*/

  let secondsOfMinutes = 60;
  let minutesOfHour = 60;

  /*let daysOfMonth = 2;
  let monthsOfYear = 1;*/

  useEffect(() => {
    // Set up the timer to increment seconds every second
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === secondsOfMinutes) {
          // Increment minutes and reset seconds
          setMinutes((prevMinutes) => {
            if (prevMinutes === minutesOfHour) {

              // increment hours and reset minutes 
              setHours((prevHours) => prevHours + 1);
              return 0; // Reset minutes to 0

            }
            return prevMinutes + 1; // Increment minutes
          });
          return 0; // Reset seconds to 0
        }
        return prevSeconds + 1; // Increment seconds
      });
    }, 1000);

    // Cleanup the timer when the component unmounts
    return () => clearInterval(timer);
  }, []);

  function formatTime () {

    let seconds1 = String(seconds).padStart(2,"0");
    let minutes1 = String(minutes).padStart(2,"0");
    let hours1 = String(hours).padStart(2,"0");
    //let months1 = String(months).padStart(2,"0");
    //let years1 = String(years).padStart(2,"0");
    
    return (
        <div>
          {hours1}:{minutes1}:{seconds1}
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
