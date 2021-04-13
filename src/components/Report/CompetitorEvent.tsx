import { Formik } from 'formik';
import React from 'react';
import { Alert } from 'react-native';
import { fakeCategories, fakeProducts } from '~/Helpers/FakeData';
import { useValues } from '~/Helpers/useValues';
import { yup } from '~/Helpers/yupFrLocal';
import { ReportEventFrom } from '~/types/ReportEventForm';
import ImageInput from '../Forms/ImageInput';
import Picker from '../Forms/Picker';
import EventContainer from './EventContainer';

const validation = yup.object({
	category: yup.string().required(),
	competitor: yup.string().required(),
	images: yup.array().required().min(1),
});
const initial = {
	category: '',
	competitor: '',
	images: [],
};
const CompetitorEvent: React.FC<ReportEventFrom> = ({ name, setValue }) => (
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
			const COMPETITOR = values.competitor ? values.competitor : 'conçurent';
			return (
				<EventContainer title={`Événement ${COMPETITOR}`}>
					<Picker name="category" label="catégorie" data={fakeCategories} />
					<Picker name="competitor" label="conçurent" data={fakeProducts} />
					<ImageInput name="images" multiple />
				</EventContainer>
			);
		}}
	</Formik>
);
export default CompetitorEvent;
