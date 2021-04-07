import React from 'react';
import { EventType } from '~/types/events';
import Action from './Action';
import BeforeAfter from './BeforeAfter';
import CompetitorEvent from './CompetitorEvent';
import NewProduct from './NewProduct';
import PriceChange from './PriceChange';
import ProductVsCompetitor from './ProductVsCompetitor';
import Promotion from './Promotion';
import Rupture from './Rupture';

interface IProps {
	type: EventType;
}
const ReportEvent: React.FC<IProps> = ({ type }) => {
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
