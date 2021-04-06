import React from 'react';
import { Alert } from 'react-native';
import { fakeCategories, fakeProducts } from '~/Helpers/FakeData';
import { yup } from '~/Helpers/yupFrLocal';
import Form from '../Forms/Form';
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
const NewProduct: React.FC = () => (
	<EventContainer title="Nouveau produit">
		<Form
			initialValues={initial}
			validationSchema={validation}
			onSubmit={(values, { setSubmitting }) => {
				Alert.alert(JSON.stringify(values, null, 2));
				setSubmitting(false);
			}}
		>
			<Picker name="category" label="catégorie" data={fakeCategories} />
			<Picker name="product" label="produit" data={fakeProducts} />
			<ImageInput name="image" />
		</Form>
	</EventContainer>
);
export default NewProduct;
