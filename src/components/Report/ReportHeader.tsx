import { Feather } from '@expo/vector-icons';
import React from 'react';
import AppText from '~/components/AppText';
import NavBar from '~/components/Shared/NavBar';
import styled from '~/config/styled-components';

interface IProps {
	onActionPress: () => void;
	onClosePress: () => void;
}

const ReportHeader: React.FC<IProps> = ({ onActionPress, onClosePress }) => (
	<NavBar>
		<Container>
			<HeaderBtn onPress={onClosePress}>
				<Feather size={20} name="x" />
			</HeaderBtn>
			<AppText type="title">Rapport</AppText>
			<HeaderBtn onPress={onActionPress}>
				<AppText color="primary">Ajouter</AppText>
			</HeaderBtn>
		</Container>
	</NavBar>
);
const Container = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 0 20px 20px;
	flex: 1;
`;

const HeaderBtn = styled.TouchableOpacity`
	padding: 10px;
	background-color: ${({ theme }) => theme.colors.gray[2]};
	border-radius: ${({ theme }) => theme.borderRadius};
`;
export default ReportHeader;
