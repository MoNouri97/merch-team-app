import React from 'react';
import { Alert } from 'react-native';
import styled from '~/config/styled-components';
import { fakeCategories, fakeProducts } from '~/Helpers/FakeData';
import { yup } from '~/Helpers/yupFrLocal';
import CheckBox from '../Forms/CheckBox';
import Form from '../Forms/Form';
import ImageInput from '../Forms/ImageInput';
import Picker from '../Forms/Picker';
import EventContainer from './EventContainer';

const validation = yup.object({
	category: yup.string().required(),
	produit: yup.string().required(),
	purchaseOrder: yup.boolean().required(),
	image: yup.array().required(),
});
const initial = {
	category: '',
	produit: '',
	purchaseOrder: false,
	image: [],
};

const Rupture: React.FC = () => (
	<EventContainer title="Rupture">
		<Form
			initialValues={initial}
			validationSchema={validation}
			onSubmit={(values, { setSubmitting }) => {
				Alert.alert(JSON.stringify(values, null, 2));
				setSubmitting(false);
			}}
		>
			<Picker name="category" label="catégorie" data={fakeCategories} />
			<Picker name="produit" data={fakeProducts} />
			<CheckBox name="purchaseOrder" label="bon de commande" text="passeé" />
			<ImageInput name="image" />
		</Form>
	</EventContainer>
);
const Container = styled.View``;
export default Rupture;
