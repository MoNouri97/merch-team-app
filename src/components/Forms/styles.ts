import styled from '~/config/styled-components';
import AppText from '../AppText';

export const InputContainer = styled.View`
	/* overflow: hidden; */
	padding: 0;
	margin-vertical: 5px;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	border-radius: ${({ theme }) => theme.borderRadius};
	background-color: ${({ theme }) => theme.colors.gray[2]};
`;
export const Subtitle = styled(AppText).attrs(() => ({
	type: 'subtitle',
}))`
	margin-bottom: 20px;
`;
export const Placeholder = styled(AppText).attrs(() => ({
	type: 'label',
}))`
	margin-top: 5px;
	opacity: 0.8;
	margin-bottom: 5px;
`;
