import { Formik } from 'formik';
import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import * as yup from 'yup';
import AppScreen from '~/components/AppScreen';
import theme from '~/config/theme';

interface Props {}
// validation object
const validation = yup.object({
	email: yup.string().required().email(),
	password: yup.string().required().max(10).min(3),
});

const Testing: React.FC<Props> = () => (
	<AppScreen>
		<Formik
			initialValues={{
				email: '',
				password: '',
			}}
			validationSchema={validation}
			onSubmit={async (values) => {
				await new Promise((resolve) => setTimeout(resolve, 500));
				console.log(JSON.stringify(values, null, 2));
			}}
		>
			{({
				values,
				errors,
				handleBlur,
				handleChange,
				handleSubmit /** and a lot more helpers */,
			}) => (
				<>
					<TextInput
						style={styles.input}
						value={values.email}
						onChangeText={handleChange('email')}
						onBlur={handleBlur('email')}
					/>
					<TextInput
						style={styles.input}
						value={values.password}
						onChangeText={handleChange('password')}
						onBlur={handleBlur('password')}
					/>
					<Text>{JSON.stringify(values, null, 2)}</Text>
					<Text>{JSON.stringify(errors, null, 2)}</Text>
					<Button title="OK" />
				</>
			)}
		</Formik>
	</AppScreen>
);
export default Testing;

const styles = StyleSheet.create({
	input: {
		margin: 10,
		padding: 10,
		width: '90%',
		borderRadius: 10,
		backgroundColor: theme.medium,
		color: theme.bg,
	},
});
