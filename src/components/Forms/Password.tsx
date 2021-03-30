import Input from './Input';
import React, { useState } from 'react';
import { TextInputProps } from 'react-native';

interface Props {
	name: string;
	label?: string;
}

const Password: React.FC<Props & TextInputProps> = (props) => {
	const [shown, setShown] = useState(false);

	return (
		<Input
			onIconPress={() => setShown(!shown)}
			secureTextEntry={!shown}
			{...props}
			icon={shown ? 'eye' : 'eye-off'}
		/>
	);
};

export default Password;
