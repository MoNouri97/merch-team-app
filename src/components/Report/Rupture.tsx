import { Formik } from 'formik';
import React from 'react';
import { Alert } from 'react-native';
import styled from '~/config/styled-components';
import { fakeCategories, fakeProducts } from '~/Helpers/FakeData';
import { useValues } from '~/Helpers/useValues';
import { yup } from '~/Helpers/yupFrLocal';
import { ReportEventFrom } from '~/types/ReportEventForm';
import CheckBox from '../Forms/CheckBox';
import CheckList from '../Forms/CheckList';
import ImageInput from '../Forms/ImageInput';
import Picker from '../Forms/Picker';
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
						<Picker name="category" label="catégorie" data={fakeCategories} />
						{/* <Picker name="product" label="produit" data={fakeProducts} /> */}
						<CheckList
							name="products"
							label="produits"
							placeholder="choisir une catégorie . . ."
							data={values.category ? fakeProducts : undefined}
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
