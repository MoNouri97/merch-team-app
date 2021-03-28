import styled from '~/config/styled-components';

export const InputContainer = styled.View`
	padding: 0;
	margin-vertical: 5px;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	border-radius: ${({ theme }) => theme.borderRadius};
	background-color: ${({ theme }) => theme.colors.gray[2]};
`;
