import React from 'react';
import ListItem, { ListItemProps } from '~/components/Shared/ListItem';
import { Card } from '~/components/Shared/sharedStyles';
import styled from '~/config/styled-components';

type IProps = { color?: string } & ListItemProps;

const FancyListItem: React.FC<IProps> = ({ color, ...props }) => (
	<Item color={color}>
		<ListItem {...props} />
	</Item>
);
const Item = styled(Card)<{ color?: string }>`
	elevation: 0;
	margin-bottom: 10px;
	background: ${({ theme: { colors }, color }) => color ?? colors.gray[2]};
	padding: 10px;
	/* min-width: 300px; */
	flex: 1;
`;
export default FancyListItem;
