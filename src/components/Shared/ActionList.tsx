import { Feather } from '@expo/vector-icons';
import React from 'react';
import styled from '~/config/styled-components';
import { Action } from '~/types/data';
import AppText from '../AppText';
import { Press } from './Btn';

interface IProps {
	actions: Action[];
}

const ActionList: React.FC<IProps> = ({ actions }) => (
	<Container>
		{actions.map((a) => (
			<ActionElement key={a.icon} onPress={a.onPress}>
				<Icon size={50} name={a.icon} />
				<AppText color="dimmed">{a.title} </AppText>
			</ActionElement>
		))}
	</Container>
);
const Container = styled.View`
	flex-direction: row;
	justify-content: center;
	flex-wrap: wrap;
`;
const Icon = styled(Feather)`
	color: ${({ theme }) => theme.colors.secondary};
`;
const ActionElement = styled(Press)`
	padding: 20px;
	justify-content: center;
	align-items: center;
	background: ${({ theme }) => theme.colors.gray[1]};
	margin: 10px;
	border-radius: ${({ theme }) => theme.borderRadius};
`;
export default ActionList;
