import { useFormikContext } from 'formik';
import React from 'react';
import Btn from '~/components/Shared/Btn';

const SubmitBtn: React.FC = ({ children }) => {
	const { handleSubmit, isSubmitting } = useFormikContext();
	return (
		<Btn primary loading={isSubmitting} onPress={handleSubmit}>
			{children}
		</Btn>
	);
};
export default SubmitBtn;
