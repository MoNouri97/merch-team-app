import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Alert, ModalProps } from 'react-native';
import AppText from '~/components/AppText';
import { CheckList, Form, SubmitBtn } from '~/components/Forms';
import ReportEvent from '~/components/Report/ReportEvent';
import ReportHeader from '~/components/Report/ReportHeader';
import Timer from '~/components/Report/Timer';
import AppScreen from '~/components/Shared/AppScreen';
import BottomSheet from '~/components/Shared/BottomSheet';
import { PRODUCT } from '~/config/constants';
import styled from '~/config/styled-components';
import { yup } from '~/config/yupFrLocal';
import createSectionsArray from '~/Helpers/createSectionsArray';
import { EventType } from '~/types/events';

type EventList = { type: EventType; id: number }[];
const validation = yup.object({});
const initial = {};

const Report: React.FC = () => {
	const { goBack } = useNavigation();
	const eventId = useRef(0);
	const [events, setEvents] = useState<EventList>([
		{ id: eventId.current++, type: 'BeforeAfter' },
	]);
	const [modal, setModal] = useState(false);

	const addEvents = (types: EventType[]) => {
		const toAdd = types.map((type) => {
			const id = eventId.current++;
			return { id, type };
		});
		setEvents([...events, ...toAdd]);
	};
	const deleteEvent = useCallback(
		(id: number) => {
			Alert.alert('Confirmation', 'Supprimer cette section ?', [
				{
					text: 'Oui',
					onPress: () => {
						setEvents(events.filter((e) => e.id !== id));
					},
				},
				{ text: 'Non' },
			]);
		},
		[setEvents, events]
	);

	const actions = useMemo(
		() => [{ icon: 'trash-2' as const, onPress: deleteEvent }],
		[deleteEvent]
	);

	return (
		<AppScreen>
			<ReportHeader
				onActionPress={() => setModal(true)}
				onClosePress={() => goBack()}
			/>
			<AppText type="subtitle">Aziza - Ibn Khaldoun</AppText>
			<Time>
				<AppText type="label">Temps estimée 30:00</AppText>
				<Timer />
			</Time>
			<Formik
				initialValues={initial}
				validationSchema={validation}
				onSubmit={(values, { setSubmitting }) => {
					setSubmitting(true);
					setTimeout(() => {
						
						console.log(createSectionsArray(values));
						setSubmitting(false);
					}, 900);
					
				}}
			>
				{({ setFieldValue }) => (
					<>
						{events.map((e, i) => (
							<React.Fragment key={e.id}>
								<ReportEvent
									type={e.type}
									id={e.id}
									actions={i !== 0 ? actions : undefined}
									name={`${e.type} ${e.id}`}
									setFieldValue={setFieldValue}
								/>
							</React.Fragment>
						))}
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
				)}
			</Formik>
		</AppScreen>
	);
};

const events = [
	{ name: 'Before/After', id: 'BeforeAfter' },
	{ name: 'Action', id: 'Action' },
	{ name: 'Événement Conçurent', id: 'CompetitorEvent' },
	{ name: 'Nouveau produit', id: 'NewProduct' },
	{ name: 'Changement de prix', id: 'PriceChange' },
	{ name: `${PRODUCT} Vs Conçurent`, id: 'ProductVsCompetitor' },
	{ name: 'Promotion', id: 'Promotion' },
	{ name: 'Rupture', id: 'Rupture' },
];
const AddEventModal: React.FC<
	ModalProps & { handleValues: (v: string[]) => void }
> = ({ handleValues, ...props }) => (
	<BottomSheet modalProps={props}>
		<Form
			initialValues={{ toAdd: [] }}
			onSubmit={(v) => {
				setTimeout(() => {
					handleValues(v.toAdd);
				}, 0);
			}}
		>
			<CheckList name="toAdd" label="" data={events} />
			<SubmitBtn>Ajouter</SubmitBtn>
		</Form>
	</BottomSheet>
);

const Time = styled.View`
	align-items: center;
	margin-vertical: 30px;
`;
export default Report;
