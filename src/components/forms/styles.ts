import styled from '~/config/styled-components';

export const InputContainer = styled.View`
	margin: 5px;
	flex: 1;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	border-radius: ${({ theme }) => theme.borderRadius};
	background-color: ${({ theme }) => theme.colors.white};
`;
