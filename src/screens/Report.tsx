import React from 'react';
import AppScreen from '~/components/AppScreen';
import AppText from '~/components/AppText';
import Btn from '~/components/Btn';
import Form from '~/components/Forms/Form';
import SubmitBtn from '~/components/Forms/SubmitBtn';
import BeforeAfter from '~/components/Report/BeforeAfter';
import ReportHeader from '~/components/Report/ReportHeader';
import styled from '~/config/styled-components';
import { yup } from '~/Helpers/yupFrLocal';

const validation = yup.object({});
const initial = {};
const Report: React.FC = () => {
	// code here ...
	console.log('Hello From Report');
	return (
		<AppScreen>
			<ReportHeader
				onActionPress={() => console.log('action')}
				onClosePress={() => console.log('exit')}
			/>
			<AppText type="subtitle">Aziza - Ibn Khaldoun</AppText>
			<Time>
				<AppText type="label">Temps estimée 30:00</AppText>
				<AppText type="label" color="primary">
					Temps 26:45
				</AppText>
			</Time>
			<Form
				initialValues={initial}
				validationSchema={validation}
				onSubmit={(values, { setSubmitting }) => {
					console.log('ok');
					setSubmitting(false);
				}}
			>
				<BeforeAfter />
				<Btn>Ajouter</Btn>
				<SubmitBtn>Soumettre</SubmitBtn>
			</Form>
		</AppScreen>
	);
};
const Time = styled.View`
	align-items: center;
	margin-vertical: 30px;
`;
export default Report;
