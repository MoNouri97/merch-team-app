import React from 'react';
import { Alert } from 'react-native';
import useGetClaimTypes from '~/api/ClaimTypeAPI';
import {
	Form,
	GMSPicker,
	ImageInput,
	Input,
	Picker,
	SubmitBtn,
} from '~/components/Forms';
import { Subtitle } from '~/components/Forms/styles';
import AppScreen from '~/components/Shared/AppScreen';
import { yup } from '~/config/yupFrLocal';

const initial = {
	GMS: '',
	type: '',
	content: '',
	image: undefined,
};
// validation object
const validation = yup.object({
	GMS: yup.string().required(),
	type: yup.string().required(),
	content: yup.string().required().max(200),
});
const Claim: React.FC = () => {
	let { data: claimTypes, refetch } = useGetClaimTypes();

	// useEffect(() => {
	// 	refetch().then((result) => {
	// 		const { data } = result;
	// 		claimTypes = data;
	// 		console.log('refetching');
	// 	});
	// });
	return (
		<AppScreen navbar>
			<Subtitle>Détails</Subtitle>
			<Form
				onSubmit={(values, { setSubmitting }) => {
					Alert.alert('ok', JSON.stringify(values, null, 2));

					setSubmitting(false);
				}}
				initialValues={initial}
				validationSchema={validation}
			>
				<GMSPicker />
				<Picker name="type" data={claimTypes} />
				<Input
					name="content"
					label="contenu"
					placeholder="contenu ici ..."
					multiline
				/>
				<ImageInput name="image" />
				<SubmitBtn>Soumettre</SubmitBtn>
			</Form>
		</AppScreen>
	);
};
export default Claim;
