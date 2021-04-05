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
	purchaseOrder: yup.boolean().required(),
	competitorImage: yup.array().required().min(1),
	productImage: yup.array().required().min(1),
});
const initial = {
	category: '',
	product: '',
	competitor: '',
	purchaseOrder: false,
	competitorImage: [],
	productImage: [],
};
const ProductVsCompetitor: React.FC = () => {
	// code here ...
	console.log('Hello From ProductVsCompetitor');
	return (
		<EventContainer title="Produit Vs Conçurent">
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
				<Picker name="competitor" label="conçurent" data={fakeCategories} />
				<ImageInput name="productImage" label="produit" />
				<ImageInput name="competitorImage" label="conçurent" />
			</Form>
		</EventContainer>
	);
};
export default ProductVsCompetitor;
