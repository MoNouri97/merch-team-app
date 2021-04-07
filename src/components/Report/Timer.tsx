import React, { useEffect, useRef, useState } from 'react';
import AppText from '~/components/AppText';

const Timer: React.FC = () => {
	const [timer, setTimer] = useState(0);
	const [isActive, setIsActive] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const countRef = useRef<NodeJS.Timeout>();

	const handleStart = () => {
		setIsActive(true);
		setIsPaused(true);
		countRef.current = setInterval(() => {
			setTimer((t) => t + 1);
		}, 1000);
	};

	const handlePause = () => {
		clearInterval(countRef.current!);
		setIsPaused(false);
	};

	const handleResume = () => {
		setIsPaused(true);
		countRef.current = setInterval(() => {
			setTimer((t) => t + 1);
		}, 1000);
	};
	const handleReset = () => {
		clearInterval(countRef.current!);
		setIsActive(false);
		setIsPaused(false);
		setTimer(0);
	};
	const getSeconds = `0${timer % 60}`.slice(-2);
	const minutes = Math.floor(timer / 60);
	const getMinutes = `0${minutes % 60}`.slice(-2);

	useEffect(() => {
		handleStart();
		return () => {
			handleReset();
		};
	}, []);
	return (
		<>
			<AppText type="label" color="primary">
				Temps {`${getMinutes}:${getSeconds}`}
			</AppText>
			{/* <Btn onPress={handleStart}>start</Btn>
			<Btn onPress={handleReset}>Stop</Btn> */}
		</>
	);
};
export default Timer;
