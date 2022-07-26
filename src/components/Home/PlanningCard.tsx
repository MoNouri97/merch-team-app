import React from 'react';
import { useGetPlannings } from '~/api/PlanningAPI';
import AppText from '~/components/AppText';
import styled from '~/config/styled-components';
import displayDate from '~/Helpers/displayDate';
import PlanningItem from './PlanningItem';

const PlanningCard: React.FC = () => {
	const { data } = useGetPlannings();

	return (
		<Container>
			<DragHandle />
			<AppText type="label" color="dark">
				Planning: {displayDate(new Date())}
			</AppText>

			<Plannings>
				{data && data?.tasks?.length > 0 ? (
					data?.tasks
						// .filter((task) => task.taskDate == format(new Date(), 'dd-MM-yyyy'))
						.map((planning) => (
							<PlanningItem
								key={planning.id}
								{...planning}
								// {...{
								// 	GMS: planning.gms.name,
								// 	done: planning.state == 'DONE',
								// 	status: planning.state,
								// 	time: 10,
								// }}
							/>
						))
				) : (
					<AppText>Pas de taches</AppText>
				)}
			</Plannings>
		</Container>
	);
};

const Plannings = styled.View`
	margin-top: 20px;
`;

const Container = styled.View`
	padding: 10px;
	margin-top: 10px;
	margin-bottom: 10px;
	min-height: 500px;
	position: relative;
`;

const DragHandle = styled.View`
	padding: 3px;
	width: 50px;
	background: ${({ theme }) => theme.colors.black};
	border-radius: ${({ theme }) => theme.borderRadius};
	position: absolute;
	left: 50%;
	top: -20px;
`;
export default PlanningCard;
