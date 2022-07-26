import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { Alert, ScrollView } from 'react-native';
import { ValidationError } from 'yup';
import { useGetTask } from '~/api/PlanningAPI';
import AppText from '~/components/AppText';
import { schemaAction } from '~/components/Report/Action';
import { schemaBeforeAfter } from '~/components/Report/BeforeAfter';
import { schemaCompetitorEvent } from '~/components/Report/CompetitorEvent';
import { schemaNewProduct } from '~/components/Report/NewProduct';
import { schemaPriceChange } from '~/components/Report/PriceChange';
import { schemaPvC } from '~/components/Report/ProductVsCompetitor';
import { schemaPromotion } from '~/components/Report/Promotion';
import ReportForm from '~/components/Report/ReportForm';
import ReportHeader from '~/components/Report/ReportHeader';
import { schemaRupture } from '~/components/Report/Rupture';
import Timer from '~/components/Report/Timer';
import { SafeScreen } from '~/components/Shared/AppScreen';
import styled from '~/config/styled-components';
import ReportContext from '~/context/ReportContext';
import { useModal } from '~/Helpers/useModal';
import { useTimer } from '~/Helpers/useTimer';
import { EventType } from '~/types/events';
import { HomeStackNav, HomeStackParams } from '~/types/navigation';

type EventList = { type: EventType; id: number }[];
const initial = {
	events: [] as EventList,
	// events: [{ id: 0, type: 'BeforeAfter' }] as EventList,
};

const validate = async (values: { events: any[] }) => {
	let errors = { events: [] as ({} | null)[] };
	errors.events = await Promise.all(
		values.events.map(async (e: any, i: number) => {
			if (!e) {
				return null;
			}
			if (!e?.type) {
				return null;
			}
			let schema: any;
			if (e.type === 'BeforeAfter') schema = schemaBeforeAfter;
			if (e.type === 'Promotion') schema = schemaPromotion;
			if (e.type === 'Action') schema = schemaAction;
			if (e.type === 'CompetitorEvent') schema = schemaCompetitorEvent;
			if (e.type === 'NewProduct') schema = schemaNewProduct;
			if (e.type === 'PriceChange') schema = schemaPriceChange;
			if (e.type === 'ProductVsCompetitor') schema = schemaPvC;
			if (e.type === 'Rupture') schema = schemaRupture;
			try {
				await schema.validate(e, {
					abortEarly: false,
					stripUnknown: true,
				});
			} catch (error) {
				let errObject = {};
				error.inner.forEach((innerError: ValidationError) => {
					errObject = {
						...errObject,
						[innerError.path!]: innerError.message,
					};
				});
				return errObject;
			}
			return null;
		})
	);
	if (errors.events.filter((e) => !!e).length == 0) {
		return null;
	}
	console.log({ errors });

	return errors;
};

const Report: React.FC = () => {
	const { navigate } = useNavigation<HomeStackNav<'Report'>>();
	const { params } = useRoute<RouteProp<HomeStackParams, 'Report'>>();
	const {
		time,
		updateTime,
		getTime,
		task: taskInStorage,
	} = useContext(ReportContext);
	const { show } = useModal();

	const { setTimer, timer, timerRef } = useTimer(time ?? 0, () => updateTime);
	// sync timer with the stored time in the context
	useEffect(() => {
		if (!time) return;
		setTimer(time);
	}, [time]);
	// store the current time on exit
	useEffect(() => {
		getTime &&
			getTime().then((t) => {
				if (!t) return;
				setTimer(t);
			});

		if (!taskInStorage || params?.id !== taskInStorage?.id) {
			show({
				content: `\nCommencer un nouveau rapport?`,
				buttons: [
					{
						text: 'Commencer',
						onPress: () => {
							navigate('MapGMS', { id: params.id });
							// changeTask!(task!);
							setTimer(0);
						},
					},
					{
						text: 'Non',
						onPress: () => {
							navigate('Accueil');
						},
					},
				],
			});
		}
		// return cleanUp;
	}, []);
	const cleanUp = () => {
		updateTime!(timerRef.current);
	};

	const { data: task } = useGetTask(params?.id);
	const gms = React.useMemo(() => task?.gms, [task]);
	// TODO previous report
	// const { data: initReport } = useGetReport(GMS?.id ?? 100, { enabled: !!GMS });

	const eventId = useRef(1);
	const [events, setEvents] = useState<EventList>(initial.events);
	const [modal, setModal] = useState(false);

	const addEvents = useCallback(
		(types: EventType[]) => {
			console.log({ types });

			const toAdd = types.map((type) => {
				const id = eventId.current++;
				return { id, type };
			});
			setEvents([...events, ...toAdd]);
		},
		[setEvents, eventId.current]
	);
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

	return (
		<>
			<SafeScreen>
				<ReportHeader
					onActionPress={() => setModal(true)}
					onClosePress={() => navigate('Accueil')}
				/>
				<ScrollView
					// eslint-disable-next-line react-native/no-inline-styles
					contentContainerStyle={{ flexGrow: 1 }}
					bounces={false}
				>
					<Container>
						<AppText type="subtitle"> GMS : {gms?.name}</AppText>
						<Time>
							<AppText type="label">
								Temps Estimé: {gms?.estimatedTime}:00
							</AppText>
							<Timer {...{ timer, setTimer }} />
						</Time>
						<ReportForm
							{...{
								addEvents,
								deleteEvent,
								events,
								initial,
								validate,
								setModal,
								modal,
								task: task ?? { id: params.id },
								time: timerRef,
							}}
						/>
					</Container>
				</ScrollView>
			</SafeScreen>
		</>
	);
};

const Time = styled.View`
	align-items: center;
	margin-vertical: 30px;
`;
const Container = styled.View`
	padding: 20px;
`;
export default Report;
