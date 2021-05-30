import React, { useContext } from 'react';
import { Alert } from 'react-native';
import usePostClaim from '~/api/ClaimAPI';
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
import UserContext from '~/context/UserContext';

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
	const { mutateAsync } = usePostClaim();
	const { user } = useContext(UserContext)!;

	return (
		<AppScreen navbar>
			<Subtitle>Détails</Subtitle>
			<Form
				onSubmit={async (values, { setSubmitting, resetForm }) => {
					await mutateAsync({
						gms: { id: values.GMS },
						type: { id: values.type },
						merchandiser: { id: user!.id },
						image: values.image,
						content: values.content,
					});
					resetForm();
					Alert.alert('Reclamation', 'Enregistrée');
					setSubmitting(false);
				}}
				initialValues={initial}
				validationSchema={validation}
			>
				<GMSPicker />
				<Picker name="type" data={claimTypes} onOpen={refetch} />
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
