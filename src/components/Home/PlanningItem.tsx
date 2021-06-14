import { Feather } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import React, { useContext, useMemo } from 'react';
import { useTheme } from 'styled-components';
import styled from '~/config/styled-components';
import ReportContext from '~/context/ReportContext';
import { PlanningDetails } from '~/types/models/PlanningDetails';
import { HomeStackParams } from '~/types/navigation';
import PlanningItemDetails from '../Shared/PlanningItemDetails';

const PlanningItem: React.FC<PlanningDetails> = (planning) => {
	const theme = useTheme();
	const { navigate } =
		useNavigation<NavigationProp<HomeStackParams, 'Accueil'>>();
	const { changeTask, task } = useContext(ReportContext);

	const canEnd = useMemo(() => {
		return planning.id == task?.id;
	}, [planning, task]);

	const canBegin = useMemo(() => {
		return !task && planning.state != 'DONE';
	}, [planning, task]);

	const canEnterReport = useMemo(() => {
		return (!task && planning.state != 'DONE') || planning.id == task?.id;
	}, [planning, task]);

	return (
		<Container>
			{canBegin && (
				<SideBtn
					onPress={() => {
						if (task) return;
						if (!canBegin) return;
						navigate('MapGMS', { id: planning.id });
						changeTask!(planning);
					}}
				>
					<Feather size={30} name="map-pin" color={theme.colors.primary} />
				</SideBtn>
			)}
			<ListItem
				onPress={() => {
					if (!canEnterReport) return;
					navigate('Report', { id: planning.id });
				}}
			>
				<PlanningItemDetails {...planning} />
			</ListItem>
			{canEnd && (
				<SideBtn
					onPress={() => {
						changeTask!(undefined);
					}}
				>
					<Feather size={30} name="check-circle" color={theme.colors.primary} />
				</SideBtn>
			)}
		</Container>
	);
};
const Container = styled.View`
	flex-direction: row;
	margin-bottom: 10px;
	flex: 1;
	background: ${({ theme }) => theme.colors.gray[1]};
	border-radius: ${({ theme }) => theme.borderRadiusLarge};
`;
const ListItem = styled.TouchableOpacity`
	flex-grow: 1;
`;

const SideBtn = styled.TouchableOpacity`
	padding: 5px;
	flex-basis: 70px;
	justify-content: center;
	align-items: center;
`;
export default PlanningItem;
