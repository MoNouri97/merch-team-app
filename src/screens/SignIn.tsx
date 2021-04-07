import { useNavigation } from '@react-navigation/core';
import React from 'react';
import AppScreen from '~/components/AppScreen';
import Form from '~/components/Forms/Form';
import Input from '~/components/Forms/Input';
import Password from '~/components/Forms/Password';
import SubmitBtn from '~/components/Forms/SubmitBtn';
import styled from '~/config/styled-components';
import { yup } from '~/Helpers/yupFrLocal';

// validation object
const validation = yup.object({
	email: yup.string().required().email(),
	password: yup.string().required().min(4),
});
const SignIn: React.FC = () => {
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
							nav.navigate('Accueil');
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
