import React, { useEffect, useState } from 'react'

function TimePeaker() {

    const [time,setTime] = useState(new Date())




    
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000); 

    return () => clearInterval(interval);
  }, []);

  const formatDate = (date) => {
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (date) => {
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    return date.toLocaleTimeString(undefined, options);
  }
  return (
    <div>


<p>Date: {formatDate(time)}, Time: {formatTime(time)}</p>








    </div>
  )
}

export default TimePeaker