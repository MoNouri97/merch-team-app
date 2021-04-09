import React from 'react';
import { Alert } from 'react-native';
import { fakeCategories, fakeProducts } from '~/Helpers/FakeData';
import { yup } from '~/Helpers/yupFrLocal';
import DatePicker from '../Forms/DatePicker';
import Form from '../Forms/Form';
import ImageInput from '../Forms/ImageInput';
import Input from '../Forms/Input';
import Picker from '../Forms/Picker';
import EventContainer from './EventContainer';

const validation = yup.object({
	category: yup.string().required(),
	product: yup.string().required(),
	oldPrice: yup.number().positive().required(),
	newPrice: yup.number().positive().required(),
	start: yup.date(),
	end: yup.date(),
	images: yup.array().required().min(1),
});
const initial = {
	category: '',
	product: '',
	oldPrice: null,
	newPrice: null,
	start: new Date(),
	end: new Date(),
	images: [],
};
const Promotion: React.FC = () => (
	<EventContainer title="Promotion">
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
			<Input
				name="oldPrice"
				label="Ancien prix"
				keyboardType="numeric"
				placeholder="6.99"
				icon="dollar-sign"
			/>
			<Input
				name="newPrice"
				label="Nouveaux prix"
				keyboardType="numeric"
				placeholder="6.99"
				icon="dollar-sign"
			/>
			<DatePicker name="start" label="debut" />
			<DatePicker name="end" label="fin" />
			<ImageInput name="images" label="Images" multiple />
		</Form>
	</EventContainer>
);
export default Promotion;
