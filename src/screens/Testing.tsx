import { useNavigation } from '@react-navigation/core';
import { Stomp } from '@stomp/stompjs';
import React, { useContext, useState } from 'react';
import SockJS from 'sockjs-client';
import useGetCategories from '~/api/categoryAPI';
import { uploadApi } from '~/api/uploadApi';
import AppText from '~/components/AppText';
import { ProductsCheckList } from '~/components/Forms';
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
import api from '~/config/api';
import styled from '~/config/styled-components';
import { yup } from '~/config/yupFrLocal';
import ModalContext from '~/context/ModalContext';
import { fakeCategories } from '~/Helpers/FakeData';
import { jsonToForm } from '~/Helpers/jsonToForm';

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
	const { showText, showProgress, hide } = useContext(ModalContext)!;
	return (
		<AppScreen navbar>
			{/* <TestApi /> */}
			{/* <TestChat /> */}
			<TestUpload />
			<Btn
				onPress={() => {
					// showText('Veiller patienter');
					let a = 0;
					const r = setInterval(() => {
						if (a >= 100) {
							clearInterval(r);
							hide();
						}
						showProgress(a);
						a += 10;
					}, 100);
				}}
			>
				Modal Global
			</Btn>
			<Btn onPress={() => setModal(!modal)}>Modal</Btn>
			<BottomSheet
				center
				modalProps={{
					visible: modal,
					onRequestClose: () => setModal(false),
					animationType: 'fade',
				}}
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
				// validationSchema={validation}
				initialValues={initial}
				onSubmit={(values, { setSubmitting }) => {
					console.log({ values });
					const formData = jsonToForm(values.image1);
					const f = new FormData();
					// f.append('image', jsonData.image);

					console.log({ f });
					api.post('/gms/image', f);
					setSubmitting(false);
				}}
			>
				<ProductsCheckList />
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
	const { error, isFetching, data: data, refetch } = useGetCategories();

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

const TestChat = () => {
	const [refresh, setRefresh] = useState(false);
	React.useEffect(() => {
		const socket = new SockJS('http://192.168.1.108:8080/chat');
		socket.onopen = () => {
			console.log('connected');
		};
		socket.onerror = () => {
			console.log('error');
		};

		const stompClient = Stomp.over(socket);
		const headers = { Authorization: `Bearer jwt` };

		stompClient.connect(headers, () => {
			stompClient.subscribe(
				`/topic/public`,
				// `/user/${user.username}/queue/messages`,
				console.log,
				headers
			);
		});

		// return () => stompClient && stompClient.disconnect(console.log);
	}, [refresh]);

	return (
		<>
			<AppText> Input </AppText>
			{/* <Res>
				<AppText color="light" numberOfLines={99}>
					loading : {`${isFetching}\n`}
					{error && `error:${JSON.stringify(error, null, 2)}`}
					Result: {JSON.stringify(data, null, 2)}
				</AppText>
			</Res>*/}
			<Btn onPress={() => setRefresh(!refresh)}>Refresh</Btn>
		</>
	);
};

const TestUpload = () => {
	const [visible, setVisible] = useState(false);
	const [progress, setProgress] = useState(0);
	return (
		<Form
			initialValues={{ image: undefined }}
			onSubmit={async (values, { setSubmitting }) => {
				setVisible(true);

				const res = await uploadApi(values.file, (p) => {
					setProgress(p);
				});
				console.log({ res });

				setSubmitting(false);
			}}
		>
			<ImageInput name="file" label="Une image" />
			<SubmitBtn>Upload</SubmitBtn>
			<BottomSheet
				center
				modalProps={{
					visible,
					animationType: 'fade',
					onRequestClose: () => {
						setVisible(false);
					},
				}}
			>
				<AppText type="title">Upload Progress</AppText>
				<AppText type="subtitle">{progress}</AppText>
			</BottomSheet>
		</Form>
	);
};
