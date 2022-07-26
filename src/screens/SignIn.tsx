import React, { useContext } from 'react';
import { useLogin } from '~/api/UserAPI';
import { Form, Input, Password, SubmitBtn } from '~/components/Forms';
import AppScreen from '~/components/Shared/AppScreen';
import styled from '~/config/styled-components';
import { yup } from '~/config/yupFrLocal';
import { UserContext } from '~/context/UserContext';

// validation object
const validation = yup.object({
	email: yup.string().required().email(),
	password: yup.string().required().min(4),
});

const initial = {
	email: 'merch@spring.co',
	password: '0000',
};
type Values = typeof initial;

const SignIn: React.FC = () => {
	const login = useLogin();
	const { signIn } = useContext(UserContext)!;
	return (
		<AppScreen navbar>
			<Container>
				<Form
					validationSchema={validation}
					initialValues={initial}
					onSubmit={async (
						values: Values,
						{ setSubmitting, setFieldError }
					) => {
						try {
							const { data } = await login.mutateAsync({
								username: values.email,
								password: values.password,
							});
							signIn({ user: data.user, userToken: data.token });

							setSubmitting(false);
						} catch (error) {
							console.log(error.response.status);
							setFieldError('password', 'email ou mot de passe invalide');
							// 	if (error.response.status == 403)
							// 		setFieldError('password', 'email ou mot de passe invalide');
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
