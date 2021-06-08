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
			<AppText type="label" color="dark">
				Planning: {displayDate(new Date())}
			</AppText>
			<Plannings>
				{data && data?.tasks?.length > 0 ? (
					data?.tasks
						.filter((task) => task.day == new Date().getDay())
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
	padding: 20px;
	margin-top: 10px;
	margin-bottom: 10px;
`;
export default PlanningCard;
