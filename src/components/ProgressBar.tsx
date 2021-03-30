import React from 'react';
import styled from '~/config/styled-components';

interface IProps {
	percent: number;
}

const ProgressBar: React.FC<IProps> = ({ percent }) => {
	return (
		<Bar>
			<Progress percent={percent} />
		</Bar>
	);
};
const Bar = styled.View`
	background: ${({ theme }) => `${theme.colors.gray[2]}`};
	height: 20px;
	flex: 1;
	border-radius: ${({ theme }) => `${theme.borderRadius}`};
`;
const Progress = styled.View<IProps>`
	background: ${({
		percent,
		theme: {
			colors: { green, red, yellow },
		},
	}) => `${percent < 30 ? red : percent < 70 ? yellow : green}`};
	width: ${({ percent }) => `${percent ?? 0}%`};
	border-radius: ${({ theme }) => `${theme.borderRadius}`};
	height: 100%;
`;
export default ProgressBar;
