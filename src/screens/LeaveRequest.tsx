import { addDays, differenceInDays, isAfter, isFuture } from 'date-fns';
import { FormikHelpers, FormikValues, useFormikContext } from 'formik';
import React from 'react';
import { Alert } from 'react-native';
import AppText from '~/components/AppText';
import { DatePicker, Form, Input, SubmitBtn } from '~/components/Forms';
import { Subtitle } from '~/components/Forms/styles';
import AppScreen from '~/components/Shared/AppScreen';
import styled from '~/config/styled-components';
import { yup } from '~/config/yupFrLocal';

const initial = {
	start: addDays(new Date(), 1),
	end: addDays(new Date(), 30),
	reason: '',
};
// validation object
const validation = yup.object({
	start: yup.date().required(),
	end: yup.date().required(),
	reason: yup.string().required().max(200),
});

const handleSubmit = (
	values: FormikValues,
	formikHelpers: FormikHelpers<FormikValues>
) => {
	const { start, end } = values;
	const { setFieldError, setSubmitting } = formikHelpers;
	let valid = true;
	if (!isFuture(start)) {
		setFieldError('start', 'la date doit être valide');
		setSubmitting(false);
		valid = false;
	}
	if (!isFuture(end) || !isAfter(end, start)) {
		setFieldError('end', 'la date doit être valide');
		setSubmitting(false);
		valid = false;
	}
	if (!valid) return;

	Alert.alert('ok', JSON.stringify(values, null, 2));
	setSubmitting(false);
};

const LeaveRequest: React.FC = () => (
	<AppScreen navbar>
		<Subtitle>Details</Subtitle>
		<Form
			initialValues={initial}
			validationSchema={validation}
			onSubmit={handleSubmit}
		>
			<DatePicker name="start" />
			<DatePicker name="end" />
			<Duration />
			<Input
				name="reason"
				multiline
				scrollEnabled={false}
				// eslint-disable-next-line react-native/no-inline-styles
				style={{ minHeight: 200, textAlignVertical: 'top' }}
			/>
			<SubmitBtn>Soumettre</SubmitBtn>
		</Form>
	</AppScreen>
);

const Duration = () => {
	const {
		values: { end, start },
	} = useFormikContext();
	const dur = differenceInDays(end, start);
	return (
		<DurationText type="label">
			{dur >= 0 ? `Durée : ${dur} jours` : 'Durée invalide'}
		</DurationText>
	);
};

const DurationText = styled(AppText)`
	margin-bottom: 20px;
`;

export default LeaveRequest;
