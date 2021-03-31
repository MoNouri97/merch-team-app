import CheckMark from '../CheckMark';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { View } from 'react-native';
import AppText from '~/components/AppText';
import styled from '~/config/styled-components';
import { Planning } from '~/types/data';

const PlanningItem: React.FC<Planning> = ({ GMS, state, time }) => {
	const theme = useTheme();
	return (
		<Container>
			<Location>
				<Feather size={30} name="map-pin" color={theme.colors.primary} />
			</Location>
			<Details>
				<State>
					<CheckMark checked={state} />
				</State>
				<View>
					<AppText type="subtitle" size={16}>
						{GMS}
					</AppText>
					<AppText>{time} min</AppText>
				</View>
			</Details>
		</Container>
	);
};
const Container = styled.View`
	flex-direction: row;
	margin-bottom: 10px;
`;
const Details = styled.View`
	flex-direction: row;
	border-bottom-width: 1px;
	border-bottom-color: ${({ theme }) => theme.colors.gray[1]};
	align-items: center;
	flex: 1;
	margin-left: 10px;
`;
const State = styled.View`
	justify-content: center;
	align-items: center;
	margin: 10px;
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
