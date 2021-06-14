import { useEffect, useRef, useState } from 'react';

export const useTimer = (init: number, onExit: (t: number) => void) => {
	const [timer, setTimer] = useState(init ?? 0);
	const timerRef = useRef(timer);
	useEffect(() => {
		timerRef.current = timer;
	}, [timer]);

	return { timer, setTimer, timerRef };
};
