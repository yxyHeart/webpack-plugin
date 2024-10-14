import { useCallback, useEffect, useRef, useState } from 'react';

export default function useTimer(initTime: number, lowerBound = 0, step = 0.2) {
  const timerRef = useRef<NodeJS.Timeout>(0 as unknown as NodeJS.Timeout);

  const [paused, setPaused] = useState(true);
  const [second, setSecond] = useState<number>(initTime);
  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (!paused && !timerRef.current) {
      timerId = setInterval(() => {
        setSecond((prev) => prev - step);
      }, step * 1000);
      timerRef.current = timerId;
    } else if (paused) {
      clearInterval(timerRef.current);
      timerRef.current = 0 as unknown as NodeJS.Timeout;
    }
  }, [paused, step]);

  useEffect(() => {
    if (second <= lowerBound) {
      clearInterval(timerRef.current);
      setPaused(true);
    }
  }, [second, lowerBound]);

  const start = useCallback(() => {
    setPaused(false);
  }, []);

  const pause = useCallback(() => {
    setPaused(true);
  }, []);

  const reset = useCallback(() => {
    pause();
    setSecond(initTime);
  }, [initTime, pause]);

  return {
    start,
    pause,
    reset,
    second,
  };
}
