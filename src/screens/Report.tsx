import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Alert, ModalProps } from 'react-native';
import AppScreen from '~/components/AppScreen';
import AppText from '~/components/AppText';
import CheckList from '~/components/Forms/CheckList';
import Form from '~/components/Forms/Form';
import SubmitBtn from '~/components/Forms/SubmitBtn';
import ReportEvent from '~/components/Report/ReportEvent';
import ReportHeader from '~/components/Report/ReportHeader';
import Timer from '~/components/Report/Timer';
import BottomSheet from '~/components/Shared/BottomSheet';
import { PRODUCT } from '~/config/constants';
import styled from '~/config/styled-components';
import { yup } from '~/Helpers/yupFrLocal';
import { EventType } from '~/types/events';

type event = { type: EventType; id: number };
const validation = yup.object({});
const initial = {};
const Report: React.FC = () => {
	const { goBack } = useNavigation();
	const eventId = useRef(0);
	const [events, setEvents] = useState<event[]>([
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
			<Form
				initialValues={initial}
				validationSchema={validation}
				onSubmit={(values, { setSubmitting }) => {
					console.log('ok');
					setSubmitting(false);
				}}
			>
				{events.map((e, i) => (
					<React.Fragment key={e.id}>
						<ReportEvent
							type={e.type}
							id={e.id}
							actions={i !== 0 ? actions : undefined}
						/>
						{/* {i > 0 && <Btn onPress={() => deleteEvent(e.id)}>Supprimer</Btn>} */}
					</React.Fragment>
				))}
				{/* <Btn onPress={() => setModal(true)}>Ajouter</Btn> */}
				<AddEventModal
					visible={modal}
					onRequestClose={() => setModal(false)}
					handleValues={(v) => {
						addEvents(v as any);
						setModal(false);
					}}
				/>
				<SubmitBtn>Soumettre</SubmitBtn>
			</Form>
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
			onSubmit={(v, { setSubmitting }) => {
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
