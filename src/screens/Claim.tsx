import { useNavigation } from '@react-navigation/core';
import React, { useContext } from 'react';
import usePostClaim from '~/api/ClaimAPI';
import useGetClaimTypes from '~/api/ClaimTypeAPI';
import { uploadApi } from '~/api/uploadApi';
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
import ModalContext from '~/context/ModalContext';
import UserContext from '~/context/UserContext';
import { HomeStackNav } from '~/types/navigation';

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
	const { showProgress, hideProgress, show } = useContext(ModalContext)!;
	const { navigate } = useNavigation<HomeStackNav>();

	return (
		<AppScreen navbar>
			<Subtitle>Détails</Subtitle>
			<Form
				onSubmit={async (values, { setSubmitting, resetForm }) => {
					showProgress();
					try {
						let image;
						if (values.image) {
							const filePaths = await uploadApi(values.image, console.log);
							image = filePaths[0].path;
						}

						await mutateAsync({
							gms: { id: values.GMS },
							type: { id: values.type },
							merchandiser: { id: user!.id },
							image,
							content: values.content,
						});
						resetForm();
						hideProgress();
						setSubmitting(false);
						navigate('Accueil');
					} catch (error) {
						show({ content: error.message });
					}
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
