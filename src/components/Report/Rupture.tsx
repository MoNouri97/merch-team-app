import { Formik } from 'formik';
import React from 'react';
import { Alert } from 'react-native';
import CategoriesPicker from '~/components/Forms/helpers/CategoriesPicker';
import ProductsCheckList from '~/components/Forms/helpers/ProductsCheckList';
import styled from '~/config/styled-components';
import { yup } from '~/config/yupFrLocal';
import { useValues } from '~/Helpers/useValues';
import { ReportEventFrom } from '~/types/ReportEventForm';
import CheckBox from '../Forms/CheckBox';
import ImageInput from '../Forms/ImageInput';
import EventContainer from './EventContainer';

const validation = yup.object({
	category: yup.string().required(),
	products: yup.array().required().min(1),
	purchaseOrder: yup.boolean().required(),
	image: yup.mixed().when('purchaseOrder', {
		is: true,
		then: yup.array().required().min(1),
	}),
});
const initial = {
	category: '',
	products: [],
	purchaseOrder: false,
	image: undefined,
};

const Rupture: React.FC<ReportEventFrom> = ({ name, setValue }) => (
	<EventContainer title="Rupture">
		<Formik
			initialValues={initial}
			validationSchema={validation}
			onSubmit={(values, { setSubmitting }) => {
				Alert.alert(JSON.stringify(values, null, 2));
				setSubmitting(false);
			}}
		>
			{({ values }) => {
				useValues(name, values, setValue);
				return (
					<>
						<CategoriesPicker />
						<ProductsCheckList
							placeholder="Choisir Une Catégorie"
							// TODO:handle this
							params={{ gms: '*', category: values.category }}
						/>

						<CheckBox
							name="purchaseOrder"
							label="bon de commande"
							text="passeé"
						/>
						<Disabled
							disabled={!values.purchaseOrder}
							pointerEvents={!values.purchaseOrder ? 'none' : undefined}
						>
							<ImageInput name="image" label="Image" />
						</Disabled>

						{/* {values.purchaseOrder && <ImageInput name="image" label="Image" />} */}
					</>
				);
			}}
		</Formik>
	</EventContainer>
);
const Disabled = styled.Pressable<{ disabled: boolean }>`
	opacity: ${({ disabled }) => (disabled ? 0.4 : 1)}; ;
`;
export default Rupture;
