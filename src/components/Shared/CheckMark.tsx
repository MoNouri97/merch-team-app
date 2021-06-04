import { Feather } from '@expo/vector-icons';
import React from 'react';
import { useTheme } from 'styled-components';
import styled from '~/config/styled-components';

interface IProps {
	checked?: boolean;
	scale?: number;
}

const CheckMark: React.FC<IProps> = ({ checked = false, scale = 1 }) => {
	const theme = useTheme();
	return (
		<Container checked={checked} style={{ transform: [{ scale }] }}>
			<Feather
				size={20}
				name="check"
				color={checked ? theme.colors.white : theme.colors.gray[3]}
			/>
		</Container>
	);
};

const Container = styled.View<IProps>`
	width: 30px;
	height: 30px;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme, checked }) =>
		checked ? theme.colors.primary : theme.colors.gray[1]};
	border-radius: 100px;
`;
export default CheckMark;
