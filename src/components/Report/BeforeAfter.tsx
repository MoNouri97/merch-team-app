import { Formik } from 'formik';
import React from 'react';
import { Alert } from 'react-native';
import {
	CategoriesPicker,
	ImageInput,
	ProductsPicker,
} from '~/components/Forms';
import { yup } from '~/config/yupFrLocal';
import { useValues } from '~/Helpers/useValues';
import EventContainer from './EventContainer';

const validation = yup.object({
	category: yup.string().required(),
	product: yup.string().required(),
	imageBefore: yup.array().required().min(1),
	imageAfter: yup.array().required().min(1),
});
const initial = {
	category: '',
	product: '',
	imageBefore: undefined,
	imageAfter: undefined,
};

interface IProps {
	setValue: (
		field: string,
		value: any,
		shouldValidate?: boolean | undefined
	) => void;
	name: string;
}

const BeforeAfter: React.FC<IProps> = ({ setValue, name }) => (
	<EventContainer title="Before/After">
		<Formik
			initialValues={initial}
			validationSchema={validation}
			onSubmit={(values, { setSubmitting }) => {
				Alert.alert(JSON.stringify(values, null, 2));
				setSubmitting(false);
			}}
			validateOnChange={false}
		>
			{({ values }) => {
				useValues(name, values, setValue);
				return (
					<>
						<CategoriesPicker />
						<ProductsPicker />
						<ImageInput name="imageBefore" />
						<ImageInput name="imageAfter" />
					</>
				);
			}}
		</Formik>
	</EventContainer>
);
export default BeforeAfter;
