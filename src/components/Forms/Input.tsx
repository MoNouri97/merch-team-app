import { useFormikContext } from 'formik';
import React from 'react';
import { TextInputProps } from 'react-native';
import styled from '~/config/styled-components';
import IconName from '~/types/icons';
import InputBase from './InputBase';

interface Props {
	name: string;
	label?: string;
	icon?: IconName;
	onIconPress?: () => void;
}

const Input: React.FC<Props & TextInputProps> = ({
	name,
	icon,
	label,
	onIconPress,
	...props
}) => {
	const { handleChange, handleBlur, values } = useFormikContext();

	return (
		<InputBase
			label={label ?? name}
			name={name}
			icon={icon}
			onIconPress={onIconPress}
		>
			<InputInner
				value={(values as any)[name]}
				{...props}
				onChangeText={handleChange(name)}
				onBlur={handleBlur(name)}
			/>
		</InputBase>
	);
};
const InputInner = styled.TextInput({
	fontSize: 20,
	flex: 1,
	padding: 15,
});

export default Input;
