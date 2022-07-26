import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import FancyListItem from '~/components/Shared/FancyListItem';
import { myTheme } from '~/config/theme';
import { PlanningStatus } from '~/types/data';
import { PlanningDetails } from '~/types/models/PlanningDetails';
// import { Planning, PlanningStatus } from '~/types/data';

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

const PlanningItemDetails: React.FC<PlanningDetails> = ({
	gms,
	state: status,
	day,
}) => {
	const { colors } = useContext(ThemeContext);
	return (
		<FancyListItem
			color={statusToColor(status, colors)}
			header={gms.name}
			subHeader={`Temps Estimé: ${gms.estimatedTime}min`}
			// subHeader={` `}
			checked={status == 'DONE'}
			lightColor={(status as PlanningStatus) !== 'TODO'}
		/>
	);
};
export default PlanningItemDetails;
