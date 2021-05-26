import React from 'react';
import {
	CategoriesPicker,
	ImageInput,
	ProductsPicker,
} from '~/components/Forms';
import { yup } from '~/config/yupFrLocal';
import { ReportEventFrom } from '~/types/ReportEventForm';
import EventContainer from './EventContainer';

export const schemaNewProduct = yup.object({
	category: yup.string().required(),
	product: yup.string().required(),
	imageProduct: yup.array().required().min(1),
});
export const initialNewProduct = {
	category: '',
	product: '',
	imageProduct: undefined,
};
const NewProduct: React.FC<ReportEventFrom> = ({ name }) => (
	<EventContainer title="Nouveau produit">
		<CategoriesPicker name={`${name}.category`} />
		<ProductsPicker name={`${name}.product`} />
		<ImageInput name={`${name}.imageProduct`} />
	</EventContainer>
);
export default NewProduct;
