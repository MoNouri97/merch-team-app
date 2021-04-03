import { Formik, FormikHelpers, FormikValues } from 'formik';
import React from 'react';

// validation object
// const validation = yup.object({
// 	email: yup.string().required().email(),
// 	password: yup.string().required().max(10).min(3),
// });

interface Props {
	initialValues: FormikValues;
	validationSchema?: any | (() => any);
	onSubmit: (
		values: FormikValues,
		formikHelpers: FormikHelpers<FormikValues>
	) => void | Promise<any>;
}
const Form: React.FC<Props> = ({
	children,
	initialValues,
	validationSchema,
	onSubmit,
}) => (
	<Formik
		initialValues={initialValues}
		validationSchema={validationSchema}
		onSubmit={onSubmit}
	>
		{() => children}
	</Formik>
);
export default Form;
