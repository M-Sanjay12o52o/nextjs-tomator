'use client'

import React, { useState, useEffect } from 'react';
import { Card, Button } from '@mui/material';

const Home: React.FC = () => {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  // Function to start the timer
  const startTimer = (minutes: number) => {
    const seconds = minutes * 60;
    setTimeRemaining(seconds);

    // Set an interval to update the time remaining every second
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === null || prevTime <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    setTimer(interval);
  };

  // Function to stop the timer
  const stopTimer = () => {
    if (timer) {
      clearInterval(timer);
      setTimeRemaining(null);
    }
  };

  // Function to pause the timer
  const pauseTimer = () => {
    if (timer) {
      clearInterval(timer);
      setIsRunning(false);
    }
  };

  // Function to resume the timer
  const resumeTimer = () => {
    if (timeRemaining !== null && timeRemaining > 0) {
      // Resume the timer by setting a new interval
      const interval = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime === null || prevTime <= 1) {
            clearInterval(interval);
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        })
      }, 1000);

      setTimer(interval);
      setIsRunning(true);
    }
  }

  // Function to add minutes to the timer
  const addTime = (minutes: number) => {
    if (timeRemaining !== null && timeRemaining > 0) {
      setTimeRemaining((prevTime) => (prevTime !== null ? prevTime + minutes * 60 : null));
    }
  };
  

  // Handle the click for session buttons
  const handleSessionClick = (minutes: number) => {
    stopTimer(); // Stop the timer if running
    startTimer(minutes); // Start a new timer with the selected duration
  };

  // Effect to handle timer completion
  useEffect(() => {
    if (timeRemaining === 0) {
      stopTimer(); // Stop the timer when time is up
    }
  }, [timeRemaining]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Card
        style={{
          height: '500px',
          width: '500px',
          border: '2px solid black',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '20px',
        }}
      >
        <h1 style={{ textAlign: 'center' }}>Tomator - Study Buddy</h1>
        {timeRemaining !== null ? (
          <h2 style={{ textAlign: 'center' }}>
            Time Remaining: {Math.floor(timeRemaining / 60)}:
            {timeRemaining % 60 < 10 ? '0' : ''}
            {timeRemaining % 60}
          </h2>
        ) : (
          <h2 style={{ textAlign: 'center' }}>Select your session</h2>
        )}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
          }}
        >
          <Button
            name="session"
            variant="outlined"
            onClick={() => handleSessionClick(25)}
          >
            25 Minutes
          </Button>
          <Button
            name="session"
            variant="outlined"
            onClick={() => handleSessionClick(50)}
          >
            50 Minutes
          </Button>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            marginBottom: '20px',
          }}
        >
          <Button variant="contained" onClick={() => addTime(15)}>+15</Button>
          <Button variant="contained" onClick={() => addTime(30)}>+30</Button>
          <Button variant="contained" onClick={() => addTime(45)}>+45</Button>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            marginBottom: '20px',
          }}
        >
          <Button variant="contained" onClick={() => stopTimer()}>
            Stop
          </Button>
          <Button variant="contained" onClick={() => pauseTimer()}>
            Pause
          </Button>
          <Button variant="contained" onClick={() => resumeTimer()}>
            Resume
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Home;
