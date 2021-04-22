import { Formik } from 'formik';
import React from 'react';
import { Alert } from 'react-native';
import CategoriesPicker from '~/components/Forms/helpers/CategoriesPicker';
import GMSPicker from '~/components/Forms/helpers/GMSPicker';
import ProductsCheckList from '~/components/Forms/helpers/ProductsCheckList';
import { Subtitle } from '~/components/Forms/styles';
import SubmitBtn from '~/components/Forms/SubmitBtn';
import AppScreen from '~/components/Shared/AppScreen';
import { yup } from '~/config/yupFrLocal';

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
			onSubmit={(values, { resetForm }) => {
				Alert.alert('ajouté', JSON.stringify(values, null, 2));

				resetForm();
			}}
			initialValues={initial}
			validationSchema={validation}
		>
			{({ values }) => (
				<>
					<GMSPicker />
					<Subtitle>Articles</Subtitle>
					<CategoriesPicker />
					<ProductsCheckList
						params={{ gms: values.GMS, category: values.category }}
					/>
					{/* <CheckList
						name="products"
						label="produits"
						placeholder="Choisir une GMS et une Catégorie ..."
						data={values.GMS && values.category ? fakeProducts : undefined}
					/> */}
					<SubmitBtn>Ajouter</SubmitBtn>
				</>
			)}
		</Formik>
	</AppScreen>
);

export default RefProducts;
