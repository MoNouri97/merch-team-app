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
	category: yup.string().required(),
	product: yup.string().required(),
	oldPrice: yup.number().positive().required(),
	newPrice: yup.number().positive().required(),
	startdate: yup.date(),
	enddate: yup.date(),
	images: yup.array().required().min(1),
});
export const initialPromotion = {
	category: '',
	product: '',
	oldPrice: null,
	newPrice: null,
	startdate: new Date(),
	enddate: new Date(),
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
		<DatePicker name={`${name}.startdate`} label="debut" />
		<DatePicker name={`${name}.enddate`} label="fin" />
		<ImageInput name={`${name}.images`} label="Images" multiple />
	</EventContainer>
);
export default Promotion;
