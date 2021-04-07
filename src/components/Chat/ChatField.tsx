import { Feather } from '@expo/vector-icons';
import { Formik } from 'formik';
import React from 'react';
import styled from '~/config/styled-components';
import { yup } from '~/Helpers/yupFrLocal';

interface IProps {
	send: (msg: string) => void;
}

const ChatField: React.FC<IProps> = ({ send }) => (
	<Formik
		initialValues={{ msg: '' }}
		validationSchema={yup.object({ msg: yup.string().required() })}
		onSubmit={({ msg }, { resetForm }) => {
			send(msg);
			resetForm();
		}}
	>
		{({ handleSubmit, values, handleChange, handleBlur }) => (
			<Container>
				<TextField
					value={values.msg}
					onChangeText={handleChange('msg')}
					onBlur={handleBlur('msg')}
				/>
				<BtnField>
					<Feather color="#fff" name="file-text" size={25} />
				</BtnField>
				<BtnField onPress={() => handleSubmit()}>
					<Feather color="#fff" name="arrow-right" size={25} />
				</BtnField>
			</Container>
		)}
	</Formik>
);
const Container = styled.View`
	flex-grow: 1;
	flex-direction: row;
	padding-left: 10px;
	border-radius: 55px;
	background: ${({ theme }) => theme.colors.gray[2]};
`;
const TextField = styled.TextInput`
	flex-grow: 1;
`;
const BtnField = styled.TouchableOpacity`
	flex-shrink: 1;
	margin: 5px;
	justify-content: center;
	padding: 10px;
	border-radius: 55px;
	background: ${({ theme }) => theme.colors.secondary};
`;
export default ChatField;
