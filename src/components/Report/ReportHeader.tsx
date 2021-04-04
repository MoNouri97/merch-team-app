import { Feather } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppText from '~/components/AppText';
import styled from '~/config/styled-components';

interface IProps {
	onActionPress: () => void;
	onClosePress: () => void;
}

const ReportHeader: React.FC<IProps> = ({ onActionPress, onClosePress }) => (
	<Container>
		<Close onPress={onClosePress}>
			<Feather size={25} name="x" />
		</Close>
		<AppText type="title">Rapport</AppText>
		<TouchableOpacity onPress={onActionPress}>
			<AppText color="primary">Ajouter</AppText>
		</TouchableOpacity>
	</Container>
);
const Container = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 25px;
`;
const Close = styled.TouchableOpacity`
	padding: 10px;
`;
export default ReportHeader;
