import { Formik } from 'formik';
import React from 'react';
import { Alert } from 'react-native';
import { fakeCategories, fakeProducts } from '~/Helpers/FakeData';
import { useValues } from '~/Helpers/useValues';
import { yup } from '~/Helpers/yupFrLocal';
import ImageInput from '../Forms/ImageInput';
import Picker from '../Forms/Picker';
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
						<Picker name="category" label="catégorie" data={fakeCategories} />
						<Picker name="product" label="produit" data={fakeProducts} />
						<ImageInput name="before" />
						<ImageInput name="after" />
					</>
				);
			}}
		</Formik>
	</EventContainer>
);
export default BeforeAfter;
