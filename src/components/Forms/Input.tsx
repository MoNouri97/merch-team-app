import { useField } from 'formik';
import React from 'react';
import { TextInputProps } from 'react-native';
import styled from '~/config/styled-components';
import { yup } from '~/config/yupFrLocal';
import IconName from '~/types/icons';
import InputBase from './InputBase';

interface Props {
	name: string;
	label?: string;
	icon?: IconName;
	onIconPress?: () => void;
}

const s = yup.number().positive().required();
const v = async (val: any) => {
	try {
		const r = await s.validate(val);
		return;
	} catch (error) {
		return error.message;
	}
};

const Input: React.FC<Props & TextInputProps> = ({
	name,
	icon,
	label,
	onIconPress,
	...props
}) => {
	// const { handleChange, handleBlur, values } = useFormikContext();
	const [{ value, onBlur, onChange }, {}] = useField(name);

	return (
		<InputBase
			label={label ?? name}
			name={name}
			icon={icon}
			onIconPress={onIconPress}
		>
			<InputInner
				value={value}
				onChangeText={onChange(name)}
				onBlur={onBlur(name)}
				{...props}
			/>
		</InputBase>
	);
};
const InputInner = styled.TextInput(({ theme }) => ({
	fontSize: 16,
	flex: 1,
	padding: 15,
	fontFamily: 'DMSans_400Regular',
	color: theme.colors.black,
}));

export default Input;
