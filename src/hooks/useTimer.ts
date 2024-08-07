import { useEffect, useState } from "react";

export default function useTimer(initTime: number) {
  const [timer, setTimer] = useState<number>(0);

  const [paused, setPaused] = useState(false);
  const [second, setSecond] = useState<number>(initTime);

  useEffect(() => {
    let timerId;

    if (!paused) {
      timerId = setInterval(() => {
        setSecond((prev) => prev - 1);
      });
      setTimer(timerId);
    } else if (second === 0 || paused) {
      clearInterval(timer);
    }
  }, [paused, second, timer]);

  const start = () => {
    setPaused(false);
  };

  const pause = () => {
    setPaused(true);
  };

  const reset = () => {
    clearInterval(timer);
    setPaused(true);
    setSecond(0);
    setTimer(0);
  };

  return {
    start,
    pause,
    reset,
    second,
  };
}
