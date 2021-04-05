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
	percentage: yup.number().positive().max(99),
	start: yup.date(),
	end: yup.date(),
	images: yup.array().required().min(1),
});
const initial = {
	category: '',
	product: '',
	percentage: null,
	start: new Date(),
	end: new Date(),
	images: [],
};
const Promotion: React.FC = () => {
	// code here ...
	console.log('Hello From ProductVsCompetitor');
	return (
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
					name="percentage"
					label="pourcentage"
					keyboardType="numeric"
					placeholder="10 ou 5 .."
					icon="percent"
				/>
				<DatePicker name="start" label="debut" />
				<DatePicker name="end" label="fin" />
				<ImageInput name="images" label="Images" multiple />
			</Form>
		</EventContainer>
	);
};
export default Promotion;
