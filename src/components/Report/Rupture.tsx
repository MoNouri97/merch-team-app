import { useField } from 'formik';
import React from 'react';
import {
	CategoriesPicker,
	CheckBox,
	ImageInput,
	ProductsCheckList,
} from '~/components/Forms';
import EventContainer from '~/components/Report/EventContainer';
import styled from '~/config/styled-components';
import { yup } from '~/config/yupFrLocal';
import { ReportEventFrom } from '~/types/ReportEventForm';

export const schemaRupture = yup.object({
	category: yup.string().optional(),
	products: yup.array().required().min(1),
	purchaseOrder: yup.boolean().required(),
	image: yup.mixed().when('purchaseOrder', {
		is: true,
		then: yup.array().required().min(1),
	}),
});
export const initialRupture = {
	category: '',
	products: [],
	purchaseOrder: false,
	image: undefined,
};

const Rupture: React.FC<ReportEventFrom> = ({ name }) => {
	const [{ value: purchaseOrderValue }] = useField(`${name}.purchaseOrder`);

	return (
		<EventContainer title="Rupture">
			<CategoriesPicker name={`${name}.category`} />
			<ProductsCheckList
				name={`${name}.products`}
				placeholder="Choisir Une Catégorie"
			/>

			<CheckBox
				name={`${name}.purchaseOrder`}
				label="bon de commande"
				text="passeé"
			/>
			<Disabled
				disabled={!purchaseOrderValue}
				pointerEvents={!purchaseOrderValue ? 'none' : undefined}
			>
				<ImageInput name={`${name}.image`} label="Image" />
			</Disabled>
		</EventContainer>
	);
};
const Disabled = styled.Pressable<{ disabled: boolean }>`
	opacity: ${({ disabled }) => (disabled ? 0.4 : 1)}; ;
`;
export default Rupture;
