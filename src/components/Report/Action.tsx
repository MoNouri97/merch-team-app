import React from 'react';
import {
	CategoriesPicker,
	ImageInput,
	Input,
	ProductsPicker,
} from '~/components/Forms';
import { yup } from '~/config/yupFrLocal';
import { ReportEventFrom } from '~/types/ReportEventForm';
import EventContainer from './EventContainer';

export const schemaAction = yup.object({
	title: yup.string().required(),
	category: yup.string().optional(),
	product: yup.string().required(),
	images: yup.array().required().min(1),
});
export const initialAction = {
	title: '',
	category: '',
	product: '',
	images: undefined,
};
const Action: React.FC<ReportEventFrom> = ({ name }) => (
	<EventContainer title="Action">
		<Input name={`${name}.title`} label="titre" placeholder="titre ici ..." />
		<CategoriesPicker name={`${name}.category`} />
		<ProductsPicker name={`${name}.product`} />
		<ImageInput name={`${name}.images`} multiple />
	</EventContainer>
);
export default Action;
