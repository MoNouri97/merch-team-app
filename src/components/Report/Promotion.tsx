import React from 'react';
import {
	CategoriesPicker,
	DatePicker,
	ImageInput,
	Input,
	ProductsPicker,
} from '~/components/Forms';
import { yup } from '~/config/yupFrLocal';
import { ReportEventFrom } from '~/types/ReportEventForm';
import EventContainer from './EventContainer';

export const schemaPromotion = yup.object({
	category: yup.string().optional(),
	product: yup.string().required(),
	oldPrice: yup.number().positive().required(),
	newPrice: yup.number().positive().required(),
	startDate: yup.date(),
	endDate: yup.date(),
	images: yup.array().required().min(1),
});
export const initialPromotion = {
	category: '',
	product: '',
	oldPrice: null,
	newPrice: null,
	startDate: new Date(),
	endDate: new Date(),
	images: [],
};
const Promotion: React.FC<ReportEventFrom> = ({ name }) => (
	<EventContainer title="Promotion">
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
		<DatePicker name={`${name}.startDate`} label="debut" />
		<DatePicker name={`${name}.endDate`} label="fin" />
		<ImageInput name={`${name}.images`} label="Images" multiple />
	</EventContainer>
);
export default Promotion;
