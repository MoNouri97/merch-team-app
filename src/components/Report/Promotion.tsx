import { Formik } from 'formik';
import React from 'react';
import { Alert } from 'react-native';
import CategoriesPicker from '~/components/Forms/helpers/CategoriesPicker';
import ProductsPicker from '~/components/Forms/helpers/ProductsPicker';
import { yup } from '~/config/yupFrLocal';
import { useValues } from '~/Helpers/useValues';
import { ReportEventFrom } from '~/types/ReportEventForm';
import DatePicker from '../Forms/DatePicker';
import ImageInput from '../Forms/ImageInput';
import Input from '../Forms/Input';
import EventContainer from './EventContainer';

const validation = yup.object({
	category: yup.string().required(),
	product: yup.string().required(),
	oldPrice: yup.number().positive().required(),
	newPrice: yup.number().positive().required(),
	start: yup.date(),
	end: yup.date(),
	images: yup.array().required().min(1),
});
const initial = {
	category: '',
	product: '',
	oldPrice: null,
	newPrice: null,
	start: new Date(),
	end: new Date(),
	images: [],
};
const Promotion: React.FC<ReportEventFrom> = ({ name, setValue }) => (
	<EventContainer title="Promotion">
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
						<CategoriesPicker />
						<ProductsPicker />
						<Input
							name="oldPrice"
							label="Ancien prix"
							keyboardType="numeric"
							placeholder="6.99"
							icon="dollar-sign"
						/>
						<Input
							name="newPrice"
							label="Nouveaux prix"
							keyboardType="numeric"
							placeholder="6.99"
							icon="dollar-sign"
						/>
						<DatePicker name="start" label="debut" />
						<DatePicker name="end" label="fin" />
						<ImageInput name="images" label="Images" multiple />
					</>
				);
			}}
		</Formik>
	</EventContainer>
);
export default Promotion;
