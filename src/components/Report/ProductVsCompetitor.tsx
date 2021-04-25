import { Formik } from 'formik';
import React from 'react';
import { Alert } from 'react-native';
import {
	CategoriesPicker,
	ImageInput,
	ProductsPicker,
} from '~/components/Forms';
import CompetitorsPicker from '~/components/Forms/helpers/CompetitorsPicker';
import { PRODUCT } from '~/config/constants';
import { yup } from '~/config/yupFrLocal';
import { useValues } from '~/Helpers/useValues';
import { ReportEventFrom } from '~/types/ReportEventForm';
import EventContainer from './EventContainer';

const validation = yup.object({
	category: yup.string().required(),
	product: yup.string().required(),
	purchaseOrder: yup.boolean().required(),
	competitorImage: yup.array().required().min(1),
	productImage: yup.array().required().min(1),
});
const initial = {
	category: '',
	product: '',
	competitor: '',
	purchaseOrder: false,
	competitorImage: undefined,
	productImage: undefined,
};
const ProductVsCompetitor: React.FC<ReportEventFrom> = ({ name, setValue }) => (
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
				<EventContainer title={`${PRODUCT} Vs ${COMPETITOR}`}>
					<CategoriesPicker />
					<ProductsPicker />
					<CompetitorsPicker />
					<ImageInput name="productImage" label={PRODUCT} />
					<ImageInput name="competitorImage" label={COMPETITOR} />
				</EventContainer>
			);
		}}
	</Formik>
);
export default ProductVsCompetitor;
