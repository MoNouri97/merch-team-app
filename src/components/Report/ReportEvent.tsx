import { Feather } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from '~/config/styled-components';
import { EventType } from '~/types/events';
import IconName from '~/types/icons';
import Action from './Action';
import BeforeAfter from './BeforeAfter';
import CompetitorEvent from './CompetitorEvent';
import NewProduct from './NewProduct';
import PriceChange from './PriceChange';
import ProductVsCompetitor from './ProductVsCompetitor';
import Promotion from './Promotion';
import Rupture from './Rupture';

type Action = {
	icon: IconName;
	onPress: (i: number) => void;
};

interface WrapperProps {
	actions?: Action[];
	id: number;
}
interface InnerProps {
	type: EventType;
}

const ReportEvent: React.FC<WrapperProps & InnerProps> = ({
	actions,
	id,
	...other
}) => (
	<Wrapper>
		{actions?.map((action) => (
			<ActionBtn key={action.icon}>
				<TouchableOpacity onPress={() => action.onPress(id)}>
					<Feather size={20} name={action.icon} />
				</TouchableOpacity>
			</ActionBtn>
		))}
		<ReportEventInner {...other} />
	</Wrapper>
);

const ReportEventInner: React.FC<InnerProps> = ({ type }) => {
	if (type === 'BeforeAfter') return <BeforeAfter />;
	if (type === 'Promotion') return <Promotion />;
	if (type === 'Action') return <Action />;
	if (type === 'CompetitorEvent') return <CompetitorEvent />;
	if (type === 'NewProduct') return <NewProduct />;
	if (type === 'PriceChange') return <PriceChange />;
	if (type === 'ProductVsCompetitor') return <ProductVsCompetitor />;
	if (type === 'Rupture') return <Rupture />;

	return null;
};
export default React.memo(ReportEvent);

const ActionBtn = styled.TouchableOpacity`
	position: absolute;
	right: 0;
	z-index: 2;
	top: 30px;
`;
const Wrapper = styled.View`
	position: relative;
`;
