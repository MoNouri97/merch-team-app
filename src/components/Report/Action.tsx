import { Formik } from 'formik';
import React from 'react';
import { Alert } from 'react-native';
import { fakeCategories, fakeProducts } from '~/Helpers/FakeData';
import { useValues } from '~/Helpers/useValues';
import { yup } from '~/Helpers/yupFrLocal';
import { ReportEventFrom } from '~/types/ReportEventForm';
import ImageInput from '../Forms/ImageInput';
import Input from '../Forms/Input';
import Picker from '../Forms/Picker';
import EventContainer from './EventContainer';

const validation = yup.object({
	title: yup.string().required(),
	category: yup.string().required(),
	product: yup.string().required(),
	image: yup.array().required().min(1),
});
const initial = {
	title: '',
	category: '',
	product: '',
	image: undefined,
};
const Action: React.FC<ReportEventFrom> = ({ name, setValue }) => (
	<EventContainer title="Action">
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
						<Input name="title" label="titre" placeholder="titre ici ..." />
						<Picker name="category" label="catégorie" data={fakeCategories} />
						<Picker name="product" label="produit" data={fakeProducts} />
						<ImageInput name="image" multiple />
					</>
				);
			}}
		</Formik>
	</EventContainer>
);
export default Action;
