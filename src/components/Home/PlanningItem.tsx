import { Feather } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import React from 'react';
import { useTheme } from 'styled-components';
import styled from '~/config/styled-components';
import { PlanningDetails } from '~/types/models/PlanningDetails';
import { HomeStackParams } from '~/types/navigation';
import PlanningItemDetails from '../Shared/PlanningItemDetails';

const PlanningItem: React.FC<PlanningDetails> = (planning) => {
	const theme = useTheme();
	const { navigate } =
		useNavigation<NavigationProp<HomeStackParams, 'Accueil'>>();
	return (
		<Container>
			<Location
				onPress={() => {
					// FIXME

					if (planning.state !== 'TODO') return;
					navigate('MapGMS', { id: planning.id });
				}}
			>
				<Feather size={30} name="map-pin" color={theme.colors.primary} />
			</Location>
			<ListItem
				onPress={() => {
					// FIXME
					navigate('Report', { id: planning.id });
				}}
			>
				<PlanningItemDetails {...planning} />
			</ListItem>
		</Container>
	);
};
const Container = styled.View`
	flex-direction: row;
	margin-bottom: 10px;
`;
const ListItem = styled.TouchableOpacity`
	flex-grow: 1;
`;

const Location = styled.TouchableOpacity`
	padding: 5px;
	width: 70px;
	height: 70px;
	justify-content: center;
	align-items: center;
	border-radius: ${({ theme }) => theme.borderRadius};
	/* background: ${({ theme }) => theme.colors.gray[1]}; */
`;
export default PlanningItem;
