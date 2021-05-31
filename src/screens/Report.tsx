import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { FieldArray, Formik } from 'formik';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Alert, ModalProps } from 'react-native';
import { ValidationError } from 'yup';
import { useGetGMS } from '~/api/gmsAPI';
import usePostReport from '~/api/reportAPI';
import AppText from '~/components/AppText';
import { CheckList, Form, SubmitBtn } from '~/components/Forms';
import { schemaAction } from '~/components/Report/Action';
import { schemaBeforeAfter } from '~/components/Report/BeforeAfter';
import { schemaCompetitorEvent } from '~/components/Report/CompetitorEvent';
import { schemaNewProduct } from '~/components/Report/NewProduct';
import { schemaPriceChange } from '~/components/Report/PriceChange';
import { schemaPvC } from '~/components/Report/ProductVsCompetitor';
import { schemaPromotion } from '~/components/Report/Promotion';
import ReportEvent from '~/components/Report/ReportEvent';
import ReportHeader from '~/components/Report/ReportHeader';
import { schemaRupture } from '~/components/Report/Rupture';
import Timer from '~/components/Report/Timer';
import AppScreen from '~/components/Shared/AppScreen';
import BottomSheet from '~/components/Shared/BottomSheet';
import { PRODUCT } from '~/config/constants';
import styled from '~/config/styled-components';
import { EventType } from '~/types/events';
import { HomeStackParams } from '~/types/navigation';

type EventList = { type: EventType; id: number }[];

const initial = {
	events: [{ id: 0, type: 'BeforeAfter' }] as EventList,
};

const validate = async (values: { events: any[] }) => {
	let errors = { events: [] as ({} | null)[] };
	errors.events = await Promise.all(
		values.events.map(async (e: any, i: number) => {
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
	const { goBack } = useNavigation();
	const { params } = useRoute<RouteProp<HomeStackParams, 'Report'>>();
	const { data: GMS } = useGetGMS(params?.id ?? 100);

	const { mutateAsync } = usePostReport();
	const eventId = useRef(0);
	const [events, setEvents] = useState<EventList>([
		{ id: eventId.current++, type: 'BeforeAfter' },
		// { id: eventId.current++, type: 'PriceChange' },
	]);
	const [modal, setModal] = useState(false);

	const addEvents = (types: EventType[]) => {
		const toAdd = types.map((type) => {
			const id = eventId.current++;
			console.log(id);
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
			<AppText type="subtitle">{GMS?.name}</AppText>
			<Time>
				<AppText type="label">Temps estimée {GMS?.estimatedTime}</AppText>
				<Timer />
			</Time>
			<Formik
				initialValues={initial}
				validateOnChange={false}
				validateOnBlur={false}
				validate={validate}
				onSubmit={(values, { setSubmitting }) => {
					console.log({ values, GMS });
					mutateAsync({ events: values.events, GMS }).then(() => {
						console.log('done');
					});
				}}
			>
				{({ setFieldValue, values, errors, touched }) => (
					<>
						{/* <AppText numberOfLines={100}>
							{JSON.stringify(errors, null, 2)}
							{JSON.stringify(values, null, 2)}
							{JSON.stringify(touched, null, 2)}
						</AppText> */}
						{/* <Btn
							onPress={() => {
								setEvents(e);
								setFieldValue('events', []);
							}}
						>
							Reset
						</Btn> */}
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
