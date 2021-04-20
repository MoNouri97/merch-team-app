import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import FancyListItem from '~/components/Shared/FancyListItem';
import { myTheme } from '~/config/theme';
import { Planning, PlanningStatus } from '~/types/data';

const statusToColor = (
	status: PlanningStatus,
	colors: typeof myTheme.colors
) => {
	switch (status) {
		case 'DONE':
			return colors.green;
		case 'DELAYED':
			return colors.red;
		case 'NO_REPORT':
			return colors.yellow;
		default:
			return colors.gray[2];
	}
};

const PlanningItemDetails: React.FC<Planning> = ({
	GMS,
	done,
	time,
	status,
}) => {
	const { colors } = useContext(ThemeContext);
	return (
		<FancyListItem
			color={statusToColor(status, colors)}
			header={GMS}
			subHeader={`${time}min`}
			checked={done}
			lightColor={(status as PlanningStatus) !== 'TODO'}
		/>
	);
};
export default PlanningItemDetails;
