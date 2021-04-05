import React from 'react';
import { Alert } from 'react-native';
import { fakeCategories, fakeProducts } from '~/Helpers/FakeData';
import { yup } from '~/Helpers/yupFrLocal';
import Form from '../Forms/Form';
import ImageInput from '../Forms/ImageInput';
import Picker from '../Forms/Picker';
import EventContainer from './EventContainer';

const validation = yup.object({
	catégorie: yup.string().required(),
	produit: yup.string().required(),
	before: yup.array().required().min(1),
	after: yup.array().required().min(1),
});
const initial = {
	catégorie: '',
	produit: '',
	before: [],
	after: [],
};

const BeforeAfter: React.FC = () => (
	<EventContainer title="Before/After">
		<Form
			initialValues={initial}
			validationSchema={validation}
			onSubmit={(values, { setSubmitting }) => {
				Alert.alert(JSON.stringify(values, null, 2));
				setSubmitting(false);
			}}
		>
			<Picker name="catégorie" data={fakeCategories} />
			<Picker name="produit" data={fakeProducts} />
			<ImageInput name="before" />
			<ImageInput name="after" />
		</Form>
	</EventContainer>
);
export default BeforeAfter;
