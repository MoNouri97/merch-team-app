import React from 'react';
import { Alert } from 'react-native';
import { fakeCategories, fakeProducts } from '~/Helpers/FakeData';
import { yup } from '~/Helpers/yupFrLocal';
import Form from '../Forms/Form';
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
	image: [],
};
const Action: React.FC = () => (
	<EventContainer title="Action">
		<Form
			initialValues={initial}
			validationSchema={validation}
			onSubmit={(values, { setSubmitting }) => {
				Alert.alert(JSON.stringify(values, null, 2));
				setSubmitting(false);
			}}
		>
			<Input name="title" label="titre" placeholder="titre ici ..." />
			<Picker name="category" label="catégorie" data={fakeCategories} />
			<Picker name="product" label="produit" data={fakeProducts} />
			<ImageInput name="image" multiple />
		</Form>
	</EventContainer>
);
export default Action;
