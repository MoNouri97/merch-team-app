import { Formik } from 'formik';
import React from 'react';
import { Alert } from 'react-native';
import CheckList from '~/components/Forms/CheckList';
import Picker from '~/components/Forms/Picker';
import { Subtitle } from '~/components/Forms/styles';
import SubmitBtn from '~/components/Forms/SubmitBtn';
import AppScreen from '~/components/Shared/AppScreen';
import { fakeCategories, fakeGMSs, fakeProducts } from '~/Helpers/FakeData';
import { yup } from '~/Helpers/yupFrLocal';

const initial = {
	GMS: '',
	category: '',
	products: [],
};
// validation object
const validation = yup.object({
	GMS: yup.string().required(),
	category: yup.string().required(),
	products: yup.array().required().min(1),
});

const RefProducts: React.FC = () => (
	// code here ...
	<AppScreen navbar>
		<Formik
			onSubmit={(values, { setSubmitting }) => {
				Alert.alert('ajouté', JSON.stringify(values, null, 2));
				console.log(values);

				setSubmitting(false);
			}}
			initialValues={initial}
			validationSchema={validation}
		>
			{({ values }) => (
				<>
					<Picker name="GMS" data={fakeGMSs} />
					<Subtitle>Articles</Subtitle>
					<Picker name="category" label="catégorie" data={fakeCategories} />
					<CheckList
						name="products"
						label="produits"
						placeholder="Choisir une GMS et une Catégorie ..."
						data={values.GMS && values.category ? fakeProducts : undefined}
					/>
					<SubmitBtn>Ajouter</SubmitBtn>
				</>
			)}
		</Formik>
	</AppScreen>
);

export default RefProducts;
