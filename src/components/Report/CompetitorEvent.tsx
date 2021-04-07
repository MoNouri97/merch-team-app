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
	competitor: yup.string().required(),
	images: yup.array().required().min(1),
});
const initial = {
	category: '',
	competitor: '',
	images: [],
};
const CompetitorEvent: React.FC = () => (
	<EventContainer title="Événement Conçurent">
		<Form
			initialValues={initial}
			validationSchema={validation}
			onSubmit={(values, { setSubmitting }) => {
				Alert.alert(JSON.stringify(values, null, 2));
				setSubmitting(false);
			}}
		>
			<Picker name="category" label="catégorie" data={fakeCategories} />
			<Picker name="competitor" label="conçurent" data={fakeProducts} />
			<ImageInput name="images" multiple />
		</Form>
	</EventContainer>
);
export default CompetitorEvent;
