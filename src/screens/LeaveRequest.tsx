import { differenceInDays, isAfter, isFuture } from 'date-fns';
import { useFormikContext } from 'formik';
import React from 'react';
import { Alert } from 'react-native';
import AppScreen from '~/components/AppScreen';
import AppText from '~/components/AppText';
import DatePicker from '~/components/Forms/DatePicker';
import Form from '~/components/Forms/Form';
import Input from '~/components/Forms/Input';
import { Subtitle } from '~/components/Forms/styles';
import SubmitBtn from '~/components/Forms/SubmitBtn';
import styled from '~/config/styled-components';
import { yup } from '~/Helpers/yupFrLocal';

const initial = {
	start: new Date(),
	end: new Date(),
	reason: 'cuz i am lazy',
};
// validation object
const validation = yup.object({
	start: yup.date().required(),
	end: yup.date().required(),
	reason: yup.string().required().min(5),
});
const LeaveRequest: React.FC = () => {
	console.log('hello');

	return (
		<AppScreen navbar>
			<Subtitle>Details</Subtitle>
			<Form
				initialValues={initial}
				validationSchema={validation}
				onSubmit={({ start, end }, { setFieldError, setSubmitting }) => {
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

					Alert.alert('ok');
					setSubmitting(false);
				}}
			>
				<DatePicker name="start" />
				<DatePicker name="end" />
				<Dur />
				<Input name="reason" />
				<SubmitBtn>Soumettre</SubmitBtn>
			</Form>
		</AppScreen>
	);
};

const Dur = () => {
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
