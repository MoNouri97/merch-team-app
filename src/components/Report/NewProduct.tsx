import { Formik } from 'formik';
import React from 'react';
import { Alert } from 'react-native';
import CategoriesPicker from '~/components/Forms/helpers/CategoriesPicker';
import ProductsPicker from '~/components/Forms/helpers/ProductsPicker';
import { yup } from '~/config/yupFrLocal';
import { useValues } from '~/Helpers/useValues';
import { ReportEventFrom } from '~/types/ReportEventForm';
import ImageInput from '../Forms/ImageInput';
import EventContainer from './EventContainer';

const validation = yup.object({
	category: yup.string().required(),
	product: yup.string().required(),
	image: yup.array().required().min(1),
});
const initial = {
	category: '',
	product: '',
	image: undefined,
};
const NewProduct: React.FC<ReportEventFrom> = ({ name, setValue }) => (
	<EventContainer title="Nouveau produit">
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
						<ProductsPicker />
						<ImageInput name="image" />
					</>
				);
			}}
		</Formik>
	</EventContainer>
);
export default NewProduct;
