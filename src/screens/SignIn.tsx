import * as yup from 'yup';
import React from 'react';
import { useNavigation } from '@react-navigation/core';
import AppScreen from '~/components/AppScreen';
import Form from '~/components/Forms/Form';
import Input from '~/components/Forms/Input';
import Password from '~/components/Forms/Password';
import SubmitBtn from '~/components/Forms/SubmitBtn';
import styled from '~/config/styled-components';

interface IProps {}
// validation object
const validation = yup.object({
	email: yup
		.string()
		.required('Ce champ est requis')
		.email('Doit être une adresse e-mail valide'),
	password: yup
		.string()
		.required('Ce champ est requis')
		.min(4, 'Doit avoir au moins 4 caractères'),
});
const SignIn: React.FC<IProps> = ({}) => {
	const nav = useNavigation();
	return (
		<AppScreen navbar>
			<Container>
				<Form
					validationSchema={validation}
					initialValues={{
						email: 'Mohamed.nouri.1997@gmail.com',
						password: '123456',
					}}
					onSubmit={(values, { setSubmitting }) => {
						setTimeout(() => {
							nav.navigate('Acceuil');
							setSubmitting(false);
						}, 500);
					}}
				>
					<Input label="Email" name="email" icon="mail" />
					<Password name="password" label="mot de passe" />
					<SubmitBtn>Connexion</SubmitBtn>
				</Form>
			</Container>
		</AppScreen>
	);
};
const Container = styled.View`
	flex-grow: 1;
	justify-content: center;
`;
export default SignIn;
