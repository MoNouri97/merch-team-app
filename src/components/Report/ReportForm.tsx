import { useNavigation } from '@react-navigation/core';
import { secondsToMinutes } from 'date-fns';
import { FieldArray, Formik } from 'formik';
import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { Alert } from 'react-native';
import { usePostReport } from '~/api/reportAPI';
import { uploadApi } from '~/api/uploadApi';
import { SubmitBtn } from '~/components/Forms';
import AddEventModal from '~/components/Report/AddEventModal';
import ReportEvent from '~/components/Report/ReportEvent';
import api from '~/config/api';
import ModalContext from '~/context/ModalContext';
import ReportContext from '~/context/ReportContext';
import UserContext from '~/context/UserContext';
import { createReportData, setPaths } from '~/Helpers/createReportData';
import { extractFiles } from '~/Helpers/extractFiles';
import useLocation from '~/Helpers/useLocation';
import { EventType } from '~/types/events';
import { PlanningDetails } from '~/types/models/PlanningDetails';
import { HomeStackNav } from '~/types/navigation';

type EventList = { type: EventType; id: number }[];

interface ReportFormProps {
	initial: any;
	validate: (v: any) => Promise<any>;
	events: EventList;
	deleteEvent: (id: number) => void;
	addEvents: (types: EventType[]) => void;
	modal: boolean;
	setModal: (v: boolean) => void;
	task: Partial<PlanningDetails>;
	time: React.MutableRefObject<number>;
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
	time,
}) => {
	const { mutateAsync: postReport } = usePostReport();
	const actions = useMemo(
		() => [{ icon: 'trash-2' as const, onPress: deleteEvent }],
		[deleteEvent]
	);
	const { location, refresh: refreshLocation } = useLocation();
	const { user } = useContext(UserContext)!;
	const { showProgress, hide, show } = useContext(ModalContext)!;
	const { navigate } = useNavigation<HomeStackNav<'Report'>>();
	const { updateTime } = useContext(ReportContext);

	const send = useCallback(
		async (values: any, setSubmitting: (b: boolean) => void) => {
			showProgress();
			try {
				const files = extractFiles(values.events);
				const filePaths = await uploadApi(files, console.log);
				let reportData = setPaths(filePaths, values);

				reportData = createReportData(reportData);
				await refreshLocation();

				await postReport({
					...reportData,
					gms: { id: task?.gms?.id },
					merchandiser: { id: user?.id },
					valid: true,
					latitude: location?.latitude,
					longitude: location?.longitude,
					dateTime: new Date(),
					time: time.current,
				});
				await api.put('/task/' + task?.id, { state: 'DONE' });
				updateTime!(0);
				setSubmitting(false);
				navigate('Accueil');
				hide();
			} catch (error) {
				console.log(error.message);

				show({ content: 'erreur', buttons: [{ text: 'Ok' }] });
			}
		},
		[task, user, time]
	);
	return (
		<Formik
			initialValues={initial}
			validateOnChange={false}
			validateOnBlur={false}
			// validate={validate}
			onSubmit={async (values, helpers) => {
				const { setSubmitting } = helpers;
				const valid = secondsToMinutes(time.current) >= task.gms!.estimatedTime;
				if (!valid) {
					Alert.alert(
						`Temps Estimée ${task.gms!.estimatedTime}min`,
						`Votre temps:${secondsToMinutes(
							time.current
						)}min\nSoumettre un rapport pas valide ??`,
						[
							{
								text: 'oui',
								onPress: () => {
									send(values, setSubmitting);
								},
							},
							{
								text: 'non',
								onPress: () => {
									setSubmitting(false);
								},
								style: 'default',
							},
						]
					);
				}
			}}
		>
			{({ setFieldValue, values }) => {
				useEffect(() => {
					if (values.GMS || !task) return;
					setFieldValue('GMS', task!.gms);
				}, [task]);
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
											// actions={i !== 0 ? actions : undefined}
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

export default React.memo(ReportForm);
