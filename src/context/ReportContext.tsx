import { differenceInSeconds } from 'date-fns';
import React, { createContext, useState } from 'react';
import { REPORT_TASK, REPORT_TIME } from '~/config/constants';
import { loadFromStorage, saveToStorage } from '~/Helpers/asyncStorage';
import { PlanningDetails } from '~/types/models/PlanningDetails';

type ReportState = {
	time?: number;
	getTime?: () => Promise<number>;
	updateTime?: (n: number) => void;
	task?: PlanningDetails;
	changeTask?: (n?: PlanningDetails) => void;
};
export const ReportContext = createContext<ReportState>({});
export default ReportContext;

export const ReportContextProvider: React.FC = ({ children }) => {
	const [time, setTime] = useState<number>(0);
	const [task, setTask] = useState<PlanningDetails>();

	const getTime = async () => {
		const timeString = await loadFromStorage(REPORT_TIME);
		if (!timeString) return time;
		const from = new Date(timeString);
		const now = new Date();

		const timeInt = differenceInSeconds(now, from);
		if (timeInt !== time) setTime(timeInt);
		return timeInt;
	};

	const updateTime = (t: number) => {
		setTime(t);
		const now = new Date();
		saveToStorage(`${now}`, REPORT_TIME);
	};
	const changeTask = (t?: PlanningDetails) => {
		setTask(t);
		updateTime(0);
		saveToStorage(`${t}`, REPORT_TASK);
	};

	return (
		<ReportContext.Provider
			value={{ time, task, changeTask, updateTime, getTime }}
		>
			{children}
		</ReportContext.Provider>
	);
};
