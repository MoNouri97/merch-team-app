import Btn from '../Btn';
import React from 'react';
import { useFormikContext } from 'formik';

interface Props {}

const SubmitBtn: React.FC<Props> = ({ children }) => {
	const { handleSubmit, isSubmitting } = useFormikContext();
	return (
		<Btn primary loading={isSubmitting} onPress={() => handleSubmit()}>
			{children}
		</Btn>
	);
};
export default SubmitBtn;
