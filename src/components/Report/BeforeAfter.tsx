import React from 'react';
import {
	CategoriesPicker,
	ImageInput,
	ProductsPicker,
} from '~/components/Forms';
import { yup } from '~/config/yupFrLocal';
import { ReportEventFrom } from '~/types/ReportEventForm';
import EventContainer from './EventContainer';

export const schemaBeforeAfter = yup.object({
	category: yup.string().required(),
	product: yup.string().required(),
	imageBefore: yup.array().required().min(1),
	imageAfter: yup.array().required().min(1),
});
export const initialBeforeAfter = {
	category: '',
	product: '',
	imageBefore: undefined,
	imageAfter: undefined,
};

const BeforeAfter: React.FC<ReportEventFrom> = ({ name }) => (
	<EventContainer title="Before/After">
		<CategoriesPicker name={`${name}.category`} />
		<ProductsPicker name={`${name}.product`} />
		<ImageInput name={`${name}.imageBefore`} />
		<ImageInput name={`${name}.imageAfter`} />
	</EventContainer>
);
export default BeforeAfter;
