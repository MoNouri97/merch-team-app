import React from 'react';
import styled from '~/config/styled-components';
import { fakeCategories, fakeProducts } from '~/Helpers/FakeData';
import { yup } from '~/Helpers/yupFrLocal';
import Form from '../Forms/Form';
import ImageInput from '../Forms/ImageInput';
import Picker from '../Forms/Picker';
import { Subtitle } from '../Forms/styles';

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
interface IProps {}

const BeforeAfter: React.FC<IProps> = ({}) => (
	<Container>
		<Subtitle>Before/After</Subtitle>
		<Form
			initialValues={initial}
			validationSchema={validation}
			onSubmit={(values, { setSubmitting }) => {
				console.log('ok');
				setSubmitting(false);
			}}
		>
			<Picker name="catégorie" data={fakeCategories} />
			<Picker name="produit" data={fakeProducts} />
			<ImageInput name="before" />
			<ImageInput name="after" />
		</Form>
	</Container>
);
const Container = styled.View``;
export default BeforeAfter;
