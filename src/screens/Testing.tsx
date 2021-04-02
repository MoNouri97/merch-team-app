import { useNavigation } from '@react-navigation/core';
import React from 'react';
import * as yup from 'yup';
import AppScreen from '~/components/AppScreen';
import AppText from '~/components/AppText';
import Btn from '~/components/Btn';
import DatePicker from '~/components/Forms/DatePicker';
import Form from '~/components/Forms/Form';
import ImageInput from '~/components/Forms/ImageInput';
import Input from '~/components/Forms/Input';
import Password from '~/components/Forms/Password';
import Picker from '~/components/Forms/Picker';
import SubmitBtn from '~/components/Forms/SubmitBtn';
import styled from '~/config/styled-components';

const initial = {
	email: 'nouri@gmail.co',
	Password: '',
	categorie: '',
	date: new Date(),
	images: [] as string[],
	image1: [] as string[],
};
// validation object
const validation = yup.object({
	images: yup.array().required().min(3),
	image1: yup.array().required().min(1),
});

const Testing: React.FC = () => {
	const navigation = useNavigation();
	return (
		<AppScreen navbar>
			<AppText type="subtitle">typography</AppText>
			<Section>
				<AppText type="title">Title</AppText>
				<AppText type="subtitle">subtitle</AppText>
				<AppText type="label">label</AppText>
			</Section>
			<AppText type="subtitle">my buttons</AppText>
			<Btn>secondary</Btn>
			<Btn primary>primary</Btn>
			<Btn primary onPress={() => navigation.navigate('Connexion')}>
				login
			</Btn>
			<AppText type="subtitle">inputs</AppText>
			<Form
				validationSchema={validation}
				initialValues={initial}
				onSubmit={(_, { setSubmitting }) => {
					console.log('sub');
					setSubmitting(false);
				}}
			>
				<Password name="password" placeholder="shhhh" />
				<Input name="email" icon="search" />
				<Picker
					data={['one', 'two', 'three']}
					placeholder="choose a category..."
					name="categorie"
				/>
				<DatePicker name="date" />
				<ImageInput name="image1" label="Une image" />
				<ImageInput multiple name="images" label="plusieur images" />
				<SubmitBtn>Ok</SubmitBtn>
			</Form>
		</AppScreen>
	);
};

const Section = styled.View`
	margin-top: 10px;
	margin-bottom: 20px;
`;
export default Testing;
