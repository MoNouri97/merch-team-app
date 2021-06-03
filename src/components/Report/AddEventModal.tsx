import React from 'react';
import { ModalProps } from 'react-native';
import { CheckList, Form, SubmitBtn } from '~/components/Forms';
import BottomSheet from '~/components/Shared/BottomSheet';
import { PRODUCT } from '~/config/constants';

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

export default AddEventModal;
