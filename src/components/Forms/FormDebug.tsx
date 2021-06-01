import { useFormikContext } from 'formik';
import React from 'react';
import AppText from '~/components/AppText';
import Btn from '~/components/Shared/Btn';

const FormDebug: React.FC = () => {
	const { values, errors, touched, setValues, initialValues } =
		useFormikContext();
	return (
		<>
			<AppText numberOfLines={100}>
				{JSON.stringify(errors, null, 2)}
				{JSON.stringify(values, null, 2)}
				{JSON.stringify(touched, null, 2)}
			</AppText>
			<Btn
				onPress={() => {
					setValues(initialValues);
				}}
			>
				Reset
			</Btn>
		</>
	);
};
export default FormDebug;
