import { Formik } from 'formik';
import React from 'react';
import { Alert } from 'react-native';
import CategoriesPicker from '~/components/Forms/helpers/CategoriesPicker';
import ProductsPicker from '~/components/Forms/helpers/ProductsPicker';
import { yup } from '~/config/yupFrLocal';
import { useValues } from '~/Helpers/useValues';
import ImageInput from '../Forms/ImageInput';
import EventContainer from './EventContainer';

const validation = yup.object({
	category: yup.string().required(),
	product: yup.string().required(),
	before: yup.array().required().min(1),
	after: yup.array().required().min(1),
});
const initial = {
	category: '',
	product: '',
	before: undefined,
	after: undefined,
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
						<CategoriesPicker />
						<ProductsPicker />
						<ImageInput name="before" />
						<ImageInput name="after" />
					</>
				);
			}}
		</Formik>
	</EventContainer>
);
export default BeforeAfter;
