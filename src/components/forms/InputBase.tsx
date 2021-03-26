import React, { useContext } from 'react';
import { ErrorMessage } from 'formik';
import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text } from 'react-native';
import { ThemeContext } from 'styled-components';
import { InputContainer } from '~/components/forms/styles';
import IconName from '~/types/icons';

interface Props {
	name: string;
	icon?: IconName;
}

const InputBase: React.FC<Props> = ({ name, icon, children }) => {
	const theme = useContext(ThemeContext);

	return (
		<>
			<InputContainer>
				{children}
				{icon && (
					<Feather
						style={styles.inputIcon}
						name={icon}
						size={20}
						color={theme.colors.gray[4]}
					/>
				)}
			</InputContainer>
			<ErrorMessage name={name} component={Text} />
		</>
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

export default InputBase;
