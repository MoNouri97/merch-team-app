import { Formik } from 'formik';
import React from 'react';
import { Alert } from 'react-native';
import { useQueryClient } from 'react-query';
import usePostRefProducts from '~/api/refProductsAPI';
import { GMSPicker, ProductsCheckList, SubmitBtn } from '~/components/Forms';
import AppScreen from '~/components/Shared/AppScreen';
import { yup } from '~/config/yupFrLocal';

const initial = {
	GMS: '',
	products: [] as string[],
};
// validation object
const validation = yup.object({
	GMS: yup.string().required(),
	products: yup.array().required(),
});

const RefProducts: React.FC = () => {
	const { mutateAsync } = usePostRefProducts();
	const queryClient = useQueryClient();

	return (
		<AppScreen navbar>
			<Formik
				onSubmit={async (values, { resetForm }) => {
					Alert.alert('ajouté', JSON.stringify(values, null, 2));
					// invalidate;
					await mutateAsync({
						GMS: { id: values.GMS },
						products: values.products.map((p) => ({ id: p })),
					});
					await queryClient.invalidateQueries('get_products');
					resetForm();
				}}
				initialValues={initial}
				validationSchema={validation}
			>
				{({ values }) => (
					<>
						<GMSPicker />

						<ProductsCheckList />

						<SubmitBtn>Ajouter</SubmitBtn>
					</>
				)}
			</Formik>
		</AppScreen>
	);
};

export default RefProducts;
