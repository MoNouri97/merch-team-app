import { Formik } from 'formik';
import React from 'react';
import { Alert } from 'react-native';
import { CategoriesPicker, Input, ProductsPicker } from '~/components/Forms';
import { yup } from '~/config/yupFrLocal';
import { useValues } from '~/Helpers/useValues';
import { ReportEventFrom } from '~/types/ReportEventForm';
import EventContainer from './EventContainer';

const validation = yup.object({
	category: yup.string().required(),
	product: yup.string().required(),
	oldPrice: yup.number().positive().required(),
	newPrice: yup.number().positive().required(),
});
const initial = {
	category: '',
	product: '',
	oldPrice: null,
	newPrice: null,
};
const PriceChange: React.FC<ReportEventFrom> = ({ name, setValue }) => (
	<EventContainer title="Changement de prix">
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
					</>
				);
			}}
		</Formik>
	</EventContainer>
);
export default PriceChange;
