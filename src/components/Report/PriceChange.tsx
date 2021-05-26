import React from 'react';
import { CategoriesPicker, Input, ProductsPicker } from '~/components/Forms';
import { yup } from '~/config/yupFrLocal';
import { ReportEventFrom } from '~/types/ReportEventForm';
import EventContainer from './EventContainer';

export const schemaPriceChange = yup.object({
	category: yup.string().required(),
	product: yup.string().required(),
	oldPrice: yup.number().positive().required(),
	newPrice: yup.number().positive().required(),
});
export const initialPriceChange = {
	category: '',
	product: '',
	oldPrice: null,
	newPrice: null,
};
const PriceChange: React.FC<ReportEventFrom> = ({ name }) => {
	// useEventValues(name, 'PriceChange', setValue);
	return (
		<EventContainer title="Changement de prix">
			<CategoriesPicker name={`${name}.category`} />
			<ProductsPicker name={`${name}.product`} />
			<Input
				name={`${name}.oldPrice`}
				label="Ancien prix"
				keyboardType="numeric"
				placeholder="6.99"
				icon="dollar-sign"
			/>
			<Input
				name={`${name}.newPrice`}
				label="Nouveaux prix"
				keyboardType="numeric"
				placeholder="6.99"
				icon="dollar-sign"
			/>
		</EventContainer>
	);
};
export default PriceChange;
