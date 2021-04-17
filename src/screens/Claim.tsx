import React from 'react';
import { Alert } from 'react-native';
import Form from '~/components/Forms/Form';
import ImageInput from '~/components/Forms/ImageInput';
import Input from '~/components/Forms/Input';
import Picker from '~/components/Forms/Picker';
import { Subtitle } from '~/components/Forms/styles';
import SubmitBtn from '~/components/Forms/SubmitBtn';
import AppScreen from '~/components/Shared/AppScreen';
import { yup } from '~/config/yupFrLocal';
import { fakeGMSs, fakeProducts } from '~/Helpers/FakeData';

const initial = {
	GMS: '',
	type: '',
	content: '',
	image: undefined,
};
// validation object
const validation = yup.object({
	GMS: yup.string().required(),
	type: yup.string().required(),
	content: yup.string().required().max(200),
});
const Claim: React.FC = () => (
	<AppScreen navbar>
		<Subtitle>Détails</Subtitle>
		<Form
			onSubmit={(values, { setSubmitting }) => {
				Alert.alert('ok', JSON.stringify(values, null, 2));

				setSubmitting(false);
			}}
			initialValues={initial}
			validationSchema={validation}
		>
			<Picker name="GMS" data={fakeGMSs} />
			<Picker name="type" data={fakeProducts} />
			<Input
				name="content"
				label="contenu"
				placeholder="contenu ici ..."
				multiline
			/>
			<ImageInput name="image" />
			<SubmitBtn>Soumettre</SubmitBtn>
		</Form>
	</AppScreen>
);
export default Claim;
