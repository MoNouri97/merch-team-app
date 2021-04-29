import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import useGetCategories from '~/api/categoryAPI';
import AppText from '~/components/AppText';
import DatePicker from '~/components/Forms/DatePicker';
import Form from '~/components/Forms/Form';
import ImageInput from '~/components/Forms/ImageInput';
import Input from '~/components/Forms/Input';
import Password from '~/components/Forms/Password';
import Picker from '~/components/Forms/Picker';
import SubmitBtn from '~/components/Forms/SubmitBtn';
import ActionList from '~/components/Shared/ActionList';
import AppScreen from '~/components/Shared/AppScreen';
import BottomSheet from '~/components/Shared/BottomSheet';
import Btn from '~/components/Shared/Btn';
import styled from '~/config/styled-components';
import { yup } from '~/config/yupFrLocal';
import { fakeCategories } from '~/Helpers/FakeData';

const initial = {
	email: 'nouri@gmail.co',
	Password: '',
	categorie: '',
	date: new Date(),
	images: undefined,
	image1: undefined,
};
// validation object
const validation = yup.object({
	images: yup.array().required().min(3),
	image1: yup.array().required().min(1),
});

const Testing: React.FC = () => {
	const navigation = useNavigation();
	const [modal, setModal] = useState(false);
	return (
		<AppScreen navbar>
			{/* <TestApi /> */}
			<Btn onPress={() => setModal(!modal)}>Modal</Btn>
			<BottomSheet
				modalProps={{ visible: modal, onRequestClose: () => setModal(false) }}
			>
				<ActionList
					actions={[
						{
							icon: 'alert-circle',
							title: 'Alert',
							onPress: () => setModal(false),
						},
						{
							icon: 'archive',
							title: 'Archive',
							onPress: () => setModal(false),
						},
						{
							icon: 'gift',
							title: 'Gift',
							onPress: () => setModal(false),
						},
					]}
				/>
			</BottomSheet>
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
					data={fakeCategories}
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

const TestApi = () => {
	const input = { url: '/categories' };
	const { error, isFetching, data, refetch } = useGetCategories();

	return (
		<>
			<AppText> Input : {JSON.stringify(input, null, 2)}</AppText>
			<Res>
				<AppText color="light" numberOfLines={99}>
					loading : {`${isFetching}\n`}
					{error && `error:${JSON.stringify(error, null, 2)}`}
					Result: {JSON.stringify(data, null, 2)}
				</AppText>
			</Res>
			<Btn onPress={() => refetch()}>Refresh</Btn>
		</>
	);
};
const Res = styled.View`
	background: #222;
	padding: 10px;
	border-radius: 10px;
`;
