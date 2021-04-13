import { Formik } from 'formik';
import React from 'react';
import { Alert } from 'react-native';
import { fakeCategories, fakeProducts } from '~/Helpers/FakeData';
import { useValues } from '~/Helpers/useValues';
import { yup } from '~/Helpers/yupFrLocal';
import { ReportEventFrom } from '~/types/ReportEventForm';
import ImageInput from '../Forms/ImageInput';
import Picker from '../Forms/Picker';
import EventContainer from './EventContainer';

const validation = yup.object({
	category: yup.string().required(),
	product: yup.string().required(),
	image: yup.array().required().min(1),
});
const initial = {
	category: '',
	product: '',
	image: [],
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
						<Picker name="category" label="catégorie" data={fakeCategories} />
						<Picker name="product" label="produit" data={fakeProducts} />
						<ImageInput name="image" />
					</>
				);
			}}
		</Formik>
	</EventContainer>
);
export default NewProduct;
