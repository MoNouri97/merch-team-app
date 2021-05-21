import { Formik } from 'formik';
import React from 'react';
import { Alert } from 'react-native';
import {
	CategoriesPicker,
	ImageInput,
	Input,
	ProductsPicker,
} from '~/components/Forms';
import { yup } from '~/config/yupFrLocal';
import { useValues } from '~/Helpers/useValues';
import { ReportEventFrom } from '~/types/ReportEventForm';
import EventContainer from './EventContainer';

const validation = yup.object({
	title: yup.string().required(),
	category: yup.string().required(),
	product: yup.string().required(),
	images: yup.array().required().min(1),
});
const initial = {
	title: '',
	category: '',
	product: '',
	images: undefined,
};
const Action: React.FC<ReportEventFrom> = ({ name, setValue }) => (
	<EventContainer title="Action">
		<Formik
			initialValues={initial}
			validationSchema={validation}
			onSubmit={(values, { setSubmitting }) => {
				Alert.alert(JSON.stringify(values, null, 2));
				setSubmitting(false);
			}}
		>
			{({ values }) => {
				useValues(name, values, setValue);
				return (
					<>
						<Input name="title" label="titre" placeholder="titre ici ..." />
						<CategoriesPicker />
						<ProductsPicker />
						<ImageInput name="images" multiple />
					</>
				);
			}}
		</Formik>
	</EventContainer>
);
export default Action;
