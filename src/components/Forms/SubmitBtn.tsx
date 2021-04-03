import { useFormikContext } from 'formik';
import React from 'react';
import Btn from '../Btn';

interface Props {}

const SubmitBtn: React.FC<Props> = ({ children }) => {
	const { handleSubmit, isSubmitting, errors } = useFormikContext();
	return (
		<Btn primary loading={isSubmitting} onPress={() => handleSubmit()}>
			{children}
		</Btn>
	);
};
export default SubmitBtn;
