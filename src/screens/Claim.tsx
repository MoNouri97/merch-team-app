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
	const { showProgress, hide } = useContext(ModalContext)!;

	return (
		<AppScreen navbar>
			<Subtitle>Détails</Subtitle>
			<Form
				onSubmit={async (values, { setSubmitting, resetForm }) => {
					const filePaths = await uploadApi(values.image, console.log);
					showProgress(0);
					await mutateAsync({
						gms: { id: values.GMS },
						type: { id: values.type },
						merchandiser: { id: user!.id },
						image: filePaths[0].path,
						content: values.content,
					});
					resetForm();
					hide();
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
