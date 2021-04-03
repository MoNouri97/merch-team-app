import React from 'react';
import { Planning } from '~/types/data';
import ListItem from './ListItem';

const PlanningItemDetails: React.FC<Planning & { lightColor?: boolean }> = ({
	GMS,
	done,
	time,
	lightColor = false,
}) => (
	<ListItem
		header={GMS}
		subHeader={`${time}min`}
		withCheck
		checked={done}
		lightColor={lightColor}
	/>
);
export default PlanningItemDetails;
