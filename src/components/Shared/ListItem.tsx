import React from 'react';
import AppText from '~/components/AppText';
import CheckMark from '~/components/Shared/CheckMark';
import styled from '~/config/styled-components';

export interface ListItemProps {
	header: string;
	subHeader?: string;
	withCheck?: boolean;
	checked?: boolean;
	lightColor?: boolean;
}
const ListItem: React.FC<ListItemProps> = ({
	header,
	subHeader,
	withCheck = false,
	checked = false,
	lightColor = false,
}) => (
	<Details>
		{withCheck && (
			<State>
				<CheckMark checked={checked} />
			</State>
		)}
		<TextContainer>
			<Text
				numberOfLines={1}
				type="subtitle"
				color={lightColor ? 'light' : undefined}
				size={16}
			>
				{header}
			</Text>
			{subHeader && (
				<Text color={lightColor ? 'light' : undefined}>{subHeader}</Text>
			)}
		</TextContainer>
	</Details>
);
const Details = styled.View`
	flex-direction: row;
	border-bottom-width: 1px;
	border-bottom-color: ${({ theme }) => theme.colors.gray[1]};
	align-items: center;
	flex-grow: 1;
	margin-left: 10px;
`;
const State = styled.View`
	justify-content: center;
	align-items: center;
	margin: 10px;
`;
const TextContainer = styled.View`
	margin-left: 10px;
	flex: 1;
	/* max-width: 80%; */
`;
const Text = styled(AppText)`
	margin-bottom: 5px;
`;
export default ListItem;
