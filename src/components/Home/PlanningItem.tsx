import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { useTheme } from 'styled-components';
import styled from '~/config/styled-components';
import { Planning } from '~/types/data';
import { HomeStackParams } from '~/types/navigation';
import PlanningItemDetails from '../Shared/PlanningItemDetails';

const PlanningItem: React.FC<Planning> = (planning) => {
	const theme = useTheme();

	const { navigate } = useNavigation<
		StackNavigationProp<HomeStackParams, 'MapGMS'>
	>();

	return (
		<Container>
			<Location
				onPress={() => {
					// FIXME : make this dynamic
					navigate('MapGMS', { id: 1 });
				}}
			>
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
