import { useCallback, useEffect, useRef, useState } from "react";

export default function useTimer(initTime: number) {
    const timerRef = useRef<NodeJS.Timeout>(0 as unknown as NodeJS.Timeout);

    const [paused, setPaused] = useState(true);
    const [second, setSecond] = useState<number>(initTime);
    useEffect(() => {
        let timerId: NodeJS.Timeout;

        if (!paused && !timerRef.current) {
            timerId = setInterval(() => {
                setSecond((prev) => prev - 1);
            }, 1000);
            timerRef.current = timerId;
        } else if (paused) {
            clearInterval(timerRef.current);
        }
    }, [paused]);

    useEffect(() => {
        if (second === 0) {
            clearInterval(timerRef.current);
            setPaused(true);
        }
    }, [second]);

    const start = useCallback(() => {
        setPaused(false);
    }, []);

    const pause = useCallback(() => {
        setPaused(true);
    }, []);

    const reset = useCallback(() => {
        clearInterval(timerRef.current);
        setPaused(true);
        setSecond(initTime);
        timerRef.current = 0 as unknown as NodeJS.Timeout;
    }, [initTime]);

    return {
        start,
        pause,
        reset,
        second,
    };
}
