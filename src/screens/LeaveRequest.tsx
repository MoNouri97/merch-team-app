import { addDays, differenceInDays, format, isAfter } from 'date-fns';
import { useFormikContext } from 'formik';
import React, { useContext } from 'react';
import usePostLeaveRequest from '~/api/LeaveRequestAPI';
import { uploadApi } from '~/api/uploadApi';
import AppText from '~/components/AppText';
import {
	DatePicker,
	Form,
	ImageInput,
	Input,
	SubmitBtn,
} from '~/components/Forms';
import { Subtitle } from '~/components/Forms/styles';
import AppScreen from '~/components/Shared/AppScreen';
import styled from '~/config/styled-components';
import { yup } from '~/config/yupFrLocal';
import ModalContext from '~/context/ModalContext';
import UserContext from '~/context/UserContext';
import { LeaveRequestData } from '~/types/models/formData/LeaveRequest';

const today = new Date();
const initial = {
	startDate: addDays(today, 1),
	endDate: addDays(new Date(), 30),
	reason: '',
	image: undefined,
};
// validation object
const validation = yup.object({
	startDate: yup.date().min(today).required(),
	endDate: yup.date().min(today).required(),
	reason: yup.string().required().max(200),
});

const LeaveRequest: React.FC = () => {
	const { mutateAsync } = usePostLeaveRequest();
	const { user } = useContext(UserContext)!;
	const { showProgress, hide } = useContext(ModalContext)!;

	return (
		<AppScreen navbar>
			<Subtitle>Details</Subtitle>
			<Form
				initialValues={initial}
				validationSchema={validation}
				onSubmit={async (values, formikHelpers) => {
					const { startDate, endDate } = values;
					const { setFieldError, setSubmitting, resetForm } = formikHelpers;
					let valid = true;

					if (!isAfter(endDate, startDate)) {
						setFieldError('endDate', 'la date doit être valide');
						setSubmitting(false);
						valid = false;
					}
					if (!valid) return;

					showProgress(0);

					const toSend: LeaveRequestData = {
						image: '',
						reason: values.reason,
						startDate: format(values.startDate, 'dd-MM-yyyy'),
						endDate: format(values.endDate, 'dd-MM-yyyy'),
						requester: { id: user!.id },
					};
					if (values.image) {
						const filePaths = await uploadApi(values.image, console.log);
						toSend.image = filePaths[0].path;
					}
					await mutateAsync(toSend);

					hide();
					resetForm();
					setSubmitting(false);
				}}
			>
				<DatePicker name="startDate" label="de" />
				<DatePicker name="endDate" label="jusqu'a" />
				<Duration />
				<Input
					name="reason"
					multiline
					scrollEnabled={false}
					// eslint-disable-next-line react-native/no-inline-styles
					style={{ minHeight: 200, textAlignVertical: 'top' }}
				/>
				<ImageInput name="image" label="Piece Jointe" />
				<SubmitBtn>Soumettre</SubmitBtn>
			</Form>
		</AppScreen>
	);
};

const Duration = React.memo(() => {
	const {
		values: { endDate, startDate },
	} = useFormikContext();
	const dur = differenceInDays(endDate, startDate);
	return (
		<DurationText type="label">
			{dur >= 0 ? `Durée : ${dur} jours` : 'Durée invalide'}
		</DurationText>
	);
});

const DurationText = styled(AppText)`
	margin-bottom: 20px;
`;

export default LeaveRequest;
