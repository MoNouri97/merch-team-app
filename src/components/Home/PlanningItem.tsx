import PlanningItemDetails from '../Shared/PlanningItemDetails';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import styled from '~/config/styled-components';
import { Planning } from '~/types/data';

const PlanningItem: React.FC<Planning> = (planning) => {
	const theme = useTheme();
	return (
		<Container>
			<Location>
				<Feather size={30} name="map-pin" color={theme.colors.primary} />
			</Location>
			<PlanningItemDetails {...planning} />
		</Container>
	);
};
const Container = styled.View`
	flex-direction: row;
	margin-bottom: 10px;
`;

const Location = styled.View`
	padding: 5px;
	width: 70px;
	height: 70px;
	justify-content: center;
	align-items: center;
	border-radius: ${({ theme }) => theme.borderRadius};
	background: ${({ theme }) => theme.colors.gray[1]};
`;
export default PlanningItem;