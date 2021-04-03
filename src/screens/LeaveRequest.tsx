import React from 'react';
import AppScreen from '~/components/AppScreen';
import AppText from '~/components/AppText';

const LeaveRequest: React.FC = () => {
	console.log('hello');

	return (
		<AppScreen navbar>
			<AppText>Hello From LeaveRequest</AppText>
		</AppScreen>
	);
};
export default LeaveRequest;
