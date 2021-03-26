import InputBase from './InputBase';
import React, { useContext } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { ThemeContext } from 'styled-components';
import { useFormikContext } from 'formik';
import IconName from '~/types/icons';

interface Props {
	name: string;
	icon?: IconName;
}

const Input: React.FC<Props & TextInputProps> = ({ name, icon, ...props }) => {
	const { handleChange, handleBlur, values } = useFormikContext();
	const theme = useContext(ThemeContext);

	return (
		<InputBase name={name} icon={icon}>
			<TextInput
				style={styles.input}
				value={(values as any)[name]}
				{...props}
				onChangeText={handleChange(name)}
				onBlur={handleBlur(name)}
			/>
		</InputBase>
	);
};
const styles = StyleSheet.create({
	container: {
		padding: 10,
	},
	input: {
		fontSize: 20,
		flex: 1,
		padding: 15,
	},
	inputIcon: {
		minWidth: 30,
	},
});

export default Input;
// style={styles.input}
// 					value={(values as any)[name]}
// 					{...props}
// 					onChangeText={handleChange(name)}
// 					onBlur={handleBlur(name)}
