import CheckMark from '../CheckMark';
import React from 'react';
import AppText from '~/components/AppText';
import styled from '~/config/styled-components';
import { Planning } from '~/types/data';

const PlanningItemDetails: React.FC<Planning & { lightColor?: boolean }> = ({
	GMS,
	done: state,
	time,
	lightColor = false,
}) => {
	return (
		<Details>
			<State>
				<CheckMark checked={state} />
			</State>
			<TextContainer>
				<Text
					numberOfLines={1}
					type="subtitle"
					color={lightColor ? 'light' : undefined}
					size={16}
				>
					{GMS}
				</Text>
				<Text color={lightColor ? 'light' : undefined}>{time} min</Text>
			</TextContainer>
		</Details>
	);
};
const Details = styled.View`
	flex-direction: row;
	border-bottom-width: 1px;
	border-bottom-color: ${({ theme }) => theme.colors.gray[1]};
	align-items: center;
	flex: 1;
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
export default PlanningItemDetails;
