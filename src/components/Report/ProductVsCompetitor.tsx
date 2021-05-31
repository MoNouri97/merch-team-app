import React from 'react';
import {
	CategoriesPicker,
	ImageInput,
	ProductsPicker,
} from '~/components/Forms';
import CompetitorsPicker from '~/components/Forms/helpers/CompetitorsPicker';
import { PRODUCT } from '~/config/constants';
import { yup } from '~/config/yupFrLocal';
import { useCompetitorName } from '~/Helpers/useCompetitorName';
import { ReportEventFrom } from '~/types/ReportEventForm';
import EventContainer from './EventContainer';

export const schemaPvC = yup.object({
	category: yup.string().optional(),
	product: yup.string().required(),
	purchaseOrder: yup.boolean().required(),
	imageCompetitor: yup.array().required().min(1),
	imageProduct: yup.array().required().min(1),
});
export const initialPvC = {
	category: '',
	product: '',
	competitor: '',
	purchaseOrder: false,
	imageCompetitor: undefined,
	imageProduct: undefined,
};
const ProductVsCompetitor: React.FC<ReportEventFrom> = ({ name }) => {
	const { COMPETITOR, COMPETITOR_PATH } = useCompetitorName(name);

	return (
		<EventContainer title={`${PRODUCT} Vs ${COMPETITOR}`}>
			<CategoriesPicker name={`${name}.category`} />
			<ProductsPicker name={`${name}.product`} />
			<CompetitorsPicker name={COMPETITOR_PATH} />
			<ImageInput name={`${name}.imageProduct`} label={PRODUCT} />
			<ImageInput name={`${name}.imageCompetitor`} label={COMPETITOR} />
		</EventContainer>
	);
};
export default ProductVsCompetitor;
