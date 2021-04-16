import { Feather } from '@expo/vector-icons';
import React from 'react';
import styled from '~/config/styled-components';
import { EventType } from '~/types/events';
import IconName from '~/types/icons';
import { Press } from '../Shared/Btn';
import Action from './Action';
import BeforeAfter from './BeforeAfter';
import CompetitorEvent from './CompetitorEvent';
import NewProduct from './NewProduct';
import PriceChange from './PriceChange';
import ProductVsCompetitor from './ProductVsCompetitor';
import Promotion from './Promotion';
import Rupture from './Rupture';

type HeaderAction = {
	icon: IconName;
	onPress: (i: number) => void;
};

interface WrapperProps {
	actions?: HeaderAction[];
	id: number;
}
interface InnerProps {
	type: EventType;
	name: string;
	setFieldValue: (
		field: string,
		value: any,
		shouldValidate?: boolean | undefined
	) => void;
}

const ReportEvent: React.FC<WrapperProps & InnerProps> = ({
	actions,
	id,
	...other
}) => (
	<Wrapper>
		{actions?.map((action) => (
			<ActionBtn key={action.icon} onPress={() => action.onPress(id)}>
				<Feather size={20} name={action.icon} />
			</ActionBtn>
		))}
		<ReportEventInner {...other} />
	</Wrapper>
);

const ReportEventInner: React.FC<InnerProps> = ({
	type,
	setFieldValue,
	name,
}) => {
	let Component;
	if (type === 'BeforeAfter') Component = BeforeAfter;
	if (type === 'Promotion') Component = Promotion;
	if (type === 'Action') Component = Action;
	if (type === 'CompetitorEvent') Component = CompetitorEvent;
	if (type === 'NewProduct') Component = NewProduct;
	if (type === 'PriceChange') Component = PriceChange;
	if (type === 'ProductVsCompetitor') Component = ProductVsCompetitor;
	if (type === 'Rupture') Component = Rupture;

	if (!Component) return null;
	return <Component setValue={setFieldValue} name={name} />;
};
export default React.memo(ReportEvent);

const ActionBtn = styled(Press)`
	position: absolute;
	padding: 10px;
	right: 0;
	z-index: 2;
	top: 10px;
`;
const Wrapper = styled.View`
	position: relative;
`;
