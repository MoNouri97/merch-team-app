import dateFormat from 'dateformat';

export const displayDate = (date: Date) => {
	// Basic usage
	return dateFormat(date, 'dd/mm/yyyy');
	// Saturday, June 9th, 2007, 5:46:21 PM
};
