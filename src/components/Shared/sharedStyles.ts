import styled from '~/config/styled-components';

export const Card = styled.View(({ theme }) => ({
	backgroundColor: theme.colors.white,
	elevation: '5',
	padding: 25,
	borderRadius: 20,
}));
