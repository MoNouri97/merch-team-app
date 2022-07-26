import { Feather } from '@expo/vector-icons';
import { Formik } from 'formik';
import React from 'react';
import styled from '~/config/styled-components';
import { yup } from '~/config/yupFrLocal';

interface IProps {
	send: (msg: string) => void;
}

const ChatField: React.FC<IProps> = ({ send }) => (
	<Formik
		initialValues={{ msg: '' }}
		validateOnMount
		validationSchema={yup.object({ msg: yup.string().required() })}
		onSubmit={({ msg }, { resetForm }) => {
			send(msg);
			resetForm();
		}}
	>
		{({ handleSubmit, values, handleChange, handleBlur, isValid }) => (
			<Container>
				<TextField
					value={values.msg}
					multiline
					onChangeText={handleChange('msg')}
					onBlur={handleBlur('msg')}
				/>
				<BtnField>
					<Feather color="#fff" name="file-text" size={25} />
				</BtnField>
				<BtnField disabled={!isValid} onPress={() => handleSubmit()}>
					<Feather color="#fff" name="arrow-right" size={25} />
				</BtnField>
			</Container>
		)}
	</Formik>
);
const Container = styled.View`
	elevation: 2;
	box-shadow: 0 0 1px black;
	flex-grow: 1;
	margin: 10px;
	align-items: center;
	max-height: 70px;
	padding: 5px;
	flex-direction: row;
	padding-left: 30px;
	border-radius: ${({ theme }) => theme.borderRadiusLarge};
	background: ${({ theme }) => theme.colors.gray[2]};
`;
const TextField = styled.TextInput`
	flex-grow: 1;
	max-width: 70%;
	font-size: 20px;
`;
const BtnField = styled.TouchableOpacity`
	margin: 5px;
	justify-content: center;
	align-items: center;
	padding: 10px;
	border-radius: 55px;
	opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
	background: ${({ theme }) => theme.colors.secondary};
`;
export default ChatField;
