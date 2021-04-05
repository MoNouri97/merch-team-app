import React from 'react';
import styled from '~/config/styled-components';
import { Subtitle } from '../Forms/styles';

interface IProps {
	title: string;
}
const EventContainer: React.FC<IProps> = ({ title, children }) => (
	<Container>
		<Subtitle>{title}</Subtitle>
		{children}
	</Container>
);

const Container = styled.View`
	border-top-width: 2px;
	border-top-color: ${({ theme }) => theme.colors.gray[1]};
	padding-top: 20px;
`;
export default EventContainer;
