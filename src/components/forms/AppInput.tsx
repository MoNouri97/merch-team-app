import React, { useContext, useMemo, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import {
	StyleSheet,
	Text,
	TextInput,
	TextInputProps,
	View,
} from 'react-native';

interface Props {
	icon?: string;
	value: string;
	setValue: (v: string) => void;
}

const FormInput: React.FC<Props & TextInputProps> = ({
	icon,
	value,
	setValue,
	...props
}) => {
	const themeCon = useContext(ThemeContext);
	const color = useMemo(
		() => (themeCon.theme == 'dark' ? theme.darkTheme : theme.lightTheme),
		[themeCon]
	);
	return (
		<View style={[styles.inputContainer, { backgroundColor: color.lighter }]}>
			<TextInput
				style={[styles.input, { color: color.fg }]}
				placeholderTextColor={color.medium}
				value={value}
				onChange={(e) => {
					setValue(e.nativeEvent.text);
				}}
				{...props}
			/>
			{icon && (
				<Feather
					style={styles.inputIcon}
					name="search"
					size={15}
					color={color.fg}
				/>
			)}
		</View>
	);
};
const styles = StyleSheet.create({
	input: {
		fontSize: 20,
		flex: 1,
		padding: 15,
	},
	inputIcon: {
		minWidth: 30,
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderRadius: 5,
		flex: 1,
	},
});
export default FormInput;
