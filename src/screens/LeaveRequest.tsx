import { isAfter, isFuture } from 'date-fns';
import React from 'react';
import { Alert } from 'react-native';
import AppScreen from '~/components/AppScreen';
import DatePicker from '~/components/Forms/DatePicker';
import Form from '~/components/Forms/Form';
import Input from '~/components/Forms/Input';
import { Subtitle } from '~/components/Forms/styles';
import SubmitBtn from '~/components/Forms/SubmitBtn';
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
				<Input name="reason" />
				<SubmitBtn>Soumettre</SubmitBtn>
			</Form>
		</AppScreen>
	);
};
export default LeaveRequest;
