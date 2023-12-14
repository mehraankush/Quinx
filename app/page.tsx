"use client"
import React, { useState, useRef } from 'react';
import { useStore } from '@/store'
import { formatTime, convertSecondsToFormattedTime } from '@/lib'
import Labs from '@/component/Labs';

const Stopwatch = () => {

  const [count, setCount] = useState(0)
  const SetTimestamp = useStore((state) => state.SetTimestamp)
  const ResetTimeStamp = useStore((state) => state.ResetTimeStamp)
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const intervalRef = useRef<number | undefined>(undefined);


  const startStopwatch = () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current as number); // Cast to number
    }
  };

  const tapTime = () => {
    if (isRunning) {
      const currentTime = new Date();

      const formattedTimeDifference = convertSecondsToFormattedTime(time);
      const timeOnly = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      setCount((prev) => prev + 1);
      SetTimestamp({ count: count, stamp: formattedTimeDifference, time: timeOnly });

      console.log(formattedTimeDifference);
    }
  };

  const stopStopwatch = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current as number); // Cast to number
  };

  const resetStopwatch = () => {
    ResetTimeStamp();
    setTime(0)
    stopStopwatch();
  };

  return (

    <div className='h-screen w-screen '>
      <div className='h-full w-full flex-col gap-9  flex justify-center items-center'>

        <div className='border border-white p-9 flex flex-col gap-5  lg:w-[30%] bg-white'>
          <div className='bg-black text-white flex justify-center p-4'>
            <h1 className='text-5xl font-bold'>{formatTime(time)}</h1>
          </div>
          <div className='flex flex-row gap-7'>
              
              {/* all buttons  */}
            <div className='flex flex-col gap-5'>
              <button className='bg-blue-800  p-3 px-5 rounded' onClick={startStopwatch}>{isRunning ? 'STOP' : 'START'} </button>
              <button onClick={tapTime} disabled={!isRunning} className='rounded bg-blue-800  p-3 px-5'>TAP</button>
              <button onClick={resetStopwatch} className='rounded bg-blue-800  p-3 px-5 '>RESET</button>
            </div>
            
            {/* stamp display  */}
            <div className='text-black'>
              <Labs />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};



export default Stopwatch;
