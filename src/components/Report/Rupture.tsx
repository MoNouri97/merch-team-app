import { Formik } from 'formik';
import React from 'react';
import { Alert } from 'react-native';
import { fakeCategories, fakeProducts } from '~/Helpers/FakeData';
import { useValues } from '~/Helpers/useValues';
import { yup } from '~/Helpers/yupFrLocal';
import { ReportEventFrom } from '~/types/ReportEventForm';
import CheckBox from '../Forms/CheckBox';
import CheckList from '../Forms/CheckList';
import ImageInput from '../Forms/ImageInput';
import Picker from '../Forms/Picker';
import EventContainer from './EventContainer';

const validation = yup.object({
	category: yup.string().required(),
	product: yup.string().required(),
	purchaseOrder: yup.boolean().required(),
	image: yup.array().required(),
});
const initial = {
	category: '',
	products: [],
	purchaseOrder: false,
	image: [],
};

const Rupture: React.FC<ReportEventFrom> = ({ name, setValue }) => (
	<EventContainer title="Rupture">
		<Formik
			initialValues={initial}
			validationSchema={validation}
			onSubmit={(values, { setSubmitting }) => {
				Alert.alert(JSON.stringify(values, null, 2));
				setSubmitting(false);
			}}
		>
			{({ values }) => {
				useValues(name, values, setValue);
				return (
					<>
						<Picker name="category" label="catégorie" data={fakeCategories} />
						{/* <Picker name="product" label="produit" data={fakeProducts} /> */}
						<CheckList
							name="products"
							label="produits"
							placeholder="choisir une catégorie . . ."
							data={values.category ? fakeProducts : undefined}
						/>
						<CheckBox
							name="purchaseOrder"
							label="bon de commande"
							text="passeé"
						/>
						<ImageInput name="image" />
					</>
				);
			}}
		</Formik>
	</EventContainer>
);
export default Rupture;
