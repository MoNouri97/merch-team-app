import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { useLogin } from '~/api/login';
import Form from '~/components/Forms/Form';
import Input from '~/components/Forms/Input';
import Password from '~/components/Forms/Password';
import SubmitBtn from '~/components/Forms/SubmitBtn';
import AppScreen from '~/components/Shared/AppScreen';
import styled from '~/config/styled-components';
import { yup } from '~/config/yupFrLocal';

// validation object
const validation = yup.object({
	email: yup.string().required().email(),
	password: yup.string().required().min(4),
});
const SignIn: React.FC = () => {
	const login = useLogin();
	const nav = useNavigation();
	return (
		<AppScreen navbar>
			<Container>
				<Form
					validationSchema={validation}
					initialValues={{
						email: 'merch@spring.co',
						password: '0000',
					}}
					onSubmit={async (values, { setSubmitting }) => {
						try {
							const { data } = await login.mutateAsync({
								username: values.email,
								password: values.password,
							});
							setSubmitting(false);
							nav.navigate('Home');
						} catch (error) {
							console.log(error);
						}
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
