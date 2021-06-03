import { FieldArray, Formik } from 'formik';
import React, { useEffect, useMemo } from 'react';
import { usePostReport } from '~/api/reportAPI';
import { uploadApi } from '~/api/uploadApi';
import { SubmitBtn } from '~/components/Forms';
import AddEventModal from '~/components/Report/AddEventModal';
import ReportEvent from '~/components/Report/ReportEvent';
import api from '~/config/api';
import { createReportData, setPaths } from '~/Helpers/createReportData';
import { extractFiles } from '~/Helpers/extractFiles';
import { EventType } from '~/types/events';
import { PlanningDetails } from '~/types/models/PlanningDetails';

type EventList = { type: EventType; id: number }[];

interface ReportFormProps {
	initial: any;
	validate: (v: any) => Promise<any>;
	events: EventList;
	deleteEvent: (id: number) => void;
	addEvents: (types: EventType[]) => void;
	modal: boolean;
	setModal: (v: boolean) => void;
	task: PlanningDetails;
}

const ReportForm: React.FC<ReportFormProps> = ({
	initial,
	validate,
	events,
	deleteEvent,
	addEvents,
	modal,
	setModal,
	task,
}) => {
	const { mutateAsync: postReport } = usePostReport();
	const actions = useMemo(
		() => [{ icon: 'trash-2' as const, onPress: deleteEvent }],
		[deleteEvent]
	);
	return (
		<Formik
			initialValues={initial}
			validateOnChange={false}
			validateOnBlur={false}
			validate={validate}
			onSubmit={async (values, helpers) => {
				const { setSubmitting } = helpers;

				const files = extractFiles(values.events);
				const filePaths = await uploadApi(files, console.log);
				let reportData = setPaths(filePaths, values);
				reportData = createReportData(reportData);
				console.log(reportData);
				const res = await postReport({
					...reportData,
					gms: { id: task?.gms?.id ?? 100 },
					valid: true,
					latitude: 10.0,
					longitude: 11.0,
					time: 10,
				});
				await api.put('/task/' + task.id, { state: 'DONE' });
				setSubmitting(false);
			}}
		>
			{({ setFieldValue }) => {
				useEffect(() => {
					setFieldValue('GMS', task?.gms ?? 100);
				}, []);
				return (
					<>
						<FieldArray name="events">
							{() => (
								<React.Fragment>
									{events.map((e, i) => (
										<ReportEvent
											key={e.id}
											type={e.type}
											id={e.id}
											actions={i !== 0 ? actions : undefined}
											// name={`${e.type} ${e.id}`}
											name={`events.${i}`}
											setFieldValue={setFieldValue}
										/>
									))}
								</React.Fragment>
							)}
						</FieldArray>
						<AddEventModal
							visible={modal}
							onRequestClose={() => setModal(false)}
							handleValues={(v) => {
								addEvents(v as any);
								setModal(false);
							}}
						/>
						<SubmitBtn>Soumettre</SubmitBtn>
					</>
				);
			}}
		</Formik>
	);
};

export default ReportForm;
